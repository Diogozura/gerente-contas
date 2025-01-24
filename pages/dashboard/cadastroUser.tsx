import React from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useFormContext } from "@/config/FormContext";
import Tour from "@/components/tuor";
import { cadastroUserSteps } from "@/features/tours/cadastroUserSteps/step";


export default function CadastroUser() {
  const { formValues, setFormValues } = useFormContext();
 


  const handleStartTour = () => {
    const pages = ["dashboard/cadastroUser", "gerenciamento","gerenciamento?tab=minhas-integracoes", "estoque", "anuncios", "vendas"]; // Lista de páginas
    const updatedTourState = pages.reduce((acc, page) => {
      acc[page] = true; // Define todas as páginas como `true`
      return acc;
    }, {} as Record<string, boolean>);
  
    setFormValues("Tuor", {
      ...formValues,
      ...updatedTourState, // Adiciona os valores atualizados ao formValues
    });
  };

  return (
    <Container sx={{height:'80vh' , display:'flex', alignItems:'center', justifyContent: 'space-around'}}>
      <Box id="start-tour" textAlign="center" p={5}>
        <Typography variant="h4" id='bem-vindo' gutterBottom>
          Bem-vindo ao Gerenciador
        </Typography>
        <Typography variant="body1" gutterBottom>
          Deseja iniciar o tour ou pular essa introdução?
        </Typography>
        <Button variant="contained" color="primary" onClick={handleStartTour} sx={{ mr: 2 }}>
          Iniciar Tour
        </Button>
        <Button variant="outlined" color="secondary">
          Pular
        </Button>
        <Tour steps={cadastroUserSteps} nextPage="/gerenciamento" />
      </Box>
    </Container>

  );
};

