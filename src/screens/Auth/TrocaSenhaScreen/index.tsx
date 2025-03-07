import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";


import { authService } from "../../../services/auth/authService";
import Head from "next/head";


export default function TrocarSenha() {
    const router = useRouter()
    const [values, setValues] = React.useState({
        email:""
    })
    
    function handleChange(event:any) {
        const fieldName = event.target.name
        const fieldValue = event.target.value

        setValues((currentValues) => {
            return {
                ...currentValues,
                [fieldName]:fieldValue
            }
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // handleToggle();
        // try {
        //     const res = await authService.login({
        //         username: values.nome,
        //         password: values.senha
        //     });
        //     router.push("/sala");
        // } catch (erro) {
        //     error();
         
        //     handleClose();
        // }
    };

    return (
        <>
        <Head>
             <title>Hubeefive - trocar a senha</title>
        </Head>
            {/* <BoxForm>
                <Formulario onSubmit={(event) => {
                    event.preventDefault()
                    alert(JSON.stringify(values, null, 2))
                    router.push("/nova-senha")
                }}>
                    <TituloFom>Trocar Senha</TituloFom>
                <TextField
                        id="outlined-basic"
                        label="email"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        variant="standard" />
                    
                    <Button variant="contained" type="submit">Enviar</Button>
                </Formulario>
            </BoxForm> */}
        </>
    )
}