import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Button, Typography, Box, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, IconButton, Divider, CircularProgress, Paper, } from "@mui/material";
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

  console.log('retorna emrpesas', retornaEmpresas)

  const { formValues, setFormValues } = useFormContext();
  const [openNovoUsuario, setOpenNovoUsuario] = useState(false);
  const [openNovaEmpresa, setOpenNovaEmpresa] = useState(false);
  const [usuariosConta, setUsuariosConta] = useState([]);
  const [emailPrincipal, setEmailPrincipal] = useState("");
  const [empresas, setEmpresas] = useState<Record<string, any>>({});
  const [empresasConta, setEmpresasConta] = useState([]);

  const [detalhesEmpresa, setDetalhesEmpresa] = useState({});
  const [loading, setLoading] = useState(null); // Para controlar o loading individualmente

  const buscarDetalhesEmpresa = async (idEmpresa) => {
    if (detalhesEmpresa[idEmpresa]) return; // Se já buscou, não faz novamente

    setLoading(idEmpresa); // Define qual empresa está carregando
    try {
      const detalhes = await authService.retornaDetalhesEmpresa({ idConta, idEmpresa });
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

  const [modalState, setModalState] = React.useState({
    open: false,
    tipo: "",
    empresaNome: "",
    email: ""
  });


  const handleOpenModal = (tipo: string, empresaNome: string, email?: string) => {
    setModalState({
      open: true,
      tipo,
      empresaNome,
      email, // Passa o email do usuário a ser excluído
    });
  };
  const handleCloseModal = () => {
    setModalState({ ...modalState, open: false });
  };


  const handleSaveModal = () => {
    const { tipo, empresaNome, email } = modalState;
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
        if (empresaNome && email) {
          // Clona o objeto de empresas
          const empresasAtualizadas = { ...empresas };

          // Filtra os usuários da empresa, removendo o email selecionado
          empresasAtualizadas[empresaNome].usuarios = empresasAtualizadas[empresaNome].usuarios.filter(
            (usuario) => usuario.email !== email
          );

          // Atualiza o localStorage e o estado
          localStorage.setItem("empresas", JSON.stringify(empresasAtualizadas));
          setEmpresas(empresasAtualizadas);

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
    const { tipo, email } = modalState;

    switch (tipo) {
      case "Configuração":
        return <Typography>Configuração da loja:</Typography>;
      case "deletar email":
        return <Typography>Tem certeza que deseja deletar? {email}</Typography>;
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

  // 🔹 Carregar empresas e salvar no localStorage se necessário
  const carregarEmpresas = () => {
    const storedData = localStorage.getItem("empresas");
    let empresas: Record<string, { cnpj: string; usuarios: User[]; plano?: string }> = storedData ? JSON.parse(storedData) : {};

    //     dadosSala?.dados?.empresas_listadas?.forEach((empresa: Empresa, index: number) => {
    // console.log('dadosSala?.dados?', )
    //     });
    setEmailPrincipal('diogozura')

    localStorage.setItem("empresas", JSON.stringify(empresas));
  };




  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("empresas");
      const storedConta = localStorage.getItem("usuariosConta");
      const usuarioLogado2 = localStorage.getItem("dadosUsuarioLogado");
      console.log('usuarioLogado2', JSON.parse(usuarioLogado2).contas[0].id)
      setEmpresas(storedData ? JSON.parse(storedData) : {});
      setEmpresasConta(retornaEmpresas)
      try {
        setUsuariosConta(storedConta ? JSON.parse(storedConta) : []);
      } catch (error) {
        console.error("Erro ao parsear usuáriosConta:", error);
        setUsuariosConta([]); // Garante que sempre tenha um array válido
      }
    }
  }, []);

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

    // Recupera os usuários já salvos
    const storedConta = localStorage.getItem("usuariosConta");
    let usuariosSalvos = storedConta ? JSON.parse(storedConta) : [];

    // Garante que seja um array antes de adicionar novos emails
    if (!Array.isArray(usuariosSalvos)) {
      usuariosSalvos = [];
    }

    // Adiciona o novo usuário
    const novaLista = [...usuariosSalvos, { email }];

    // Atualiza o localStorage
    localStorage.setItem("usuariosConta", JSON.stringify(novaLista));

    // Atualiza o estado
    setUsuariosConta(novaLista);
  };

  const handleSalvarEmpresa = () => {
    const storedData = localStorage.getItem("empresas");
    let empresas: Record<string, Empresa> = storedData ? JSON.parse(storedData) : {};

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
    localStorage.setItem("empresas", JSON.stringify(empresas));
    alert("Empresa salva com sucesso!");
  };



  const handleDelete = (empresaNome: string) => {
    // Remove a empresa do objeto
    const updatedEmpresas = { ...empresas };
    delete updatedEmpresas[empresaNome];

    // Atualiza o localStorage
    localStorage.setItem("empresas", JSON.stringify(updatedEmpresas));

    // Atualiza o estado imediatamente, forçando a re-renderização
    setEmpresas(updatedEmpresas);
  };


  // const fetchEmpresaDetalhes = async (id: number) => {
  //   // Evita chamadas desnecessárias se os dados já foram carregados
  //   if (empresaDetalhes[id]) return;

  //   setLoading((prev) => ({ ...prev, [id]: true }));

  //   try {
  //     const response = await authService.retornaDetalhesEmpresa()
  //     const data = await response.json();
  //     setEmpresaDetalhes((prev) => ({ ...prev, [id]: data }));
  //   } catch (error) {
  //     console.error("Erro ao buscar detalhes da empresa:", error);
  //   } finally {
  //     setLoading((prev) => ({ ...prev, [id]: false }));
  //   }
  // };
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
        <Box display={'flex'}>
          <Box display={openNovoUsuario ? "none" : "blcok"}>
            <Button variant="contained" color="primary" onClick={handleNovoUsuario} sx={{ mr: 1 }}>
              Adicionar novo Usuário
            </Button>
          </Box>

          {/* Botões para abrir os formulários */}

          <Button variant="contained" color="primary" onClick={handleNovaEmpresa}>
            Adicionar nova Empresa
          </Button>
        </Box>
        <Box display={openNovaEmpresa ? "block" : "none"} mt={2}>
          <NovaEmpresaForm view={false} />
          <Button variant="contained" color="secondary" onClick={handleSalvarEmpresa} sx={{ mt: 1 }}>
            Salvar conta
          </Button>
        </Box>


        <Paper sx={{ padding: 5, gap: 2, }} >
          <Typography variant="h4" component='h3' sx={{ padding: 2, }}>Empresas Cadastradas</Typography>
          {empresasConta.map(({ id, razao_social }) => (
            <Accordion key={id} onChange={() => buscarDetalhesEmpresa(id)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon color="action" />}>
                <Typography variant="h6">{razao_social}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {loading === id ? (
                  <CircularProgress size={24} />
                ) : detalhesEmpresa[id] ? (
                  <div>
                    <p><strong>Nome:</strong> {detalhesEmpresa[id].nome}</p>
                    <p><strong>Endereço:</strong> {detalhesEmpresa[id].endereco}</p>
                    {/* Adicione mais informações conforme necessário */}
                  </div>
                ) : (
                  <p>Clique para carregar detalhes...</p>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>

        <Accordion >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Contas Cadastradas</Typography>
            {/* Ícone de deletar */}

          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1">Usuários:</Typography>
            <List dense>
              <Typography>{emailPrincipal}</Typography>
              {usuariosConta.length > 0 ? (
                usuariosConta.map((usuario, index) => (
                  <Typography key={index}>{usuario.email}</Typography>
                ))
              ) : (
                <Typography>Nenhum usuário salvo</Typography>
              )}
            </List>


          </AccordionDetails>
        </Accordion>


        {/* Formulário de Novo Usuário */}




        {Object.entries(empresas).map(([nome, empresa]) => (
          <Accordion key={nome}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{nome}</Typography>
              <Typography sx={{ ml: 2, color: "text.secondary" }}>{formatCNPJ(empresa?.cnpj)}</Typography>
              {/* Ícone de deletar */}
              <IconButton
                onClick={() => handleDelete(nome)}
                sx={{ ml: 2 }}
                color="error"
              >
                <DeleteOutlinedIcon color="action" />
              </IconButton>
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
  console.log('idConta server', idConta)
  const retornaEmpresas = await authService.retornaEmpresas(token, { idConta });
  try {
    return {
      props: {
        retornaEmpresas,
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