import nookies from 'nookies'
import { HttpClient } from '../../src/infra/HttpClient/HttpClient';
import { tokenService } from '../../src/services/auth/tokenService';

const REFRESH_TOKEN_NAME = 'REFRESH_TOKEN_NAME'

const controllers = {
  async stroreRefreshToken(req, res) {

    const ctx = { req, res }
    nookies.set(ctx, REFRESH_TOKEN_NAME, req.body.refresh, {
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
  async regenerateTokens(req, res) {
    const ctx = { req, res }

    const cookies = nookies.get(ctx);
    const refresh = cookies[REFRESH_TOKEN_NAME] || req.body.refreshToken
   const refreshResponse = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/token/refresh/`, {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'
    } ,
     body:{refresh}

 })
 
    if (refreshResponse.ok) {
      nookies.set(ctx, REFRESH_TOKEN_NAME, refreshResponse.body.refresh, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      })
      
      tokenService.save(refreshResponse.body.access ,ctx)

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
  PUT: controllers.regenerateTokens,
  DELETE: (req, res) => {
    const ctx = { req, res }
    nookies.destroy(ctx, REFRESH_TOKEN_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/', 
    });
    
    res.json({
      data: {
        message:'deleted with success!'
      }
    })
  },
}

export default function handler(request, response) {

  if(controllersBy[request.method]) return controllersBy[request.method](request, response) 

  response.status(404).json({
    status: 404,
    message: 'Not Found'
  })
 
}