/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import { Button } from "@mui/material";
import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "../../services/auth/tokenService";

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session
    }
  }
})


function Sala(props) {

  const onClick = async (ctx) => {
    // try {
    //   const response = await HttpClient('/api/refresh', {
    //     method: 'PUT',
    //   });
    //   // console.log('API response:', response);
    //   // Faça algo com a resposta, se necessário
    // } catch (error) {
    //   console.error('Error refreshing:', error);
    // }
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
      .then((response) => {
        console.log('response', response.status)
        if (!response.ok) throw new Error('Não autorizado');
        return response.body;
      });
  }
    return (
        <>
            <pre>
            {JSON.stringify(props, null, 2)}
        </pre> 
        <Button onClick={onClick}>
          Refresh
        </Button>
        </>
    )
}

export default Sala

/* eslint-disable react/no-children-prop */
// import React from "react";
// import { withSession } from "../../services/auth/session";

// // Função de alta ordem (HOC) que verifica se o usuário está autenticado
// export const getServerSideProps = withSession((ctx) => {
//   // Se o usuário não estiver autenticado, redirecione para a página de login
//   if (!ctx.req.session.user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   // Se o usuário estiver autenticado, retorne props vazias
//   return {
//     props: {},
//   };
// });

// function Sala() {
//   return (
//     <div>
//       <h1>Bem-vindo à Sala</h1>
//       {/* Conteúdo da sua página Sala */}
//     </div>
//   );
// }

// export default Sala;

