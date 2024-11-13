import { Backdrop, Box, Button, CircularProgress, Container, Grid, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { BoxForm, Formulario } from "../../../components/forms/Formulario";
import { TituloFom } from "../../../components/forms/Formulario/TituloForm";
import { authService } from "../../../services/auth/authService";
import { Notification } from "../../../components/common/AlertToast";
import { BackgroundBox } from "../../../components/layout/backgrouds/comeia";
import CadastroForm from "./Form";
import Head from "next/head";


export default function CadastroScreen() {
  const steps = ["Select Plano", "Primeiro contato", "Pagamento", "Cadastro"];

  return (
    <>
      <Head>
      <title>Hubeefive - Cadastro</title>
    </Head>
     <Container
        maxWidth="sm"
        sx={{
          display:'flex',
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}>
      <Grid  padding={2}>
      <Box sx={{  mb: 10 }}>
          <Stepper activeStep={3} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      <Typography variant="h6" m={1} color={'text.secondary'} component={'h1'} textAlign={'center'}>FINALIZE O SEU CADASTRO</Typography>

      <CadastroForm />
      </Grid>
     
      
     </Container>
     
    
      {/* <CadastroForm /> */}
    </>
  );
}
