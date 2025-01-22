import React from "react";
import { Button, Typography, Box } from "@mui/material";


const CadastroUser: React.FC = () => {
 

  return (
    <Box id="start-tour" textAlign="center" p={5}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Gerenciador
      </Typography>
      <Typography variant="body1" gutterBottom>
        Deseja iniciar o tour ou pular essa introdução?
      </Typography>
      <Button variant="contained" color="primary" onClick={startTour} sx={{ mr: 2 }}>
        Iniciar Tour
      </Button>
      <Button variant="outlined" color="secondary">
        Pular
      </Button>
    </Box>
  );
};

export default CadastroUser;
