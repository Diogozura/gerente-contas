import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { BoxForm, Formulario } from "../../components/Formulario";
import { TituloFom } from "../../components/Formulario/TituloForm";

export default function NovaSenha() {
    const router = useRouter()

    const [values, setValues] = React.useState({
        senha: '',
        senha2: ''
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
                    router.push("/login")
                }}>
                    <TituloFom>Nova senha</TituloFom>
                <TextField
                        id="outlined-basic"
                        label="Nova Senha"
                        type="password"
                        name="senha"
                        value={values.senha}
                        onChange={handleChange}
                        margin="normal"
                        required
                        variant="standard" />
                    
                      <TextField
                        id="outlined-basic"
                        label="Repetir Senha"
                        type="password"
                        name="senha2"
                        value={values.senha2}
                        onChange={handleChange}
                        margin="normal"
                        required
                        variant="standard" />
                      <Button variant="contained" type="submit">Troca</Button>
                </Formulario>
            </BoxForm>
        </>
    )
}