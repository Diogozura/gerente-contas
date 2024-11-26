import { Box, IconButton, Paper, TextField, Tooltip, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import React, { useState } from "react";
import CustomModal from "../../../components/CustomModal";


export default function ListaIntegracao({ dadosIntegracao }) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [nomeLojas, setNomeLojas] = useState(dadosIntegracao.map((item) => item.nomeLoja));
  const [modalConfig, setModalConfig] = useState({ open: false, title: "", data: null });

  const handleEditClick = (index: number) => {
    setEditIndex(index === editIndex ? null : index); // Alterna entre edição e visualização
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const updatedNomeLojas = [...nomeLojas];
    updatedNomeLojas[index] = event.target.value;
    setNomeLojas(updatedNomeLojas);
  };

  const handleOpenModal = (title: string, data: any) => {
    setModalConfig({ open: true, title, data });
  };

  const handleCloseModal = () => {
    setModalConfig({ ...modalConfig, open: false });
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
            {integracao.atencao && (
              <Tooltip title="Faltante informações">
                <IconButton
                  onClick={() =>
                    handleOpenModal("Atenção", { mensagem: "Faltam informações importantes.", ...integracao })
                  }
                >
                  <PriorityHighIcon />
                </IconButton>
              </Tooltip>
            )}
            <IconButton
              aria-label="Configuração"
              onClick={() => handleOpenModal("Configuração", { mensagem: "Configurar integração.", ...integracao })}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              aria-label="Deletar"
              onClick={() => handleOpenModal("Deletar", { mensagem: "Tem certeza que deseja deletar?", ...integracao })}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}

      {/* Modal reutilizável */}
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
    </>
  );
}
