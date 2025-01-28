import React from "react";
import {
  Box,
 
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,

} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import CheckIcon from '@mui/icons-material/Check';

interface CustomModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  subTitulo?: string;
  onSave: (data: any) => void; // Função chamada ao salvar
}

export const ModalVinculo: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  subTitulo,
  onSave,
  children
}) => {
  const [modalData, setModalData] = React.useState<any>({}); // Estado para armazenar os dados do modal

  // Função chamada ao clicar em "Salvar"
  const handleSave = () => {
    onSave(modalData); // Passa os dados para o componente pai
    onClose(); // Fecha o modal
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 4, p: 2, backgroundColor: "#F9F9F9" },
      }}
    >
      {/* Header com título e botão de fechar */}
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Conteúdo */}
      <DialogContent>
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 4,
            backgroundColor: "white",
            boxShadow: 3,
          }}
        >
          {/* Mensagem de aviso */}
          {subTitulo ? <Typography
            variant="body1"
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: "#FFEDED",
              color: "#D32F2F",
              borderRadius: 2,
            }}
          >
            {subTitulo}
          </Typography> : ''}
          {children}
        </Box>
        <Box sx={{
          direction:'rtl'
        }}>
          {/* Ícone para cancelar */}
          <IconButton
            onClick={onClose}
            aria-label="close"
            color="error"
          >
            <CloseIcon fontSize="large"  color="error"/>
          </IconButton>
           {/* Ícone para salvar */}
           <IconButton
            onClick={handleSave}
            aria-label="save"
            color="success"
          >
            <CheckIcon  fontSize="large" color="success"/>
          </IconButton>

        </Box>
      </DialogContent>
    </Dialog>
  );
};
