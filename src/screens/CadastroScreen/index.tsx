import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import react from "react";
import { BoxForm, Formulario } from "../../components/Formulario";

interface Props{
    senha: string,
    nome: string,
    email:string
}


export default function CadastroScreen() {
    const router = useRouter()

    const [values, setValues] = react.useState({
        nome: '',
        email: '',
        senha: ''
    })
    function handleChange(event: any) {
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
                    router.push("/sala")
                }}>
                    <h2>Cadastro</h2>
                    <TextField
                        type="text"
                        id="outlined-basic"
                        margin="normal"
                        name="nome"
                        label="Nome"

                        value={values.nome}
                        onChange={handleChange}

                        required 
                        variant="outlined" />
                    
                    <TextField
                        type="email"
                        id="outlined-basic"
                        label="Email"
                        name="email"

                        value={values.email}
                        onChange={handleChange}

                        required
                        margin="normal"
                        variant="outlined" />
                    
                    <TextField
                        type="password"
                        id="outlined-basic"
                        label="Senha"
                        name="senha"

                        value={values.senha}
                        onChange={handleChange}

                        required
                        margin="normal"
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        type="submit">
                        Cadastra-se
                    </Button>
                </Formulario>
            </BoxForm>
            
        </>
    )
}