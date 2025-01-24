/* eslint-disable react/no-children-prop */
import React from "react";
import { withSession } from "../../services/auth/session";
import Link from "next/link";
import { authService } from "../../services/auth/authService";
import CustomModal from "../../components/common/CustomModal";
import { requireAuthentication } from "../../helpers/auth";
import LineChart from "../../components/ui/charts/LineChart";
import {  Box, Button, Container, Divider, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import Head from "next/head";
import ListaDeNotificacao from "./listaNotificações";
import { useRouter } from "next/router";
import Image from "next/image";
import FiltroTexto from "../../components/common/FiltroText";
import { Delete } from "@mui/icons-material";
import { Anuncio } from "@/types/anuncio";


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
  const [openModal, setOpenModal] = React.useState(false);
  const [storedAnuncios, setStoredAnuncios] = React.useState<Anuncio[]>([])
  const [textoFiltro, setTextoFiltro] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState<Anuncio[]>([]); // Produtos filtrados
    
const router = useRouter();
  React.useEffect(() => {
    const storedAnuncios = localStorage.getItem("anuncios");
    if (storedAnuncios && storedAnuncios !== "[]") {
      setStoredAnuncios(JSON.parse(storedAnuncios));
    }else{
      setOpenModal(true)
    }
  }, []);

   React.useEffect(() => {
      // Atualiza os produtos filtrados sempre que os filtros ou os produtos mudarem
      const filtered = storedAnuncios.filter((product) => {
        const matchText =
          product.titulo.toLowerCase().includes(textoFiltro.toLowerCase()) 

        return matchText;
      });
      setFilteredProducts(filtered);
    }, [storedAnuncios, textoFiltro]);
 
    const produtosFiltrados = storedAnuncios.filter((produto) =>
      produto.titulo.toLowerCase().includes(textoFiltro.toLowerCase())
     
    );
    const handleDelete = (slug: string) => {
      const updatedAnuncios = storedAnuncios.filter((anuncio) => anuncio.slug !== slug);
      setStoredAnuncios(updatedAnuncios); // Atualiza o estado
      localStorage.setItem("anuncios", JSON.stringify(updatedAnuncios)); // Atualiza o localStorage
    };

    return (
        <>
           <Head>
            <title>Hubeefive - Anúncios</title>
        </Head>
        <Grid container justifyContent="flex-end" alignItems="center" spacing={2} padding={6} sx={{ mb: 4 }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => router.push("/anuncios/criar-anuncio")}>
            Criar anuncio
            </Button>
          </Grid>
      </Grid>
        <Container>
          <Grid display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={2}
          >
          
        <FiltroTexto
            label="Filtrar por título ou SKU"
            value={textoFiltro}
            onChange={setTextoFiltro}
          />
          <Typography  variant="body1" component={'p'}>Total de anúncios : <strong> {produtosFiltrados.length}</strong></Typography>
          </Grid>
       
        {produtosFiltrados.map((e, index) => (
            <Paper
              key={index}
              style={{
                padding: 16,
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                marginBottom: 16,
              }}
            >
              <Box>
              <Box display={'flex'} alignItems={'center'}>
                <Image width={'100'} height={'100'} src={'/defaultImage.png'} alt={"image default"}/>
                <Typography variant="h3" component="h2" color={'primary'}>
                <Link href={`/anuncios/${e.slug}`} > {e.titulo} </Link>
              </Typography></Box>
              <Box>
              {/* Renderiza os produtos */}
              <Typography variant="body1" component="p">
                <strong>Produtos:</strong>
              </Typography>
              {e.produto?.map((produtos: { titulo: string; sku: string }, idx: number) => (
                <Typography key={idx} variant="body2" component="p">
                  {`- ${produtos.titulo} (SKU: ${produtos.sku})`}
                </Typography>
              ))}

              {/* Renderiza os marketing places */}
              <Typography variant="body1" component="p">
                <strong>🔗</strong> {e.marketingPlaces?.join(", ")}
              </Typography>
              </Box>
             

           
             
              

              </Box>
              <Box>
              <Button
            variant="contained"
           color="inherit"
            onClick={() => handleDelete(e.slug)}
            sx={{ m: 1 }}
          >
            <Delete />
          </Button>
              </Box>
              
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



