import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import styled from "styled-components";
import { BoxForm, Formulario } from "../../components/Formulario";
import { TituloFom } from "../../components/Formulario/TituloForm";
import { authService } from "../../services/auth/authService";
import Link from "next/link";

function error() {
    toast.error('Error', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function Login() {
    const router = useRouter();

    const [values, setValues] = useState({
        nome: 'danilocxz@gmail.com',
        senha: '1234@klsqA'
    });

    const [open, setOpen] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setValues(currentValues => ({
            ...currentValues,
            [name]: value
        }));
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleToggle();
        try {
            const res = await authService.login({
                username: values.nome,
                password: values.senha
            });
            router.push("/empresas");
        } catch (erro) {
            error();
            console.log(erro);
            handleClose();
        }
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
                    <Button variant="contained" type="submit"> Entrar</Button>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Formulario>

                <Alternativos>
                    <Link href={"/trocar-senha"}>Esqueci minha Senha</Link>
                    <p>Não tem conta? <Link href={"/cadastro"}>Criar Conta</Link></p>
                </Alternativos>
            </BoxForm>
        </>
    );
}

const Alternativos = styled.aside`
    margin: 1rem auto;
    text-align: start;
`;

export default Login;
