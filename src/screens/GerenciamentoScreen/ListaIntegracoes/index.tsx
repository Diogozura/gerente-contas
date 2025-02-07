import { Box, IconButton, Paper, TextField, Button, Tooltip, Typography } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SettingsIcon from "@mui/icons-material/Settings";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ModalVinculo } from "../../../components/ui/Modal";
import InfosFaltantesInt from "@/components/forms/infosFaltantesInt";
import { showToast } from "@/components/common/AlertToast";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Tour from "@/components/tuor";
import { gerenciamentoIntSteps } from "@/features/tours/gerenciamentoIntSteps/step";
import { IntegracaoMarketingPlace } from "@/types/IntegracaoMarketingPlace";
import { deleteIntegracao, getIntegracoes } from "../ManipulandoLocalStorage";
import { useFormContext } from "@/config/FormContext";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FiltroTexto from "@/components/common/FiltroText";
export default function ListaIntegracao() {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string | null>(null);
  const [integracoes, setIntegracoes] = useState<IntegracaoMarketingPlace[]>([]);
    const [textoFiltro, setTextoFiltro] = useState("");
  const { formValues, setFormValues } = useFormContext();
  useEffect(() => {
    const produtoSalvo = localStorage.getItem('integracoesMarketingPlace');
    const dadosProduto = JSON.parse(produtoSalvo);
    setIntegracoes(getIntegracoes());
  }, []);
  console.log('integracoes', integracoes)

  const [filteredIntegracoes, setFilteredIntegracoes] = useState(integracoes);
  
  useEffect(() => {
    // Filtra as integrações sempre que o filtro de texto ou a lista de integrações mudarem
    const filtered = integracoes.filter((integracao) => {
      const matchText =
        integracao.nomeLoja.toLowerCase().includes(textoFiltro.toLowerCase()) ||
        integracao.id.toLowerCase().includes(textoFiltro.toLowerCase());
      return matchText;
    });
    setFilteredIntegracoes(filtered);
  }, [textoFiltro, integracoes]);
  
  const getMarketplaceLogo = (nome?: string) => {
    return nome?.includes("Mercado Livre")
      ? "/marketingplaces/log-mercado-livre.png"
      : "/marketingplaces/amazon.png";
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedValue(integracoes[index].nomeLoja);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedValue(null);
  };

  const handleSaveEdit = (index: number) => {
    if (editedValue !== null) {
      setIntegracoes((prev) => {
        const updatedIntegracoes = [...prev];
        updatedIntegracoes[index] = {
          ...updatedIntegracoes[index],
          nomeLoja: editedValue,
        };

        // Atualiza o localStorage
        localStorage.setItem("integracoesMarketingPlace", JSON.stringify(updatedIntegracoes));

        return updatedIntegracoes;
      });

      showToast({
        title: "Nome atualizado com sucesso!",
        status: "success",
        position: "bottom-left",
      });
    }
    handleCancelEdit();
  };



  const [modalState, setModalState] = useState({
    open: false,
    tipo: "",
    mensagem: "",
    razaoSocial: "",
    cnpjOuCpf: "",
    id:"",
    loja:""
  });

  const handleOpenModal = (tipo: string, data: any) => {
    setModalState({
      open: true,
      tipo,
      mensagem: tipo === "Deletar" ? "Tem certeza que deseja deletar?" : "Configuração",
      ...data,
    });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, open: false });
  };

  const handleSaveModal = () => {
    const { tipo, ...int } = modalState;
    switch (tipo) {
      case "Atenção":
       const infosFalantes=  formValues.infosFaltantesInt;
       setIntegracoes((prev) =>
        prev.map((item) =>
          item.id === modalState.id
            ? { ...item, ...infosFalantes }
            : item
        )
      );
    
      // Atualiza o localStorage
      localStorage.setItem(
        "integracoes",
        JSON.stringify(
          integracoes.map((item) =>
            item.id === modalState.id ? { ...item, ...infosFalantes } : item
          )
        )
      );
    
      showToast({
        title: "Informações completadas!",
        status: "success",
        position: "bottom-left",
      });
    
      handleCloseModal();
      break
      case "Deletar":
        if (int.id) {
          deleteIntegracao(int.id);
          setIntegracoes(getIntegracoes()); // Atualiza a lista
          showToast({
            title: "Integração deletada com sucesso!",
            status: "success",
            position: "bottom-left",
          });
        } else {
          showToast({
            title: "Erro ao deletar a integração.",
            status: "error",
            position: "bottom-left",
          });
        }
        handleCloseModal();
      break
      default:
        return null 
    }
 

  };

  const renderModalContent = () => {
    const { tipo } = modalState;

    switch (tipo) {
      case "Configuração":
        return <Typography>Configuração da loja:</Typography>;
      case "Deletar":
        return <Typography>Tem certeza que deseja deletar?</Typography>;
      case "Atenção":
        return (
          <Box>
            <InfosFaltantesInt view={false} />
          </Box>
        );
      default:
        return null;
    }
  };

  const verificarCamposFaltantes = (integracao: IntegracaoMarketingPlace) => {
    return !integracao.cnpjOuCpf || !integracao.razaoSocial || !integracao.inscricaoEstadual;
  };

  return (
    <>
    <Paper
              elevation={1}
              sx={{
                p: 3,
                mb: 2,
                borderRadius:'0px',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
  <FiltroTexto
            label="Filtrar por título ou SKU"
            value={textoFiltro}
            onChange={setTextoFiltro}
          />
            </Paper>
   

      {filteredIntegracoes.map((int, index) => (
        <Paper
          key={int.id}
          elevation={3}
          sx={{
            p: 3,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        >
          <Box display="flex" alignItems="center">
            <Image
              src={getMarketplaceLogo(int.nomeMarketplace)}
              alt={`Logo de ${int.nomeMarketplace}`}
              width={50}
              height={35}
              style={{ marginRight: "10px" }}
            />
            <TextField
              variant="standard"
              disabled={editIndex !== index}
              fullWidth
              value={editIndex === index ? editedValue : int.nomeLoja}
              onChange={(e) => setEditedValue(e.target.value)}
          
            />
            {editIndex === index ? (
              <>
                <IconButton aria-label="Cancelar" onClick={handleCancelEdit}>
                  <CloseIcon color="error" />
                </IconButton>
                <IconButton aria-label="Salvar" onClick={() => handleSaveEdit(index)}>
                  <CheckIcon color="success" />
                </IconButton>
              </>
            ) : (
              <IconButton aria-label="Editar" onClick={() => handleEditClick(index)}>
                <EditOutlinedIcon color="action"/>
              </IconButton>
            )}
          </Box>

          <Box display="flex" alignItems="center">
            
            {/* {int.error && (
              <Button
                variant="contained"
                color="warning"
                sx={{ ml: 1 }}
                onClick={() =>
                  showToast({
                    title: "Erro na integração!",
                    status: "warning",
                    position: "bottom-left",
                  })
                }
              >
                {int.error}
              </Button>
            )} */}
            {verificarCamposFaltantes(int) && (
              <Tooltip title="Faltam informações obrigatórias">
                <IconButton onClick={() => handleOpenModal("Atenção", int)}>
                  <PriorityHighIcon color="action" />
                </IconButton>
              </Tooltip>
            )}
            <IconButton
              aria-label="Configuração"
              onClick={() => handleOpenModal("Configuração", int)}
              color="primary"
            >
              <SettingsIcon color="action" />
            </IconButton>
            <IconButton
              aria-label="Deletar"
               color="primary"
              onClick={() => handleOpenModal("Deletar", int)}
            >
              <DeleteOutlinedIcon  color="action"/>
            </IconButton>
          </Box>
        </Paper>
      ))}
      <ModalVinculo
        open={modalState.open}
        onClose={handleCloseModal}
        title={modalState.tipo}
        subTitulo=""
        onSave={handleSaveModal}
      >
        {renderModalContent()}
      </ModalVinculo>
      <Tour steps={gerenciamentoIntSteps} />
    </>
  );
}
