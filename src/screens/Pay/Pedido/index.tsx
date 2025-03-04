import {
  Box,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import Form from "./Form";
import HubeefivePlano from "../../../components/layout/HubeefivePlano";
import { useFormContext } from "../../../config/FormContext";

import React from "react";
import { BackgroundBox } from "../../../components/layout/backgrouds/comeia";
import LinearStepper from "../../../components/common/Stepper";

export default function Pedido() {
  const router = useRouter();
  const { formValues } = useFormContext();
  const { plano, preco } = router.query;


  const steps = ["Select Plano", "Primeiro contato", "Pagamento", "Cadastro"];

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          mt:2,
          display:'flex',
          justifyContent: "center",
          flexDirection:'column',
          alignItems: "stretch",
          minHeight: "80vh",
        }}
      >
        <Box sx={{  mb: 10 }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {/* <LinearStepper/> */}
        <Grid
          sx={{
            backgroundColor: "#FBFBFB",
            borderRadius: 10,
            padding: "2rem",
            mt:5,
            mb:5,
            position: "relative",
            textAlign: "center",

          }}
          xs={12}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <HubeefivePlano price={preco} />
          <Typography variant="h5" component="h2" fontWeight={500} gutterBottom>Plano {plano}</Typography>
          <br/>
          <Typography variant="h6" component="h2" gutterBottom>
            Digite seus dados para continuar
          </Typography>

          <Form plano={plano} />
          
          <br/>
          <Typography variant="body1" component={"p"}>
            Garantimos a privacidade dos seus dados com criptografia.
          </Typography>
          <br/>
        </Grid>
        
      </Container>
    
    </>
  );
}
