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
      if (!fetchOptions.refresh) return response;
      console.log('response.status', response.status)
      if (response.status !== 401) return response;

      const isServer = true
      const currentRefreshToken = fetchOptions?.ctx?.req?.cookies['REFRESH_TOKEN_NAME'];
    console.log('antes do try')
     
        // tentar rodar o request anterior 
      try {
     console.log('entrei no try')
      const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
        method: isServer ? 'PUT' : 'GET',
        body: isServer? {refreshToken : currentRefreshToken} : undefined
      });
     // Guardar os token 
      const newAccessToken = refreshResponse.body.data.access;
      const newRefreshToken = refreshResponse.body.data.refresh;
   
     console.log('refreshResponse', refreshResponse)
     console.log('newRefreshToken', newRefreshToken)
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
        'Content-Type': 'application/json'
      },
      body: { token: newAccessToken },
    })
    console.log('retryResponse', retryResponse) 
    return retryResponse
  }catch(err){
    
    return response
  }
      
    });
  
  
}

