import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import styled from "styled-components";
import { BoxForm, Formulario } from "../../../components/Formulario";
import { TituloFom } from "../../../components/Formulario/TituloForm";
import { authService } from "../../../services/auth/authService";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { Notification } from "../../../components/AlertToast";
import { PromiseNotification } from "../../../components/PromiseNotification";

export function Login() {
    const router = useRouter();
    const [values, setValues] = useState({
        nome: 'danilocxz@gmail.com',
        senha: '1234@klsqA'
    });

  

    function handleChange(event) {
        const { name, value } = event.target;
        setValues(currentValues => ({
            ...currentValues,
            [name]: value
        }));
    }


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const loginPromise = authService.login({
            username: values.nome,
            password: values.senha
        });

        PromiseNotification({
            promise: loginPromise,
            pendingMessage: 'Logging in...',
            successMessage: 'Login successful! Redirecting...',
            errorMessage: 'An error occurred. Please try again.',
            successCallback: () => {
                setTimeout(() => {
                    router.push("/empresas");
                }, 3000);
              
            },
            errorCallback: () => {
               ;
            }   
        });
    };

    return (
        <>
            <BoxForm>
                <Formulario onSubmit={handleSubmit}>
                    <TituloFom>Login</TituloFom>
                    <TextField
                        id="outlined-basic"
                        label="Nome ou email"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}
                        margin="normal"
                        required
                        variant="standard"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Senha"
                        type="password"
                        name="senha"
                        value={values.senha}
                        onChange={handleChange}
                        margin="normal"
                        required
                        variant="standard"
                    />
                    <Button variant="contained" type="submit">Entrar</Button>
                </Formulario>

                <Alternativos>
                    <Link href={"/trocar-senha"}>Esqueci minha Senha</Link>
                    <p>Não tem conta? <Link href={"/cadastro"}>Criar Conta</Link></p>
                </Alternativos>
            </BoxForm>
            <ToastContainer />
        </>
    );
}

const Alternativos = styled.aside`
    margin: 1rem auto;
    text-align: start;
`;

export default Login;
