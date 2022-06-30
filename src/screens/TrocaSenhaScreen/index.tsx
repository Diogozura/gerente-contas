import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { BoxForm, Formulario } from "../../components/Formulario";
import { TituloFom } from "../../components/Formulario/TituloForm";


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

    return (
        <>
            <BoxForm>
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
            </BoxForm>
        </>
    )
}