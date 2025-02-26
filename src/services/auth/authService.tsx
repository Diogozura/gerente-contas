import { HttpClient } from '../../infra/HttpClient/HttpClient';
import { tokenService } from './tokenService';
import axios from 'axios';

interface Props {
  data: {
    refreshToken: string;
    token: string
  }

}

export const authService = {
  //Planos hub
  async planosHub() {
    try {
      const response = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/hub/planos_hub`,
        { method: "GET" }
      );
      return response.body;
    } catch (error) {
      console.error("Erro ao buscar planos do hub:", error);
      throw error; // Deixe o erro ser tratado pelo getServerSideProps
    }
  },

//Primeiro contato
async primeiroContato({ body }) {

  return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/primeiro_contato`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    } ,
    body,
  })
    .then((response) => {
      tokenService.savePay(response.body.dados.token);
      if (!response.ok) throw new Error(response.body.mensagem)
     return response.body.mensagem;
    }
  )
},
  
//Primeiro contato
async confirmarPagamento( {id} ) {

  return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/confirmar_pagamento?token=${id}`, {
    method: 'POST',
    body:{}
  })
    .then((response) => {
      tokenService.savePay(response.body);
  
     return response;
    })
},
  
//Cadastro
  async cadastroConta({ body, id }) {

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/cadastrar_usuario?token=${id}`, {
      method: 'POST',
      body
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.body.mensagem)
       return res
      })
  },

  // Login
  async login({ body }) {
    // var myHeaders = new Headers();
    // myHeaders.append('Authorization', 'Basic ' + Buffer.from(`${username}:${password}`, 'binary').toString('base64'))

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          } ,
          body
        })
      .then(response => {
      
        tokenService.save(response.body.access);
        const body = response.body
        if (!response.ok) throw new Error(response.body.detail)
        return body;
      
      })
      .then(async({refresh}) => {
        await HttpClient('/api/refresh', {
          method: 'POST',
          body: {
            refresh
          },
        })

      })
},
  // Session
  async getSession(ctx) {
    const token = tokenService.get(ctx);
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/token/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { token },
      ctx,
      refresh: true,
    }
    )
      .then(response => {
        if (!response.ok) throw new Error('Não autorizado');
        return response;
      });
  },

  /* Troca Senha*/
  //Email
  async esqueciMinhaSenha(body) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/esqueci_minha_senha`, {
      method: 'POST',
      body,
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.body.txt)
      })
  },
  //Nova senha
  async novaSenha({ password, token }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/redefinir_senha`, {
      method: 'POST',
      body: { password, token },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.body.txt)
      })
  },
  async dadosSala(token) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/user_info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      refresh : true
    }
    )
      .then(response => {
        console.log('response', response.body.dados.contas[0].id)
        // if (!response.ok) throw new Error('Não autorizado');
        return response.body;
      });

  },
  async retornaEmpresas(token, {idConta}) {
    console.log('idConta', idConta)
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/hub/${idConta}/empresa`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      refresh : true
    }
    )
      .then(response => {
        // if (!response.ok) throw new Error('Não autorizado');
        return response.body.dados;
      });

  },
  async retornaDetalhesEmpresa({contaId, idEmpresa}) {
    const token = tokenService.get();
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/hub/${contaId}/empresa/${idEmpresa}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      refresh : true
    }
    )
      .then(response => {
        // if (!response.ok) throw new Error('Não autorizado');
        return response.body.dados;
      });

  },
  async cadastroEmpresa({idEmpresa, body}, ctx) {
  const token = tokenService.get(ctx);

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/hub/${idEmpresa}/empresa`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body
    }
    )
      .then(response => {
        if (!response.ok) throw new Error(response.body.mensagem)
        return response.body;
      });

  },
  async compartilhaConta({idConta, body}) {
  const token = tokenService.get();

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${idConta}/compartilhamento_conta`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body
    }
    )
      .then(response => {
        if (!response.ok) throw new Error(response.body.mensagem)
        return response.body;
      });

  },
  async deletaCompartilhaConta({idConta, permissao_id}) {
  const token = tokenService.get();

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${idConta}/compartilhamento_conta/${permissao_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
      .then(response => {
        if (!response.ok) throw new Error(response.body.mensagem)
        return response.body;
      });

  },
  async listaCompartilhamentoConta({contaId}) {
    const token = tokenService.get();
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${contaId}/compartilhamento_conta`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      refresh : true
    }
    )
      .then(response => {
        // if (!response.ok) throw new Error('Não autorizado');
        return response.body.dados;
      });

  },
  async criaProduto({idConta, body}) {
    const token = tokenService.get();
  
      return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}loja/api/${idConta}/produto_filho`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body
      }
      )
        .then(response => {
          if (!response.ok) throw new Error(response.body.mensagem)
          return response.body;
        });
  
    },
  async retornaTodosProdutos({contaId}) {
      const token = tokenService.get();
      return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}loja/api/${contaId}/retorna_todos_produtos_filho`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        refresh : true
      }
      )
        .then(response => {
          // if (!response.ok) throw new Error('Não autorizado');
          return response.body.dados;
        });
  
    },
  async retornaProduto({contaId, idProduto}) {
      const token = tokenService.get();
      return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}loja/api/${contaId}/produto_filho/${idProduto}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        refresh : true
      }
      )
        .then(response => {
          // if (!response.ok) throw new Error('Não autorizado');
          return response.body.dados;
        });
  
    },
  async authIntegracaoML(token) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}mercadolivre/api/auth/`, {
    // return HttpClient(`http://192.168.0.109:8000/mercadolivre/api/auth`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
      .then(response => {
        if (!response.ok) throw new Error('Não autorizado');
        return response;
      });

  },
  async authRetornoML({code, token}) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}mercadolivre/api/return_auth?code=${code}`, {
    // return HttpClient(`http://192.168.0.109:8000/mercadolivre/api/return_auth?code=${code}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
      .then(response => {
        if (!response.ok) throw new Error('Não autorizado');
        return response;
      });

  }, 
};