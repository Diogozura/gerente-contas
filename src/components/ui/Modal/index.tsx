import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: {
    mensagem: string;
    razaoSocial?: string;
    inscricaoEstadual?: string;
    cnpjOuCpf?: string;
  };
  onSave: (data: any) => void; // Função chamada ao salvar
}

export const ModalVinculo: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  content,
  onSave,
}) => {
  const [formData, setFormData] = React.useState(content);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
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
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: "#FFEDED",
              color: "#D32F2F",
              borderRadius: 2,
            }}
          >
            {content.mensagem}
          </Typography>

          {/* Campos do formulário */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              Razão Social
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={formData.razaoSocial || ""}
              onChange={(e) => handleChange("razaoSocial", e.target.value)}
              sx={{ mt: 1 }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              Inscrição Estadual
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={formData.inscricaoEstadual || ""}
              onChange={(e) => handleChange("inscricaoEstadual", e.target.value)}
              sx={{ mt: 1 }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              CNPJ ou CPF
            </Typography>
            <RadioGroup
              row
              value={formData.cnpjOuCpf || "CNPJ"}
              onChange={(e) => handleChange("cnpjOuCpf", e.target.value)}
            >
              <FormControlLabel value="CNPJ" control={<Radio />} label="CNPJ" />
              <FormControlLabel value="CPF" control={<Radio />} label="CPF" />
            </RadioGroup>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={formData.cnpjOuCpf === "CNPJ" ? "CNPJ Placeholder" : "CPF Placeholder"}
              onChange={(e) => handleChange("cnpjOuCpf", e.target.value)}
              sx={{ mt: 1 }}
            />
          </Box>

          {/* Botão Salvar */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#5E247C",
              "&:hover": { backgroundColor: "#9A44C8" },
            }}
            onClick={handleSave}
          >
            Salvar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
