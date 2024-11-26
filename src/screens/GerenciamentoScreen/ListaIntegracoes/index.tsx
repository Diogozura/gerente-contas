import { Box, Button, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { useState } from "react";

export default function ListaIntegracao({ dadosIntegracao }) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [nomeLojas, setNomeLojas] = useState(
    dadosIntegracao.map((item) => item.nomeLoja)
  );

  const handleEditClick = (index: number) => {
    setEditIndex(index === editIndex ? null : index); // Alterna entre edição e visualização
  };

  const handleChange = (  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    
    const updatedNomeLojas = [...nomeLojas];
    updatedNomeLojas[index] = event.target.value;
    setNomeLojas(updatedNomeLojas);
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
            backgroundColor:'#ffff'
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
              disabled={editIndex !== index} // Somente habilitado no modo edição
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
              <>
              <Tooltip title="Faltante informações">
              <IconButton>
                  <PriorityHighIcon />
              </IconButton>
          </Tooltip>
              </>
            )}
            {integracao.error && (
              <>
                
                <Button variant="contained" color="inherit" sx={{ ml: 1 }}>
                  {integracao.error}
                </Button>
              </>
            )}
            <IconButton aria-label="Configuração">
              <SettingsIcon />
            </IconButton>
            <IconButton aria-label="Deletar">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </>
  );
}
