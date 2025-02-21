import { parseCookies } from "nookies";
import { authService } from "./authService";
import { tokenService } from "./tokenService";

export function withSession(fucao) {

  return async (ctx) => {
    try {
      const cookies = parseCookies(ctx);
      const session = await authService.getSession(ctx)
      const token = tokenService.get(ctx); // Pegando o token do contexto
      const idConta = cookies.idConta; // Pegando o token do contexto
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
          token,
          idConta
        }
      }
   
      return fucao(modifiedCtx)

    } catch (err) {
      return {
              redirect: {
                permanent: false,
                destination: '/?error=401'
             }
        }
    }
  }
    
}