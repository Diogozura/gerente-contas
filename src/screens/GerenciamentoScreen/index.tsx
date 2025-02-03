import React from 'react';
import { Box, Button, Container, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Head from 'next/head';
import MinhasIntegracoes from './ListaIntegracoes/index';
import Image from 'next/image';
import icons from '../../../src/mock/icones.json';
import { useRouter } from 'next/router';
import Tour from '@/components/tuor';
import { gerenciamentoSteps } from '@/features/tours/gerenciamentoSteps/step';
import { ModalVinculo } from '@/components/ui/Modal';
import { showToast } from '@/components/common/AlertToast';
import { IntegracaoMarketingPlace } from '@/types/IntegracaoMarketingPlace';
import { getIntegracoes, saveIntegracao } from './ManipulandoLocalStorage';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


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
  const [nomeLoja, setNomeLoja] = React.useState("");
  const [integracoes, setIntegracoes] = React.useState<IntegracaoMarketingPlace[]>([]);
  const [modalState, setModalState] = React.useState({
    open: false,
    tipo: "",
    marketplace: null as { id: string; nome: string } | null,
  });

  React.useEffect(() => {
    setIntegracoes(getIntegracoes());
    if (router.query.tab === "minhas-integracoes") {
      setSelectedTab(1);
    }
  }, [router.query]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    router.push(`?tab=${newValue === 1 ? "minhas-integracoes" : "integracoes"}`, undefined, { shallow: true });
  };

  const handleOpenModal = (marketplace: { id: string; nome: string }) => {
    setModalState({
      open: true,
      tipo: "Seleção Marketing Place",
      marketplace,
    });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, tipo: "", marketplace: null });
    setNomeLoja("");
  };

  const handleSaveModal = () => {
    if (!modalState.marketplace || !nomeLoja.trim()) return;

    const novaIntegracao: IntegracaoMarketingPlace = {
      nomeMarketplace: modalState.marketplace.nome,
      nomeLoja,
    };

    saveIntegracao(novaIntegracao);
    setIntegracoes(getIntegracoes());

    showToast({
      title: "Salvo com sucesso!",
      status: "success",
      position: "bottom-left",
    });

    handleCloseModal();
  };


  return (
    <>
      <Head>
        <title>Hubeefive - Gerenciamento</title>
      </Head>
      <Box display="flex" p={10} key={router.asPath}>
        {/* Menu Lateral */}
        <SideMenu>
          <Typography variant="h6" color="primary" fontWeight="bold" display={'flex'} alignItems={'center'}>
            Integrações <PlayArrowIcon color='primary'/>
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
              <Tab label="Minhas Integrações" id='integracoes-feitas' />
            </Tabs>
          </Paper>

          {/* Painel de conteúdo */}
          <TabPanel sx={{ p: 0, display: selectedTab === 0 ? 'block' : 'none' }}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: '0px', textAlign: 'center', backgroundColor: '#ffff' }}>
              <Typography variant="subtitle1" textAlign="left" gutterBottom p={2}>
                Selecione um Marketplace para integrar ao HubeeFive
              </Typography>
              <Box display="flex" justifyContent="space-around" gap={2} flexWrap="wrap">
                {icons.map((icon) => (
                  <Button
                    id="choose-marketplace"
                    key={icon.alt}
                    disabled={icon.disabled}
                    sx={{
                      p: 0,
                      minWidth: 'auto',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => handleOpenModal({ id: icon.alt, nome: icon.alt })}
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={icon.width}
                      height={icon.height}
                      style={{ objectFit: 'contain' }}
                    />
                  </Button>
                ))}
              </Box>
            </Paper>
          </TabPanel>

          <TabPanel sx={{ p: 0, display: selectedTab === 1 ? 'block' : 'none' }}>
            
            <MinhasIntegracoes />
          </TabPanel>


        </Container>
      </Box>
      <Tour steps={gerenciamentoSteps} nextPage='/gerenciamento?tab=minhas-integracoes' />
      <ModalVinculo
        open={modalState.open}
        onClose={handleCloseModal}
        title={modalState.tipo}
        subTitulo=""
        onSave={handleSaveModal}>
        <TextField
          fullWidth
          label="Nome da Loja"
          value={nomeLoja}
          onChange={(e) => setNomeLoja(e.target.value)}
          sx={{ mt: 2 }}
        />
      </ModalVinculo>
    </>
  );
};

export default IntegrationsPage;
