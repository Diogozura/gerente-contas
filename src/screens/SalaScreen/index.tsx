/* eslint-disable react/no-children-prop */
import React from "react";
import MenuAppBar from "../../components/base/Header/PrivateLayout";
import { withSession } from "../../services/auth/session";

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session
    }
  }
})


function Sala(props) {
    return (
        <>
      
            <pre>
            {JSON.stringify(props, null, 2)}
        </pre> 
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

