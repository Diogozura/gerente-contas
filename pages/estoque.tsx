import { Box, Container, Divider, Grid, Paper, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import { styled } from '@mui/system';


// Estilização para o menu lateral
const SideMenu = styled(Paper)({
    width: '250px',
    borderRight: '2px solid #E0E0E0',
    padding: '20px',
    height:'80vh',
    backgroundColor: '#FAFAFA',
  });
  
  const TabPanel = styled(Box)({
    padding: '16px',
  });
export default function Estoque(){
    return(
        <>
       <Head>
            <title>Hubeefive - Gerenciamento</title>
        </Head>
        <Box bgcolor={'#f4f4f4'} padding={10}>

        </Box>
        <Divider/>
        <Box bgcolor={'#f4f4f4'} padding={10}>

        </Box>
        <Divider/>

        <Box bgcolor={'#f4f4f4'} padding={10}>

        </Box>
    <Box display="flex" p={10}>
      {/* Menu Lateral */}
      <SideMenu>
        <Typography variant="h6" color="primary" fontWeight="bold">
          Integrações 
        </Typography>
      </SideMenu>

      {/* Conteúdo Principal */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Tabs */}
       

        {/* Painel de conteúdo */}
        

        
      </Container>

      {/* Botão de Ajuda no Canto Inferior Direito */}
     
    </Box>
        </>
    )
}