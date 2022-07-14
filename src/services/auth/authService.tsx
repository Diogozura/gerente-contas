import { HttpClient } from '../../infra/HttpClient/HttpClient';
import { tokenService } from './tokenService';


export const authService = {
    async cadastro({ name, email, password }) {
        return HttpClient(`https://gerente1.herokuapp.com/api/cadastro`, {
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
    
      await fetch('https://gerente1.herokuapp.com/api/login', {
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
            
            .then(async (data) => {
              tokenService.save(data.token);
              
            });
          })
        //     .then(res => {
        //     console.log(res)
        //     if (!res.ok) throw new Error('algo deu errado');
            
        //     // tokenService.save()
        //     return res.json();
        // })

    }
}
    // Session 
    
//   async getSession(ctx = null) {
//     const token = tokenService.get(ctx);

//     return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       refresh: true
//     })
//     .then((response) => {
//       if(!response.ok) throw new Error('Não autorizado');

//       return response.body.data;
//     });
//   }
// };