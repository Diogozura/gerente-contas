import nookies from 'nookies'
import { HttpClient } from '../../src/infra/HttpClient/HttpClient';
import { tokenService } from '../../src/services/auth/tokenService';

const REFRESH_TOKEN_NAME = 'REFRESH_TOKEN_NAME'

const controllers = {
  async stroreRefreshToken(req, res) {
    console.log('request', req.body);
    const ctx = { req, res }
    nookies.set(ctx, REFRESH_TOKEN_NAME, req.body.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    
    res.json({
      data: {
        message: 'Stored with success!'
      }
    })
  },
  async displayCookies(req, res) {
    const ctx = {req, res}
    res.json({
      data: {
        cookies: nookies.get(ctx)
      }
    });
    
  },
  async regenerateTokens(req, res) {
    const ctx = { req, res }
    const cookies = nookies.get(ctx);
    const refresh_token = cookies[REFRESH_TOKEN_NAME]
    // console.log("/api/refresh [regenerateTokens]", refresh_token)

   const refreshResponse = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refreshLogin?refreshToken=${refresh_token}`, {
     method: 'GET',
 })
    
    

    if (refreshResponse.ok) {
      nookies.set(ctx, REFRESH_TOKEN_NAME, refreshResponse.body.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      })

      tokenService.save(refreshResponse.body.token ,ctx)

      res.status(200).json({
        data: refreshResponse.body
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


const controllersBy = {
  POST: controllers.stroreRefreshToken,
  GET: controllers.regenerateTokens,
}

export default function handler(request, response) {

  if(controllersBy[request.method]) return controllersBy[request.method](request, response) 

  response.status(404).json({
    status: 404,
    message: 'Not Found'
  })
 
}