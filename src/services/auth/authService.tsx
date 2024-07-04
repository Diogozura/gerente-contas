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

//Primeiro contato
async primeiroContato({ email, plano }) {

  return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/primeiro_contato`, {
    method: 'POST',
    body: {  email, plano },
  })
    .then((response) => {
      tokenService.savePay(response.body.dados.token);
      console.log('response', response)
     return response;
    })
},
  
//Cadastro
  async cadastro({ firstname, lastname, email, password, cpf }) {

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/cadastro`, {
      method: 'POST',
      body: { firstname, lastname, email, password, cpf },
    })
      .then((res) => {
       return res
      })
  },

  // Login
  async login({ username, password }) {
    // var myHeaders = new Headers();
    // myHeaders.append('Authorization', 'Basic ' + Buffer.from(`${username}:${password}`, 'binary').toString('base64'))

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          } ,
          body: { username, password }
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
        return response.body;
      });
  },

  /* Troca Senha*/
  //Email
  async email({ email}) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/esqueci_minha_senha`, {
      method: 'POST',
      body: { email },
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
  async dadosSala(ctx) {
    const token = tokenService.get(ctx);
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/user_info`, {

      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log('reere', res)
        
      })
  },
};