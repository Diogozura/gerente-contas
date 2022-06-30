import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import react from "react";
import { BoxForm, Formulario } from "../../components/Formulario";



export function Login() {
    const router = useRouter()

    const [values, setValues] = react.useState({
        nome: '' ,
        senha: ''
    })

    function handleChange(event:any){
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        
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
                    router.push('/sala')
                }}>
                    <h2>Login</h2>
                    <TextField
                        id="outlined-basic"
                        label="Nome ou email"
                        name="nome"

                        value={values.nome}
                        onChange={handleChange}

                        margin="normal"
                        required 
                        variant="standard" />
                    

                    <TextField
                        id="outlined-basic"
                        label="Senha"
                        type="password"
                        name="senha"
                        value={values.senha}
                        onChange={handleChange}
                        margin="normal"
                        required
                        variant="standard" />
                    
                    <Button variant="contained" type="submit">Entrar</Button>
                </Formulario>
              
            </BoxForm>
            
        </>
    )
}