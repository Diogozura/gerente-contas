import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import react from "react";
import styled from "styled-components";
import { BoxForm, Formulario } from "../../components/Formulario";
import { TituloFom } from "../../components/Formulario/TituloForm";
import LinkPage from "../../components/Link";
import { authService } from "../../services/auth/authService";



export function Login() {
    const router = useRouter()

    const [values, setValues] = react.useState({
        nome: 'teste@teste.com.br' ,
        senha: '12345678'
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
                <Formulario 
                    onSubmit={(event) => {
                    event.preventDefault()
                    // alert(JSON.stringify(values, null, 2))
                    authService.login({
                        username: values.nome,
                        password: values.senha
                    })
                      .then((res) => {
                       
                            router.push("/sala")
                        })
                   .catch((erro)=> alert(erro))
                    }}
                >
                    <TituloFom>Login</TituloFom>
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

                <Alternativos>
                    <LinkPage href={"/trocar-senha"} name={"Esqueci minha Senha"} color={"#9097f9"} />
                    <p>Não tem conta?  <LinkPage href={"/cadastro"} name={"Criar Conta"} color={"#9097f9"} /></p>
                </Alternativos>
            </BoxForm>
            
        </>
    )
}

const Alternativos = styled.aside`
    margin: 1rem auto;
    text-align: start;
`