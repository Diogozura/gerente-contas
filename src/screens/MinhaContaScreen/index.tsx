import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Button, Typography, Box, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, IconButton, Divider, CircularProgress, Paper, TextField, } from "@mui/material";
import Head from "next/head";

import { useFormContext } from "@/config/FormContext";

import { authService } from "@/services/auth/authService";
import { requireAuthentication } from "@/helpers/auth";
import MinhaContaForm from "@/components/forms/MinhaContaForm";
import NovoUsuarioForm from "@/components/forms/NovoUsuarioForm";
import NovaEmpresaForm from "@/components/forms/NovaEmpresaForm";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { showToast } from "@/components/common/AlertToast";
import { ModalVinculo } from "@/components/ui/Modal";
import { PromiseNotification } from "@/components/common/PromiseNotification";
import { parseCookies } from "nookies";

interface Empresa {
  razao_social: string;
  cnpj: string;
}

interface User {
  email: string;
}
// Função para formatar CNPJ
const formatCNPJ = (cnpj: string) => {
  return cnpj?.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
};
export default function CreateUser({ retornaEmpresas, idConta }) {



  const { formValues, setFormValues } = useFormContext();
  const [openNovoUsuario, setOpenNovoUsuario] = useState(false);
  const [openNovaEmpresa, setOpenNovaEmpresa] = useState(false);
  const [usuariosConta, setUsuariosConta] = useState([]);
  const [emailPrincipal, setEmailPrincipal] = useState("");
  const [empresas, setEmpresas] = useState<Record<string, any>>({});
  const [empresasConta, setEmpresasConta] = useState([]);

  const [detalhesEmpresa, setDetalhesEmpresa] = useState({});
  const [contaCompartilhada, setContaCompartilhada] = useState([]);
  const [loading, setLoading] = useState(null); // Para controlar o loading individualmente
  const [contaId, setContaId] = useState(null);


  useEffect(() => {
    const cookies = parseCookies();
    setContaId(cookies.idConta || idConta);
    setEmpresasConta(retornaEmpresas)
  }, []);

  const buscarDetalhesEmpresa = async (idEmpresa) => {
    if (detalhesEmpresa[idEmpresa]) return; // Se já buscou, não faz novamente

    setLoading(idEmpresa); // Define qual empresa está carregando
    try {
      const detalhes = await authService.retornaDetalhesEmpresa({ contaId, idEmpresa });
      console.log('detalhes', detalhes)
      setDetalhesEmpresa((prev) => ({
        ...prev,
        [idEmpresa]: detalhes,
      }));
    } catch (error) {
      console.error("Erro ao buscar detalhes da empresa:", error);
    } finally {
      setLoading(null); // Remove o estado de loading
    }
  };
  const buscarEmailUsuarios = async () => {



    try {
      const detalhes = await authService.listaCompartilhamentoConta({ contaId });
      console.log('detalhes emails', detalhes)
      setContaCompartilhada(detalhes)

    } catch (error) {
      console.error("Erro ao buscar detalhes da empresa:", error);
    } finally {
      setLoading(null); // Remove o estado de loading
    }
  };

  const [modalState, setModalState] = React.useState({
    open: false,
    tipo: "",
    empresaNome: "",
    email: "",
    permissao_id: '',
  });
  console.log('contaCompartilhada', contaCompartilhada)

  const handleOpenModal = (tipo: string, empresaNome?: string, email?: string, permissao_id?: string) => {
    setModalState({
      open: true,
      tipo,
      empresaNome,
      email, // Passa o email do usuário a ser excluído
      permissao_id
    });
  };
  const handleCloseModal = () => {
    setModalState({ ...modalState, open: false });
  };


  const handleSaveModal = () => {
    const { tipo, empresaNome, email, permissao_id } = modalState;
    switch (tipo) {
      case "Atenção":
        const infosFalantes = formValues.infosFaltantesInt;


        // Atualiza o localStorage


        showToast({
          title: "Informações completadas!",
          status: "success",
          position: "bottom-left",
        });

        handleCloseModal();
        break
      case "deletar email":


        if (email) {

          const cadastroConta = authService.deletaCompartilhaConta({
            permissao_id: email,
            idConta,
          });
          console.log('cadastroConta', cadastroConta)
          PromiseNotification({
            promise: cadastroConta,
            pendingMessage: "Deletando...",
            successMessage: "Usuário deletado com sucesso ...",
            errorMessage: "Ocorreu um erro ao tentar deletar item. Tente novamente.",
          });
          showToast({
            title: "Usuário removido com sucesso!",
            status: "success",
            position: "top-right",
          });
        }
        handleCloseModal();
        break;
      default:
        return null
    }


  };

  const renderModalContent = () => {
    const { tipo, email, empresaNome } = modalState;

    switch (tipo) {
      case "Configuração":
        return <Typography>Configuração da loja:</Typography>;
      case "deletar email":
        return <Typography>Tem certeza que deseja deletar? {empresaNome}</Typography>;
      case "Atenção":
        return (
          <Box>
            {/* <InfosFaltantesInt view={false} /> */}
          </Box>
        );
      default:
        return null;
    }
  };


  // Alterna entre os formulários
  const handleNovoUsuario = () => {
    setOpenNovoUsuario(true);
    setOpenNovaEmpresa(false);
  };

  const handleNovaEmpresa = () => {
    setOpenNovaEmpresa(true);
    setOpenNovoUsuario(false);
  };

  // Salva os campos 

  const handleSalvarUsuario = () => {
    const { email } = formValues.novoUsuario;
    if (!email) {
      alert("Email é obrigatório!");
      return;
    }

 

 
    const compartilhaConta = authService.compartilhaConta({
      body: {
        email
      },
      idConta,
    });

    PromiseNotification({
      promise: compartilhaConta,
      pendingMessage: "Cadastro...",
      successMessage: "Login realizado com sucesso! Redirecionando...",
      errorMessage: "Ocorreu um erro ao realizar o login. Tente novamente.",
    });



  };

  const handleSalvarEmpresa = () => {

    const { razaoSocial } = formValues.novaEmpresa;
    const { novoCNPJ } = formValues.infoDados;


    if (!razaoSocial || !novoCNPJ) {
      alert("Razão Social e CNPJ são obrigatórios!");
      return;
    }
    // 🔹 Verifica se já existe uma empresa com o mesmo nome ou CNPJ
    const empresaExiste = Object.keys(empresas).some(nome =>
      nome.toLowerCase() === razaoSocial.toLowerCase() || empresas[nome].cnpj === novoCNPJ
    );

    if (empresaExiste) {
      alert("Já existe uma empresa com essa Razão Social ou CNPJ!");
      return;
    }

    if (!empresas[razaoSocial]) {
      empresas[razaoSocial] = {
        razao_social: razaoSocial,
        cnpj: novoCNPJ,

      };
    }

    const cadastroConta = authService.cadastroConta({
      body: {
        cnpj: novoCNPJ,
        razao_social: razaoSocial,
      },
      id: 1
    });

    PromiseNotification({
      promise: cadastroConta,
      pendingMessage: "Cadastro...",
      successMessage: "Login realizado com sucesso! Redirecionando...",
      errorMessage: "Ocorreu um erro ao realizar o login. Tente novamente.",
    });
  };

  return (
    <>
      <Head>
        <title>Hubeefive - Minha conta</title>
      </Head>
      <Container >
        <Typography variant="h3" gutterBottom component={'h1'}>
          Minha Conta
        </Typography>
        <Typography variant="body1" component='p'>Dados referente a minha conta</Typography>

        {/* Formulário de Nova Empresa */}


        {/* Botões para abrir os formulários */}



        {/* Formulário de Novo Usuário */}
        <Paper sx={{ padding: 5, gap: 2, backgroundColor: '' }} >
          <Typography variant="h4" component='h3' sx={{ padding: 1 }}>Dados da conta</Typography>
          <Box display={openNovoUsuario ? "none" : "blcok"}>
            <Button variant="contained" color="primary" onClick={handleNovoUsuario} sx={{ mr: 1 }}>
              Adicionar novo Usuário
            </Button>
          </Box>
          <Typography variant="body1" component='p'>plano assinado : {'planoAssinado'}</Typography>
          <Typography variant="body1" component='p' color={'#0E87FE'}>Gostaria de fazer um upgrade?</Typography>
          {/* adicionar novo usuario  a conta  */}
          <Box display={openNovoUsuario ? "flex" : "none"} mt={2}>

            <NovoUsuarioForm view={false} />

            {/* <Button variant="contained" color="secondary" onClick={handleSalvarUsuario} sx={{ mt: 1 }}>
Salvar Usuário
</Button> */}
            <IconButton aria-label="Cancelar" >
              <CloseIcon color="error" onClick={() => setOpenNovoUsuario(!openNovoUsuario)} />
            </IconButton>
            <IconButton aria-label="Salvar" >
              <CheckIcon color="success" onClick={() => handleSalvarUsuario()} />
            </IconButton>
          </Box>




          <Accordion onChange={() => buscarEmailUsuarios()}>
            <AccordionSummary expandIcon={<ExpandMoreIcon color="action" />}>
              <Typography variant="h6">usuário Cadastradas</Typography>
              {/* Ícone de deletar */}

            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1">Emails Cadastrados:</Typography>
              <List dense>
                {contaCompartilhada?.length > 0 ? (
                  contaCompartilhada?.map(({ email, permissao, permissao_id, index }) => (
                    <Paper sx={{ m: 1, padding: 2, gap: 2 }}>
                      <Box component={'span'} display={'flex'} alignItems={'flex-end'} padding={2}>
                        <TextField key={index} fullWidth variant="standard" disabled value={email} />
                        <DeleteOutlinedIcon color="action" onClick={() => handleOpenModal("deletar email", email, permissao_id)} />
                      </Box>
                      <Typography>Permissão : {permissao}</Typography>

                    </Paper>

                  ))
                ) : (
                  <Typography>Nenhum usuário salvo</Typography>
                )}
              </List>


            </AccordionDetails>
          </Accordion>
        </Paper>

        <Divider sx={{ m: '4vh 0' }} />

        <Paper sx={{ padding: 5, gap: 2, backgroundColor: '' }} >
          <Typography variant="h4" component='h3' sx={{ padding: 2, }}>Empresas Cadastradas</Typography>
          <Box display={openNovaEmpresa ? "none" : "blcok"}>
            <Button variant="contained" color="primary" onClick={handleNovaEmpresa}>
              Adicionar nova Empresa
            </Button>
          </Box>


          <Box display={openNovaEmpresa ? "flex" : "none"} mt={2}>
            <NovaEmpresaForm view={false} />
            <IconButton aria-label="Cancelar" >
              <CloseIcon color="error" onClick={() => setOpenNovaEmpresa(!openNovaEmpresa)} />
            </IconButton>
            <IconButton aria-label="Salvar" >
              <CheckIcon color="success" onClick={() => handleSalvarEmpresa()} />
            </IconButton>

          </Box>
          {empresasConta?.map(({ id, razao_social }) => (
            <Accordion key={id} onChange={() => buscarDetalhesEmpresa(id)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon color="action" />}>
                <Typography variant="h6">{razao_social}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {loading === id ? (
                  <CircularProgress size={24} />
                ) : detalhesEmpresa[id] ? (
                  <div>
                    <p><strong>Nome:</strong> {detalhesEmpresa[id].razao_social}</p>
                    <p><strong>CNPJ:</strong> {detalhesEmpresa[id].cnpj}</p>
                    {/* Adicione mais informações conforme necessário */}
                  </div>
                ) : (
                  <p>Clique para carregar detalhes...</p>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>






        {Object.entries(empresas).map(([nome, empresa]) => (
          <Accordion key={nome}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{nome}</Typography>
              <Typography sx={{ ml: 2, color: "text.secondary" }}>{formatCNPJ(empresa?.cnpj)}</Typography>
              {/* Ícone de deletar */}
              {/* <IconButton
                onClick={() => handleDelete(nome)}
                sx={{ ml: 2 }}
                color="error"
              >
                <DeleteOutlinedIcon color="action" />
              </IconButton> */}
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1">Usuários:</Typography>
              <List dense>
                {empresa.usuarios?.length > 0 ? (
                  empresa.usuarios.map((usuario, index) => (
                    <ListItem key={index}>
                      <ListItemText secondary={usuario.email} />
                      <IconButton
                        onClick={() => handleOpenModal("deletar email", nome, usuario.email)}
                        sx={{ ml: 2 }}
                        color="error"
                      >
                        <DeleteOutlinedIcon color="action" />
                      </IconButton>
                    </ListItem>
                  ))
                ) : (
                  <Typography color="text.secondary">Nenhum usuário cadastrado</Typography>
                )}
              </List>


            </AccordionDetails>
          </Accordion>
        ))}
        <Divider />



      </Container>
      <ModalVinculo
        open={modalState.open}
        onClose={handleCloseModal}
        title={modalState.tipo}
        subTitulo=""
        onSave={handleSaveModal}
      >
        {renderModalContent()}
      </ModalVinculo>
    </>
  );
}

export const getServerSideProps = requireAuthentication(async (ctx) => {

  const token = ctx.req.token;
  const idConta = ctx.req.idConta; // 🔥 Corrigido: Pegamos o valor correto do cookie
  const retornaEmpresas = await authService.retornaEmpresas(token, { idConta });
  try {
    return {
      props: {
        retornaEmpresas,
        idConta
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