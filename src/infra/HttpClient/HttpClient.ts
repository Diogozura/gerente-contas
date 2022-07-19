import { tokenService } from './../../services/auth/tokenService';
import nookies from 'nookies'
export async function HttpClient(fetchUrl: RequestInfo | URL, fetchOptions: {
  ctx?: any;
  refresh?: any;
  method?: string;
  body?: any;
  headers?: any 
} = {}) {
  const defaultHeaders = fetchOptions.headers || {}
  const options = {
    ...fetchOptions,
    headers:{
      'Content-Type': 'application/json',
      ...defaultHeaders,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  
  }
  return fetch(fetchUrl, options)
    .then(async (respostaDoServidor) => {
      return {
        ok: respostaDoServidor.ok,
        status: respostaDoServidor.status,
        statusText: respostaDoServidor.statusText,
        body: await respostaDoServidor.json(),
      }
    })
    .then(async (response) => {
      if (!fetchOptions.refresh) return response

      if (response.status !== 401) return response

      const isServer = true
      const currentRefreshToken = fetchOptions?.ctx?.req?.cookies['REFRESH_TOKEN_NAME'];
      
      // tentar rodar o request anterior 
      try {
        const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
          method: isServer ? 'PUT' : 'GET',
          body: isServer? {refreshToken : currentRefreshToken} : undefined
        });
         // Guardar os token 
      const newAccessToken = refreshResponse.body.data.token;
      const newRefreshToken = refreshResponse.body.data.refreshToken;

      if (isServer) {
        nookies.set( fetchOptions.ctx  ,'REFRESH_TOKEN_NAME', newRefreshToken, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
        })
      }
        tokenService.save(newAccessToken)
        
        const retryResponse = await HttpClient(fetchUrl, {
          ...options,
          refresh: false,
          headers: {
            'Authorization': `Bearer ${newAccessToken}`
          }
        })
        
        return retryResponse
      }catch(err){
        
        return response
      }
      
    });
}
