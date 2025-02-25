import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";


import { authService } from "../../../services/auth/authService";
import Head from "next/head";
import { useFormContext } from "@/config/FormContext";
import TrocaSenhaForm from "@/components/forms/TrocaSenhaForm";
import TituloHub from "@/components/common/HubfiveName";
import { PromiseNotification } from "@/components/common/PromiseNotification";


export default function TrocarSenha() {
    const { formValues } = useFormContext();
    const router = useRouter();


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formValues.trocaSenha.email)
        const loginPromise = authService.esqueciMinhaSenha({
            body: {
                email: formValues?.trocaSenha?.email,
            },
        });

        PromiseNotification({
            promise: loginPromise,
            pendingMessage: "Entrando...",
            successMessage: "Cadastro realizado com sucesso! Redirecionando...",
            errorMessage: "Ocorreu um erro ao realizar o cadastro. Tente novamente.",
            successCallback: () => {
                setTimeout(() => {
                    router.push("/auth/nova-senha");
                }, 300);
            },
        });
    };

    return (
        <>
            <Head>
                <title>Hubeefive - trocar a senha</title>
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
                    <Typography variant="h5" component='h3' mb={5} fontWeight={'600'}>Troca de senha</Typography>
                    <form onSubmit={handleSubmit}>
                        <TrocaSenhaForm />
                        <Button fullWidth

                            sx={{

                                textTransform: 'uppercase',
                                mt: 2,
                                background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
                                color: 'white',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
                                },
                            }} color="primary" variant="contained" type="submit">
                            Entrar
                        </Button>
                    </form>



                    <Typography>Garantimos a privacidade dos seus
                        dados com criptografia.</Typography>
                </Grid>


            </Container >
        </>
    )
}