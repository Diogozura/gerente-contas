/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import Link from "next/link";
import { authService } from "../../services/auth/authService";
import CustomModal from "../../components/common/CustomModal";
import { requireAuthentication } from "../../helpers/auth";
import LineChart from "../../components/charts/LineChart";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";
import ListaDeNotificacao from "./listaNotificações";


// export const getServerSideProps = requireAuthentication(async (ctx) => {
//   // const token = ctx.req.token;
//   // try {
//   //   const dadosSala = await authService.dadosSala(token);

//   //   return {
//   //     props: {
//   //       dadosSala,
//   //     },
//   //   };
//   // } catch (error) {
//   //   return {
//   //     redirect: {
      
//   //       permanent: true,
//   //     },
//   //   };
//   // }
// });

export default function Dashboard(props) {
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

 const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 2,4, 5],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1, 2,4, 5],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
    return (
        <>
           <Head>
            <title>Hubeefive - Gerenciamento</title>
        </Head>
        <Container >
        <Box sx={{ bgcolor: '#cfe8fc', height: '50vh', mt:2, p:2, borderRadius:3  }} >
          <Typography textAlign={'center'} component={'h3'} variant="h4">Notificações</Typography>
          <ListaDeNotificacao/>
        </Box>
        <Divider sx={{m:1}}/>

        <Box sx={{ bgcolor: '#cfe8fc', height: '50vh' }} >
        <LineChart data={data}/>
        </Box>
         <Divider sx={{m:1}}/>
         <Box sx={{ bgcolor: '#cfe8fc', mt:2, p:2, borderRadius:3 }} >
            <Typography textAlign={'center'} component={'h3'} variant="h4">Lojas Integradas </Typography>
            <Typography>Loja beefive</Typography>
        </Box>
        </Container>

     

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



