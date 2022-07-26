import { authService } from "./authService";

export function organization(fucao) {
  
  return async (ctx) => {
    try {
      const organization = await authService.organiza(ctx)
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          organization,
        }
      }
      console.log(modifiedCtx)
      return fucao(modifiedCtx)

    }catch(err){
      return {
              redirect: {
                permanent: false,
                destination: '/?error=401 '
             }
        }
    }
  }
    
}