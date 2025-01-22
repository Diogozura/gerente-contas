import { Box, IconButton, Paper, TextField, Button, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import React, { useState } from "react";
import { ModalVinculo } from "../../../components/ui/Modal";
import InfosFaltantesInt from "@/components/forms/infosFaltantesInt";
import { showToast } from "@/components/common/AlertToast";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export default function ListaIntegracao({ dadosIntegracao }) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string | null>(null); // Valor temporário para edição
  const [nomeLojas, setNomeLojas] = useState<string[]>(
    dadosIntegracao.map((item) => item.nomeLoja)
  );
  const [modalState, setModalState] = useState({
    open: false,
    tipo: "",
  });

  const handleOpenModal = (tipo: string, data: any) => {
    setModalState({
      open: true,
      tipo,
      mensagem: tipo === "Deletar" ? "Tem certeza que deseja deletar?" : "Configuração",
      ...data,
    });
  };
  const handleEditClick = (index: number) => {
    setEditIndex(index); // Define o índice sendo editado
    setEditedValue(nomeLojas[index]); // Preenche o valor inicial do campo
  };
  const handleCloseModal = () => {
    setModalState({ ...modalState, open: false });
  };

  const handleSaveModal = (data: any) => {
    console.log(`Modal salvo: ${modalState.tipo}`);

    showToast({
      title: "Salvo com sucesso!",
      status: "success",
      position: "bottom-left",
    });



    handleCloseModal();
  };

  const renderModalContent = () => {
    const { tipo } = modalState;

    switch (tipo) {
      case "Configuração":
        return (
          <Box>
            <Typography>Configuração da loja: </Typography>
            {/* Outros inputs específicos */}
          </Box>
        );
      case "Deletar":
        return (
          <Typography>
            Tem certeza que deseja deleter?
          </Typography>
        );
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

   const handleCancelEdit = () => {
    setEditIndex(null); // Sai do modo de edição
    setEditedValue(null); // Reseta o valor temporário
  };

  const handleSaveEdit = (index: number) => {
    if (editedValue !== null) {
      const updatedLojas = [...nomeLojas];
      updatedLojas[index] = editedValue; // Atualiza o valor na lista original
      setNomeLojas(updatedLojas);
      showToast({
        title: "Nome atualizado com sucesso!",
        status: "success",
        position: "bottom-left",
      });
    }
    handleCancelEdit(); // Finaliza a edição
  };
  return (
    <>
      {dadosIntegracao.map((integracao, index) => (
        <Paper
          key={integracao.nomeLoja}
          elevation={1}
          sx={{
            p: 3,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Box display="flex" alignItems="center">
            <Image
              src={integracao.icon.src}
              alt={integracao.icon.alt}
              width={43}
              height={33}
              style={{ marginRight: "10px" }}
            />
            <TextField
              variant="standard"
              disabled={editIndex !== index} // Desabilita se não for o campo editado
              value={editIndex === index ? editedValue : nomeLojas[index]} // Mostra o valor editável
              onChange={(e) => setEditedValue(e.target.value)} // Atualiza o valor temporário
              sx={{ width: "200px" }}
            />
            {editIndex === index ? (
              <>
                {/* Botão de cancelar */}
                <IconButton
                  aria-label="Cancelar"
                  onClick={handleCancelEdit}
                >
                  <CloseIcon color="error" />
                </IconButton>
                {/* Botão de salvar */}
                <IconButton
                  aria-label="Salvar"
                  onClick={() => handleSaveEdit(index)}
                >
                  <CheckIcon color="success" />
                </IconButton>
              </>
            ) : (
              <IconButton
                aria-label="Editar"
                onClick={() => handleEditClick(index)}
              >
                <EditIcon />
              </IconButton>
            )}

          </Box>

          <Box display="flex"  alignItems="center">
            {integracao.error && (
              <Button
                variant="contained"
                color="inherit"
                sx={{ ml: 1 }}
                onClick={() =>
                  handleOpenModal("Atenção", {
                    razaoSocial: integracao.razaoSocial,
                    inscricaoEstadual: integracao.inscricaoEstadual,
                    cnpjOuCpf: integracao.cnpjOuCpf,
                  })
                }
              >
                {integracao.error}
              </Button>
            )}
            {integracao.atencao && (
              <Tooltip title="Faltam informações">
                <IconButton
                  onClick={() =>
                    handleOpenModal("Atenção", {
                      razaoSocial: integracao.razaoSocial,
                      inscricaoEstadual: integracao.inscricaoEstadual,
                      cnpjOuCpf: integracao.cnpjOuCpf,
                    })
                  }
                >
                  <PriorityHighIcon />
                </IconButton>
              </Tooltip>
            )}
            <IconButton
              aria-label="Configuração"
              onClick={() =>
                handleOpenModal("Configuração", { razaoSocial: integracao.razaoSocial })
              }
            >
              <SettingsIcon color="inherit" />
            </IconButton>
            <IconButton
              aria-label="Deletar"
              onClick={() =>
                handleOpenModal("Deletar", {
                  razaoSocial: integracao.razaoSocial,
                  cnpjOuCpf: integracao.cnpjOuCpf,
                })
              }
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}

      <ModalVinculo
        open={modalState.open}
        onClose={handleCloseModal}
        title={modalState.tipo}
        subTitulo=""
        onSave={handleSaveModal}>
        {renderModalContent()}
      </ModalVinculo>


    </>
  );
}
