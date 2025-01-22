import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React, { FormEvent, useState } from "react";

import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";


import Head from "next/head";
import LoginForm from "@/components/forms/LoginForm";
import { Console } from "console";
import { useFormContext } from "@/config/FormContext";
import { showToast } from "@/components/common/AlertToast";
import { PromiseNotification } from "@/components/common/PromiseNotification";
import { useRouter } from "next/router";
import TituloHub from "@/components/common/HubfiveName";
import { CheckBox } from "@mui/icons-material";


export function Login() {
  const { formValues } = useFormContext();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const router = useRouter();

  React.useEffect(() => {
    const isFormValid =
      formValues?.login?.email?.trim() !== "" &&
      formValues?.login?.senha?.trim() !== "";
    setIsButtonDisabled(!isFormValid);
  }, [formValues]);

  const handleEnter = async (event: React.FormEvent) => {
    event.preventDefault();

    // Inicializa os erros
    const errors: { email?: string; senha?: string } = {};
    let hasError = false;

    // Verifica se os campos estão vazios
    if (!formValues.login.email) {
      errors.email = "O campo email é obrigatório.";
      hasError = true;
    }

    if (!formValues.login.senha) {
      errors.senha = "O campo senha é obrigatório.";
      hasError = true;
    }

    if (hasError) {
      // Exibe os erros via toast ou em outro local
      if (errors.email) {
        showToast({
          title: errors.email,
          status: "error",
          position: "top-right",
        });
      }
      if (errors.senha) {
        showToast({
          title: errors.senha,
          status: "error",
          position: "top-right",
        });
      }
      return;
    }
    router.push("/auth/verificacao");
    // Lógica de envio caso não haja erros
    console.log("Login enviado com sucesso", formValues.login);

    //   const loginPromise = authService.login({
    //     body: {
    //       username: formValues?.login?.email,
    //       password: formValues?.login?.senha,
    //     },
    //   });

    //   PromiseNotification({
    //     promise: loginPromise,
    //     pendingMessage: "Entrando...",
    //     successMessage: "Login realizado com sucesso! Redirecionando...",
    //     errorMessage: "Ocorreu um erro ao realizar o login. Tente novamente.",
    //     successCallback: () => {
    //       setTimeout(() => {
    //         router.push("/dashboard");
    //       }, 300);
    //     },
    //   });
  };
  return (
    <>
      <Head>
        <title>Hubeefive - Login</title>
      </Head>
      <Container maxWidth="xs" component={'main'} sx={{
        minHeight: '80vh',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}>

        <Grid
          bgcolor={'background.paper'}
          padding={3}
          borderRadius={2}
          textAlign='center'
        >
          <TituloHub />
          <Typography variant="h5" component='h3' mb={5} fontWeight={'600'}>User login</Typography>
          <LoginForm />
      <Box textAlign={'left'}>
      <Link href={'/auth/trocar-senha'}>Esqueci minha senha</Link>

      </Box>
          <Button fullWidth 
          
          sx={{

            textTransform: 'uppercase',
            mt: 2,
            // background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
            // color: 'white',
            // '&:hover': {
            //   background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
            // },
          }} disabled={isButtonDisabled} color="primary" variant="contained" onClick={handleEnter}>
            Entrar
          </Button>
          <Box m={2}>
            <Typography>Não possui conta?</Typography>
            <Typography>Conheça nossos <Link href={'/planos'} style={{
              color: '#703B8C',
              fontWeight: 'bold'
            }}>Planos</Link></Typography>
          </Box>

          <Typography>Garantimos a privacidade dos seus
            dados com criptografia.</Typography>
        </Grid>


      </Container >



      {/* <CadastroForm /> */}
    </>
  );
}
