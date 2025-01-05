import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  data?: Record<string, any>; // Dados da linha selecionada
  onConfirm?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, title, data, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableScrollLock // Solução para o problema do scroll sumindo
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {data ? (
          <Box>
            {Object.entries(data).map(([key, value]) => (
              <Typography key={key}>
                <strong>{key}:</strong> {typeof value === "string" ? value : JSON.stringify(value)}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography>Nenhuma informação disponível.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} color="secondary" variant="contained">
            Confirmar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
