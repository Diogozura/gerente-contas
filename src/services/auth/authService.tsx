import { HttpClient } from '../../infra/HttpClient/HttpClient';
import { tokenService } from './tokenService';

interface Props{
  data:{
    refreshToken: string;
    token: string
  }
  
}

export const authService = {
    async cadastro({ name, email, password }) {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cadastro`, {
            method: 'POST',
            body: { name, email, password },
        })
          .then((res) => {
            if (!res.ok) throw new Error(res.body.txt)
    }) 
    },


    // Login 
    async login({ username, password }) {
        // var myHeaders = new Headers();
        // myHeaders.append('Authorization', 'Basic ' + Buffer.from(`${username}:${password}`, 'binary').toString('base64'))
    
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`, 'binary').toString('base64')
        },
        redirect: 'follow'
      })
        .then(async (response) => {
          if (!response.ok) throw new Error('Erro ao fazer o login')
           await response.json()
            
            .then(async(data) => {
              tokenService.save(data.token);
              
             return data
            })
            .then(async({refreshToken}) => {
             
              const response = await HttpClient('/api/refresh', {
                method: 'POST',
                body: {
                  refreshToken
                },
              
              })
             
              return response
          })
        })
    },
    // Session 
  async getSession(ctx) {
    const token = tokenService.get(ctx);

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dadoscadastro`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      ctx,
      refresh: true,
    }
       
    )
    .then((response) => {
      if(!response.ok) throw new Error('Não autorizado');
      return response.body;
    });
  }
};