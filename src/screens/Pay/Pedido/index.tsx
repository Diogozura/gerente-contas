import {
  Box,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import Form from "./Form";
import HubeefivePlano from "../../../components/layout/HubeefivePlano";
import { useFormContext } from "../../../config/FormContext";

import React from "react";
import { BackgroundBox } from "../../../components/layout/backgrouds/comeia";

export default function Pedido() {
  const router = useRouter();
  const { formValues } = useFormContext();
  const { plano, preco } = router.query;


  const steps = ["Select Plano", "Primeiro contato", "Pagamento", "Cadastro"];

  return (
    <BackgroundBox>
      <Container
        maxWidth="sm"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
            backgroundColor: "#fffffffc",
            borderRadius: 10,
            padding: "2rem",
            position: "relative",
            textAlign: "center",
          }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <HubeefivePlano price={preco} />
          <Typography>Plano Selecionado : {plano}</Typography>
          <Typography variant="body1" component="h2" gutterBottom>
            Digite seus dados para continuar
          </Typography>

          <Form plano={plano} />
          <Typography variant="body1" component={"p"}>
            Garantimos a privacidade dos seus dados com criptografia.
          </Typography>
        </Grid>
      </Container>
    </BackgroundBox>
  );
}
