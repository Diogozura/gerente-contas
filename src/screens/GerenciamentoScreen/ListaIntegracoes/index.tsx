import { Box, IconButton, Paper, TextField, Tooltip, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import React, { useState } from "react";
import CustomModal from "../../../components/ui/CustomModal";
import { ModalVinculo } from "../../../components/ui/Modal";

export default function ListaIntegracao({ dadosIntegracao }) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [nomeLojas, setNomeLojas] = useState(dadosIntegracao.map((item) => item.nomeLoja));
  const [modalConfig, setModalConfig] = useState({ open: false, title: "", data: null });
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    mensagem: string;
    razaoSocial?: string;
    inscricaoEstadual?: string;
    cnpjOuCpf?: string;
  }>({
    mensagem: "",
  });

  const handleEditClick = (index: number) => {
    setEditIndex(index === editIndex ? null : index); // Alterna entre edição e visualização
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const updatedNomeLojas = [...nomeLojas];
    updatedNomeLojas[index] = event.target.value;
    setNomeLojas(updatedNomeLojas);
  };

  // Unificada a função handleOpenModal para abrir diferentes tipos de modal
  const handleOpenModal = (title: string, data: any) => {
    if (title === "Atenção") {
      setModalContent({
        mensagem: "Faltam informações importantes.",
        ...data,
      });
      setOpenModal(true); // Para o ModalVinculo
    } else {
      setModalConfig({ open: true, title, data }); // Para o CustomModal
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalConfig({ ...modalConfig, open: false });
  };

  const handleSaveModal = (data: any) => {
    console.log("Salvo:", data);
    setOpenModal(false);
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
          <Box display={"flex"} alignItems="center">
            <Image
              src={integracao.icon.src}
              alt={integracao.icon.alt}
              width={43}
              height={33}
              style={{ marginRight: "10px" }}
            />
            <TextField
              variant="standard"
              disabled={editIndex !== index}
              value={nomeLojas[index]}
              onChange={(event) => handleChange(event, index)}
              sx={{ width: "200px" }}
            />
            <IconButton aria-label="Editar" onClick={() => handleEditClick(index)}>
              <EditIcon />
            </IconButton>
          </Box>

          <Box display="flex" alignItems="center">
            {integracao.error && (
              <Button
                variant="contained"
                color="inherit"
                sx={{ ml: 1 }}
                onClick={() =>
                  handleOpenModal("Atenção", {
                    mensagem: "Faltam informações importantes.",
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
              <Tooltip title="Faltante informações">
                <IconButton
                  onClick={() =>
                    handleOpenModal("Atenção", {
                      mensagem: "Faltam informações importantes.",
                      ...integracao,
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
                handleOpenModal("Configuração", { mensagem: "Configurar integração.", ...integracao })
              }
            >
              <SettingsIcon color="inherit"/>
            </IconButton>
            <IconButton
              aria-label="Deletar"
              onClick={() =>
                handleOpenModal("Deletar", { mensagem: "Tem certeza que deseja deletar?", ...integracao })
              }
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}

      {/* Modal reutilizável CustomModal */}
      <CustomModal
        open={modalConfig.open}
        onClose={handleCloseModal}
        title={modalConfig.title}
        data={modalConfig.data}
        onConfirm={() => {
          console.log("Ação confirmada com dados:", modalConfig.data);
          handleCloseModal();
        }}
      />

      {/* ModalVinculo */}
      <ModalVinculo
        open={openModal}
        onClose={handleCloseModal}
        title="Atenção"
        content={modalContent}
        onSave={handleSaveModal}
      />
    </>
  );
}
