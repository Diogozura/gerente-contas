/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import Link from "next/link";
import { authService } from "../../services/auth/authService";
import CustomModal from "../../components/common/CustomModal";
import { requireAuthentication } from "../../helpers/auth";
import LineChart from "../../components/charts/LineChart";
import {  Button, Container, Divider, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import Head from "next/head";
import ListaDeNotificacao from "./listaNotificações";
import { useRouter } from "next/router";


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
interface Anuncio {
  titulo: string;
  slug: string;
  produtos: [];
  marketingPlaces: [];
}
export default function Dashboard(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const [storedAnuncios, setStoredAnuncios] = React.useState<Anuncio[]>([])
const router = useRouter();
  React.useEffect(() => {
    const storedAnuncios = localStorage.getItem("anuncios");
    if (storedAnuncios && storedAnuncios !== "[]") {
      setStoredAnuncios(JSON.parse(storedAnuncios));
    }else{
      setOpenModal(true)
    }
  }, []);
 
  console.log('storedAnuncios', storedAnuncios)
    return (
        <>
           <Head>
            <title>Hubeefive - Anúncios</title>
        </Head>
        <Container >

        <Grid item>
           <Button variant="contained" color="primary" onClick={() => router.push("/anuncios/criar-anuncio")}>
          Criar anuncio
          </Button>
        </Grid>
        {storedAnuncios.map((e, index) => (
    <Paper
      key={index}
      style={{
        padding: 16,
       
        marginBottom: 16,
      }}
    >
      <Typography variant="h3" component="h2">
        <Link href={`/anuncios/${e.slug}`}> {e.titulo} </Link>
      </Typography>

      {/* Renderiza os produtos */}
      <Typography variant="body1" component="p">
        <strong>Produtos:</strong>
      </Typography>
      {e.produtos?.map((produto: { titulo: string; sku: string }, idx: number) => (
        <Typography key={idx} variant="body2" component="p">
          {`- ${produto.titulo} (SKU: ${produto.sku})`}
        </Typography>
      ))}

      {/* Renderiza os marketing places */}
      <Typography variant="body1" component="p">
        <strong>🔗</strong> {e.marketingPlaces?.join(", ")}
      </Typography>
    </Paper>
  ))}
        </Container>

     
  {/* Modal de edição */}
  <Modal open={openModal}>
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 16,
            maxWidth: '550px',
          }}
        >
          <Typography variant="h4" component={'h3'}>Você não possui anuncios criados <Link href={'/anuncios/criar-anuncio'} style={{
            textDecoration: 'underline'
          }}>click aqui</Link> para criar um anuncio</Typography>

          {/* <Typography  variant="h4" component={'h3'}>Você não possui integração com nenhum marketing Place <Link href={'/gerenciamento?tab=integracoes'}
            style={{
                textDecoration: 'underline'
              }}
            > click aqui</Link> para criar uma integração</Typography> */}
        </Paper>
      </Modal>
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



