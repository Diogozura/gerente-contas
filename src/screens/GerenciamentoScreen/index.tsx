import React from 'react';
import { Box, Button, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Head from 'next/head';
import MinhasIntegracoes from './ListaIntegracoes/index';
import Image from 'next/image';
import icons from '../../../src/mock/icones.json';
import { useRouter } from 'next/router';
import Filtro from './Filtro';
import Tour from '@/components/tuor';
import { gerenciamentoSteps } from '@/features/tours/gerenciamentoSteps/step';



// Estilização para o menu lateral
const SideMenu = styled(Paper)(() => ({
  width: '250px',
  borderRight: '2px solid #E0E0E0',
  padding: '20px',
  height: '80vh',
  backgroundColor: '#FAFAFA',
}));

const TabPanel = styled(Box)(() => ({
  padding: '16px',
}));

const IntegrationsPage: React.FC = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false); // Controle de renderização no cliente

 

  // Sincroniza o estado inicial com a URL
  React.useEffect(() => {
    setIsClient(true);
    if (router.query.tab === "minhas-integracoes") {
      setSelectedTab(1);
    } else {
      setSelectedTab(0);
    }
  }, [router.query]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    const newTab = newValue === 1 ? "minhas-integracoes" : "integracoes";
    router.push(`?tab=${newTab}`, undefined, { shallow: true });
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
      error: 'Vincule esta integração a um CNPJ ou CPF correspondente',
    },
  ];

  if (!isClient) return null; // Evita renderizar no servidor

  return (
    <>
      <Head>
        <title>Hubeefive - Gerenciamento</title>
      </Head>
      <Box display="flex" p={10} key={router.asPath}>
        {/* Menu Lateral */}
        <SideMenu>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Integrações
          </Typography>
        </SideMenu>

        {/* Conteúdo Principal */}
        <Container sx={{ mt: 4 }}>
     
          {/* Tabs */}
          <Paper component="aside" elevation={3} sx={{ maxWidth: '600px' }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '.MuiTabs-indicator': { display: 'none' },
                '.MuiTab-root': {
                  backgroundColor: '#F5F5F5',
                  color: '#9E9E9E',
                },
                '.Mui-selected': {
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  fontWeight: 'bold',
                },
              }}
            >
              <Tab label="Integrações" />
              <Tab label="Minhas Integrações"  id='integracoes-feitas'/>
            </Tabs>
          </Paper>

          {/* Painel de conteúdo */}
          <TabPanel sx={{ display: selectedTab === 0 ? 'block' : 'none' }}>
            <Paper elevation={1} sx={{ p: 1, textAlign: 'center', backgroundColor: '#ffff' }}>
              <Typography variant="subtitle1" textAlign="left" gutterBottom p={2}>
                Selecione um Marketplace para integrar ao HubeeFive
              </Typography>
              <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                {icons.map((icon) => (
                  <Button
                    id="choose-marketplace"
                    key={icon.alt}
                    sx={{
                      p: 0,
                      minWidth: 'auto',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={138}
                      height={46}
                      style={{ objectFit: 'contain' }}
                    />
                  </Button>
                ))}
              </Box>
            </Paper>
          </TabPanel>

          <TabPanel sx={{ display: selectedTab === 1 ? 'block' : 'none' }}>
            <Filtro />
            <MinhasIntegracoes  dadosIntegracao={dadosIntegracao} />
          </TabPanel>

         
        </Container>
      </Box>
      <Tour steps={gerenciamentoSteps} nextPage='/gerenciamento?tab=minhas-integracoes'/>
    </>
  );
};

export default IntegrationsPage;
