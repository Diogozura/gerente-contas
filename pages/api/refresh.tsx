import nookies from 'nookies'
import { HttpClient } from '../../src/infra/HttpClient/HttpClient'
import { tokenService } from '../../src/services/auth/tokenService'

const REFRESH_TOKEN_NAME = 'REFRESH_TOKEN_NAME'

const controllers = {
  async storeRefreshToken(req, res) {
    const ctx = { req, res }
    console.log("handler", req.body)

    nookies.set(ctx, REFRESH_TOKEN_NAME, req.body.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',  
    })

    res.json({
      data: {
        message: 'Stored with success!'
      }
    });
  },

  async regenerateTokens(req, res) {
    const ctx = { req, res }
    const cookies = nookies.get(ctx);
    const refresh_token = cookies[REFRESH_TOKEN_NAME] || req.body.refreshToken
    console.log("/api/refresh [regenerateTokens]", refresh_token)

   const refreshResponse = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refreshLogin`, {
     method: 'GET',
     headers: {
        'Authorization': `Bearer ${refresh_token}`
      },
   })
    console.log("novo token", refreshResponse.body.token)
    
    if (refreshResponse.ok) {
      nookies.set(ctx, 'REFRESH_TOKEN', refreshResponse.body.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      })
      tokenService.save(refreshResponse.body.token)
      console.log('deu bom familia' , "novo token", refreshResponse.body.token)
      res.status(200).json({
        data:refreshResponse.body
      })
    }
    else {
      res.status(401).json({
        status: 401,
        message: "Não autorizado"
      })
    }
  }
} 

const controllerBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.regenerateTokens,
  PUT: controllers.regenerateTokens,
  DELETE: (req, res) => {
    const ctx = { req, res }
    nookies.destroy(ctx, REFRESH_TOKEN_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })

    res.json({
      data: {
        message:'deleted with  success' 
      }
    })
  }
  // GET: controllers.displayCookies 
}

export default function handler(request, response) {
  if(controllerBy[request.method]) return controllerBy[request.method](request, response)

  response.status(404).json({
   message: 'Not Found'
 }) 
}
