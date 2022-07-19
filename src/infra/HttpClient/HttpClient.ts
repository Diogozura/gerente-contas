export async function HttpClient(fetchUrl: RequestInfo | URL, fetchOptions: {
  method?: string;
  body?: any;
  headers?: any 
}) {
  const options = {
    ...fetchOptions,
    headers:{
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  
  }
  return fetch(fetchUrl, options) 
  // To USANDO YARN

    .then(async(respostaDoServidor) => {
      return {
        ok: respostaDoServidor.ok,
        status: respostaDoServidor.status,
        statusText: respostaDoServidor.statusText,
        body: await respostaDoServidor.json(),
      }
    })
  
}