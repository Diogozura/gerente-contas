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
    async jwt({ token, user }) {
      // 🔹 Se houver um novo usuário (login), salva os tokens
      if (user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 5 * 60 * 1000, // 🔥 Expiração em 5 min
        };
      }
  
      // 🔹 Se o token estiver prestes a expirar, renova antes
      if (Date.now() > token.accessTokenExpires - 2 * 60 * 1000) {
        console.log("🔄 Token expirando, tentando renovar...");
        const newToken = await refreshAccessToken(token);
  
        if (newToken.error) {
          console.log("🚨 Falha ao renovar token, removendo sessão...");
          return {}; // 🔥 Remove a sessão
        }
  
        return newToken;
      }
  
      return token;
    },
  
    async session({ session, token }) {
      if (!token.accessToken) {
        console.log("🚫 Sem accessToken, removendo sessão...");
        return null; // 🔥 Se o token estiver inválido, a sessão some
      }
  
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
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
    console.log("🔄 Tentando renovar token...");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    const refreshedTokens = await res.json();
    if (!res.ok) throw new Error("Erro ao renovar token");

    console.log("✅ Token renovado com sucesso!");

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: Date.now() + 5 * 60 * 1000, // 🔥 Expiração em 5 minutos
    };
  } catch (error) {
    console.error("❌ Erro ao renovar token:", error);
    return { error: "RefreshTokenError" };
  }
}

export default NextAuth(authOptions);
