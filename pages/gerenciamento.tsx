import React from 'react';
import { Box, Button, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import Head from 'next/head';

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

const icons = [
  { src: '/marketingplaces/mercadoLivre.png', alt: 'Mercado Livre' },
  { src: '/marketingplaces/shopee.png', alt: 'Shopee' },
  { src: '/marketingplaces/magalu.png', alt: 'Magalu' },
  { src: '/marketingplaces/americanas.png', alt: 'Americanas' },
  { src: '/marketingplaces/amazon.png', alt: 'Amazon' },
];

const IntegrationsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

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
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Tabs */}
        <Paper elevation={3} sx={{ mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Integrações" />
            <Tab label="Minhas Integrações" />
          </Tabs>
        </Paper>

        {/* Painel de conteúdo */}
        <TabPanel hidden={selectedTab !== 0}>
          <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1" gutterBottom>
              Selecione um Marketplace para integrar ao HubeeFive
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
              {icons.map((icon) => (
                <Box
                  key={icon.alt}
                  component="img"
                  src={icon.src}
                  alt={icon.alt}
                  sx={{
                    height: 50,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                />
              ))}
            </Box>
          </Paper>
        </TabPanel>

        <TabPanel hidden={selectedTab !== 1}>
          {/* Conteúdo para "Minhas Integrações" */}
          <Typography>Conteúdo da aba "Minhas Integrações".</Typography>
        </TabPanel>
      </Container>

      {/* Botão de Ajuda no Canto Inferior Direito */}
      <Box
        position="fixed"
        bottom={16}
        right={16}
        sx={{
          width: 48,
          height: 48,
          backgroundColor: '#6A1B9A',
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 3,
        }}
      >
        ?
      </Box>
    </Box>
    </>
  );
};

export default IntegrationsPage;
