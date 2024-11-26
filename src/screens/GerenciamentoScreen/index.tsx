import React from 'react';
import { Box, Button, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import Head from 'next/head';
import MinhasIntegracoes from './ListaIntegracoes/index';
import Image from 'next/image';
import icons from '../../../src/dadosFakes/icones.json';
import { useRouter } from 'next/router';
import Filtro from './Filtro';


// Estilização para o menu lateral
const SideMenu = styled(Paper)({
  width: '250px',
  borderRight: '2px solid #E0E0E0',
  padding: '20px',
  height: '80vh',
  backgroundColor: '#FAFAFA',
});

const TabPanel = styled(Box)({
  padding: '16px',
});



const IntegrationsPage: React.FC = () => {
  // const [selectedTab, setSelectedTab] = React.useState(0);


  const router = useRouter();
  const { tab } = router.query; // Obtém o parâmetro `tab` da URL
  const selectedTab = tab === "minhas-integracoes" ? 1 : 0; // Define o tab com base na query

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const newTab = newValue === 1 ? "minhas-integracoes" : "integracoes"; // Define a query com base no tab clicado
    router.push(`?tab=${newTab}`, undefined, { shallow: true }); // Atualiza a URL sem recarregar a página
  };


  const dadosIntegracao = [
    {
      nomeLoja: 'beefive',
      icon: {
        src: '/marketingplaces/log-mercado-livre.png',
        alt: 'logo mercado livre'
      },
      atencao: 'tem que ver isso ai meu truta',

    },
    {
      nomeLoja: 'Universos Encaixados',
      icon: {
        src: '/marketingplaces/log-mercado-livre.png',
        alt: 'logo mercado livre'
      },
      error: 'Vincule esta integração a um CNPJ ou CPF correspondente'
    },
  ]
  return (

    <>
      <Head>
        <title>Hubeefive - Gerenciamento</title>
      </Head>
      <Box display="flex" p={10}>
        {/* Menu Lateral */}
        <SideMenu>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Integrações
          </Typography>
        </SideMenu>

        {/* Conteúdo Principal */}
        <Container sx={{ mt: 4 }}>
          {/* Tabs */}
          <Paper component={'aside'} elevation={3} sx={{ maxWidth: '600px' }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '.MuiTabs-indicator': {
                  display: 'none', // Esconde o indicador
                },
                '.MuiTab-root': {
                  backgroundColor: '#F5F5F5', // Cor inativa
                  color: '#9E9E9E', // Texto inativo
                  // '&:hover': {
                  //   backgroundColor: '#E0E0E0', // Cor ao passar o mouse
                  // },
                },
                '.Mui-selected': {
                  backgroundColor: '#FFFFFF', // Cor ativa
                  color: '#000000', // Texto ativo
                  fontWeight: 'bold',
                },
              }}
            >
              <Tab label="Integrações" />
              <Tab label="Minhas Integrações" />
            </Tabs>
          </Paper>

          {/* Painel de conteúdo */}
          <TabPanel hidden={selectedTab !== 0}>
            <Paper elevation={1} sx={{p:1, textAlign: 'center', backgroundColor:'#ffff' }}>
              <Typography variant="subtitle1" textAlign={'left'} gutterBottom p={2}>
                Selecione um Marketplace para integrar ao HubeeFive
              </Typography>
              <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                {icons.map((icon) => (
                  <Button
                    key={icon.alt}
                    sx={{
                      p: 0, // Remove o padding padrão do botão
                      minWidth: 'auto', // Remove o tamanho mínimo do botão
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)', // Efeito de zoom
                      },
                    }}
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={138}
                      height={46}
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </Button>
                ))}
              </Box>
            </Paper>
          </TabPanel>

          <TabPanel hidden={selectedTab !== 1}>
            {/* Conteúdo para "Minhas Integrações" */}
            <Filtro />
            <MinhasIntegracoes dadosIntegracao={dadosIntegracao} />
          </TabPanel>
        </Container>

        {/* Botão de Ajuda no Canto Inferior Direito */}
      </Box>
    </>
  );
};

export default IntegrationsPage;
