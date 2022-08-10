import React from 'react';
import { authService } from "./authService";
import { useRouter } from 'next/router';

export function withSession(fucao) {
  
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx)
      const org = await authService.organiza(ctx)
      const acconts = await authService.account(ctx)
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
          org,
          acconts,
        }
      }
      
      return fucao(modifiedCtx)

    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: '/?error=401 '
        }
      }
    }
  }
    
}