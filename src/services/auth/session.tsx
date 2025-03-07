import { getToken } from "next-auth/jwt";
import { parseCookies } from "nookies";

export function withSession(handler) {
  return async (ctx) => {
    try {
      const cookies = parseCookies(ctx);
      const token = await getToken({ req: ctx.req }); // Obtém o token do NextAuth.js

      if (!token) {
        return {
          redirect: {
            permanent: false,
            destination: "/auth/login",
          },
        };
      }

      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          token: token.accessToken, // Passa o accessToken do NextAuth.js
          idConta: cookies.idConta, // Mantém o idConta dos cookies
        },
      };

      return handler(modifiedCtx);
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
}
