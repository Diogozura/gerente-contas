import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "seu@email.com" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error("Credenciais inválidas");

          return {
            id: "user",
            accessToken: data.access,
            refreshToken: data.refresh,
            accessTokenExpires: Date.now() + 15 * 60 * 1000, // Expira em 15 minutos
          };
        } catch (error) {
          console.error("❌ Erro ao autenticar:", error);
          throw new Error("Erro ao autenticar");
        }
      },
    }),
  ],

  callbacks: {
    // Callback de JWT, chamado sempre que a JWT é gerada ou atualizada
    async jwt({ token, user }) {
      // Se houver um "user" novo, significa que a autenticação foi bem-sucedida
      if (user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      // Verifique se o token ainda é válido. Se o token tiver expirado ou estiver prestes a expirar, vamos renová-lo.
      if (Date.now() > token.accessTokenExpires - 2 * 60 * 1000) {
        // O token vai expirar em menos de 2 minutos, então vamos renová-lo
        return await refreshAccessToken(token);
      }

      // Retorne o token sem alterações, caso ele ainda seja válido
      return token;
    },

    // Callback de Sessão, atualizado com os dados do token
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Certifique-se de que a chave secreta esteja aqui
  pages: {
    signIn: "/login",
  },

  // Secret para NextAuth
  // secret: process.env.NEXTAUTH_SECRET,
};

// Função para renovar o token
async function refreshAccessToken(token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    const refreshedTokens = await res.json();
    if (!res.ok) throw new Error("Erro ao renovar token");

    // Retorna o novo token e o tempo de expiração renovado
    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // Atualiza expiração para mais 15 minutos
    };
  } catch (error) {
    console.error("Erro ao renovar token:", error);
    return { ...token, error: "RefreshTokenError" };
  }
}

export default NextAuth(authOptions);
