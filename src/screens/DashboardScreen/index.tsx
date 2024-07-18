/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import Link from "next/link";
import { authService } from "../../services/auth/authService";
import CustomModal from "../../components/common/CustomModal";
import { requireAuthentication } from "../../helpers/auth";

// export const getServerSideProps = withSession(async (ctx) => {
//   const session = ctx.req.session;
//   const token = ctx.req.token;

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false,
//       },
//     };
//   }

//   try {
//     const dadosSala = await authService.dadosSala(token);

//     return {
//       props: {
//         session,
//         dadosSala,
//       },
//     };
//   } catch (error) {
//     return {
//       redirect: {
      
//         permanent: true,
//       },
//     };
//   }
// });
export const getServerSideProps = requireAuthentication(async (ctx) => {
  const token = ctx.req.token;
  try {
    const dadosSala = await authService.dadosSala(token);

    return {
      props: {
        dadosSala,
      },
    };
  } catch (error) {
    return {
      redirect: {
      
        permanent: true,
      },
    };
  }
});

export default function Dashboard(props) {

    return (
        <>
            Dashboard
            <CustomModal/>
            <Link href={'/integracao'}>integracao</Link>
            {/* <pre>
            {JSON.stringify(props, null, 2)}
        </pre>  */}
        <Link href={'/sala'}>Sala</Link>
        
        </>
    )
}




// export default function Dashboard() {
//   const { data: session } = useSession();

//   if (!session) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome, {session.user.email}!</p>
//     </div>
//   );
// }
/* eslint-disable react/no-children-prop */
// import React from "react";
// import MenuAppBar from "../../components/layout/Header/PrivateLayout";
// import { withSession } from "../../services/auth/session";

// import axios from "axios";
// import { tokenService } from "../../services/auth/tokenService";

// export const getServerSideProps = withSession(async (ctx) => {
//   // Recupera a sessão
//   const session = ctx.req.session;

//   // Faz a chamada ao endpoint adicional
//   let userInfo = null;
//   const token = tokenService.get(ctx);
//   console.log('token', token)
  

//   return {
//     props: {
//       session,
//       userInfo,
//       token,
//     }
//   };
// });


// export default function Dashboard(props) {

//     return (
//         <>
          
//             Dashboard
//             <pre>
//             {JSON.stringify(props, null, 2)}
//         </pre> 
//         </>
//     )
// }



