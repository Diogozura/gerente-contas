import {
  Box,
  Button,
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
import PedidoForm from "@/components/forms/PedidoForm";
import { authService } from "@/services/auth/authService";
import { PromiseNotification } from "@/components/common/PromiseNotification";

export default function Pedido() {
  const router = useRouter();
  const { formValues } = useFormContext();
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const { plano, preco } = router.query;
  console.log('formValues', formValues?.pedido?.email)

  const steps = ["Select Plano", "Primeiro contato", "Pagamento", "Cadastro"];
  const handleEnter = async (event: React.FormEvent) => {
    formValues.pedido.email

    const primeiroContatoPromise = authService.primeiroContato({
      body: {
        email:  formValues?.pedido?.email,
        plano: plano,
      },
    });
    PromiseNotification({
            promise: primeiroContatoPromise,
            pendingMessage: "Aguardando...",
            successMessage: "Login realizado com sucesso! Redirecionando...",
            errorMessage: "Ocorreu um erro ao realizar o login. Tente novamente.",
            successCallback: () => {
              setTimeout(() => {
                router.push("/auth/verificacao");
              }, 300);
            },
          });

  }
  return (
    <>
      {/* <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
      <Container maxWidth="xs" component={'main'} sx={{
        minHeight: '80vh',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}>



        {/* <LinearStepper/> */}
        <Grid
          sx={{
            backgroundColor: "#f3f3f3",
            borderRadius: 10,
            padding: "2rem",
            mt: 5,
            mb: 5,
            position: "relative",
            textAlign: "center",

          }}
          xs={12}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <HubeefivePlano price={preco} />
          <Typography variant="h5" component="h2" fontWeight={500} textTransform={'uppercase'} gutterBottom>Plano {plano}</Typography>
          <br />
          <Typography variant="body1" component="h2" gutterBottom>
            Digite seus dados para continuar
          </Typography>
          <PedidoForm />
          <Button fullWidth
            sx={{
              textTransform: 'uppercase',
              mt: 2,
              background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
              },
            }} disabled={isButtonDisabled}  variant="contained" onClick={handleEnter}>
            Avaliação
          </Button>
          <br />
          <Typography variant="body1" component={"p"}>
            Garantimos a privacidade dos seus dados com criptografia.
          </Typography>
          <br />
        </Grid>

      </Container>

    </>
  );
}
