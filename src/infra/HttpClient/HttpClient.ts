
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
      if (!fetchOptions.refresh) {
        return response
      } 
      if (response.status !== 401) return response

      // console.log('ATUALIZA TOKEN')
      const currentRefreshToken = fetchOptions?.ctx?.req?.cookies['REFRESH_TOKEN_NAME'];
      // console.log('currentRefreshToken', currentRefreshToken)
      // tentar rodar o request anterior 
      try {
        const refreshResponse = await HttpClient('https://gerente-contas-git-dev-diogozura.vercel.app/api/refresh', {
          method: 'PUT',
          body: {refreshToken : currentRefreshToken} 
        });
        // console.log('refreshResponse', refreshResponse)
         // Guardar os token 
      const newAccessToken = refreshResponse.body.data.token;
        const newRefreshToken = refreshResponse.body.data.refreshToken;
        // console.log('novo token ', newAccessToken)
        // console.log('newRefreshToken', newRefreshToken)
     
        nookies.set( fetchOptions.ctx  ,'REFRESH_TOKEN_NAME', newRefreshToken, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
        })
        nookies.set( fetchOptions.ctx  ,'ACCESS_TOKEN_KEY', newAccessToken, {
          path: '/',
        })
      
       
        
        const retryResponse = await HttpClient(fetchUrl, {
          ...options,
          refresh: false,
          headers: {
            'Authorization': `Bearer ${newAccessToken}`
          }
        })
        
        return retryResponse
      }catch(err){
        console.log(err)
        return response
      }
      
    });
}
