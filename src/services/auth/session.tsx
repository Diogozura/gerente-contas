import { authService } from "./authService";

export function withSession(fucao) {
  
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx)
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        }
      }
     console.log(session)
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