import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import react from "react";
import { toast } from "react-toastify";
import { BoxForm, Formulario } from "../../components/Formulario";
import { TituloFom } from "../../components/Formulario/TituloForm";
import { authService } from "../../services/auth/authService";

interface Props{
    senha: string,
    nome: string,
    email:string
}
const error= () => {
    toast.error('Error usuário já existe', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

export default function CadastroScreen() {
    const router = useRouter()

    const [values, setValues] = react.useState({
        firstname: '',
        lastname: '',
        email: '',
        senha: '',
        cpf: ''
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
                <Formulario onSubmit={(event) => {
                    event.preventDefault()
                  
                    authService.cadastro({
                        email: values.email,
                        firstname: values.firstname,
                        lastname: values.lastname,
                        password: values.senha,
                        cpf:values.cpf
                    })
                        .then((res) => {
                            router.push("/login")
                        })
                        .catch((err) => {
                            // alert(err)
                            error()     
                    } )
                    
                }}>
                    <TituloFom>Cadastro</TituloFom>
                    <TextField
                        type="text"
                        id="outlined-basic"
                        margin="normal"
                        name="firstname"
                        label="Nome"

                        value={values.firstname}
                        onChange={handleChange}

                        required 
                        variant="outlined" />
                    <TextField
                        type="text"
                        id="outlined-basic"
                        margin="normal"
                        name="lastname"
                        label="Nome"

                        value={values.lastname}
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
                     <TextField
                        type="text"
                        id="outlined-basic"
                        margin="normal"
                        name="cpf"
                        label="cpf"

                        value={values.cpf}
                        onChange={handleChange}

                        required 
                        variant="outlined" />

                    <Button
                        variant="contained"
                        onClick={handleToggle}
                        type="submit">
                        Cadastra-se
                    </Button>
                   
                    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
                </Formulario>
            </BoxForm>
            
        </>
    )
}