import { Box, Button, Container, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";

import React from "react";


import CadastroForm from "./Form";
import Head from "next/head";
import CadastroConta from "@/components/forms/CadastroConta";
import TituloHub from "@/components/common/HubfiveName";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import { useFormContext } from "@/config/FormContext";
import { authService } from "@/services/auth/authService";
import { PromiseNotification } from "@/components/common/PromiseNotification";
import { useRouter } from "next/router";


export default function CadastroScreen() {
  const { formValues, setFormValues } = useFormContext();
  const router = useRouter();
  const { id } = router.query;
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues("cadastroConta", { [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const requiredFields = ["nome", "email", "senha", "confirmarSenha"];

    requiredFields.forEach((field) => {
      if (!formValues.cadastroConta?.[field]?.trim()) {
        newErrors[field] = "Este campo é obrigatório";
      }
    });

    if (formValues.cadastroConta?.senha !== formValues.cadastroConta?.confirmarSenha) {
      newErrors["confirmarSenha"] = "As senhas devem ser iguais";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Dados enviados:", formValues.cadastroConta);
      console.log("Dados enviados infoDados:", formValues.infoDados);

      const loginPromise = authService.cadastroConta({
        body: {
          email: formValues?.cadastroConta?.email,
          password: formValues?.cadastroConta?.senha,
          firstname: formValues?.cadastroConta?.nome,
          lastname: formValues?.cadastroConta?.senha,
          cpf: formValues?.infoDados?.cpf,
          cnpj: formValues?.infoDados?.cnpj,
          razao_social: formValues?.cadastroConta?.razaoSocial,
        },
        id
      });

      PromiseNotification({
        promise: loginPromise,
        pendingMessage: "Entrando...",
        successMessage: "Cadastro realizado com sucesso! Redirecionando...",
        errorMessage: "Ocorreu um erro ao realizar o cadastro. Tente novamente.",
        successCallback: () => {
          setTimeout(() => {
            router.push("/auth/login");
          }, 300);
        },
      });
      // Aqui você pode enviar os dados para a API
    }
  };
  return (
    <>
      <Head>
        <title>Hubeefive - Cadastro</title>
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
          <Typography variant="h5" component='h3' mb={5} fontWeight={'500'}>FINALIZE O SEU CADASTRO</Typography>
          <form onSubmit={handleSubmit}>


            <CadastroConta errors={errors} handleInputChange={handleInputChange} />
            <Button fullWidth
              sx={{
                textTransform: 'uppercase',
                mt: 2,
                background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
                },
              }}
              type="submit"
            //  disabled
            //  color="primary" variant="contained" 
            // onClick={handleEnter}
            >
              Finalizar
            </Button>
          </form>

          <Typography>Garantimos a privacidade dos seus
            dados com criptografia.</Typography>
        </Grid>


      </Container >
    </>
  );
}
