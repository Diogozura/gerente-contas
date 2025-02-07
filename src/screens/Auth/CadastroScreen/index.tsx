import {  Box,  Container, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";

import React from "react";


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
