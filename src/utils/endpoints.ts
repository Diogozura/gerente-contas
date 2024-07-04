interface Endpoint {
    [method: string]: string;
  }
  
  interface Endpoints {
    [name: string]: Endpoint;
  }
  
  const endpoints: Endpoints = {
    primeiroContato: {
      POST: '/users/primeiro_contato',
    },
    // Adicione mais endpoints conforme necessário
    obterUsuarios: {
      GET: '/users',
    },
    atualizarUsuario: {
      PUT: '/users/:id',
    },
  };
  
  export default endpoints;
  