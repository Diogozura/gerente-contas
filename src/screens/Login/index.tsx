import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import react from "react";
import { toast } from 'react-toastify';
import styled from "styled-components";
import { BoxForm, Formulario } from "../../components/Formulario";
import { TituloFom } from "../../components/Formulario/TituloForm";
import LinkPage from "../../components/Link";
import { authService } from "../../services/auth/authService";



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
    const [open, setOpen] = react.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
   

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
                   .catch((erro)=> error() )
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
                    
                    <Button variant="contained" onClick={handleToggle} type="submit"> Entrar</Button>
                    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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