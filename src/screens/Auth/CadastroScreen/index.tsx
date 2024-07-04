import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { BoxForm, Formulario } from "../../../components/forms/Formulario";
import { TituloFom } from "../../../components/forms/Formulario/TituloForm";
import { authService } from "../../../services/auth/authService";
import { Notification } from "../../../components/common/AlertToast"
import { BackgroundBox } from "../../../components/layout/backgrouds/comeia";
interface Props {
    senha: string,
    nome: string,
    email: string
}

const error = () => {
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
    const router = useRouter();

    const [values, setValues] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        senha: '',
        cpf: ''
    });

    function handleChange(event: any) {
        const fieldName = event.target.name;
        let fieldValue = event.target.value;

        // Format CPF to contain only numbers
        if (fieldName === 'cpf') {
            fieldValue = fieldValue.replace(/\D/g, ''); // Remove non-digit characters
        }

        setValues((currentValues) => {
            return {
                ...currentValues,
                [fieldName]: fieldValue
            }
        });
    }

    const [open, setOpen] = React.useState(false);
  
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        authService.cadastro({
            email: values.email,
            firstname: values.firstname,
            lastname: values.lastname,
            password: values.senha,
            cpf: values.cpf
        })
        .then((res) => {
         
            if (res.status == 200) {
                console.log('ok')
                Notification.show(
                    res.body.mensagem || '',
                     'success'
                 );
         
                setTimeout(() => {
                    router.push("/auth/login");
                }, 5000); // Wait for 5 seconds before redirecting
            } else {
                Notification.show(
                    res.body.mensagem || 'An error occurred. Please try again.',
                     'error'
                 );
                // alert(res.body.mensagem)
            }
        })
            .catch((err) => {
                Notification.show(
                    err.response?.data?.message || err.message || 'An error occurred. Please try again.',
                     'success'
                 );
            // showError(erro);  
        });
    };
    return (
        <BackgroundBox>
            <BoxForm>
                <Formulario onSubmit={handleSubmit}>
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
                        variant="outlined"
                    />
                    <TextField
                        type="text"
                        id="outlined-basic"
                        margin="normal"
                        name="lastname"
                        label="Sobrenome"
                        value={values.lastname}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                    <TextField
                        type="email"
                        id="outlined-basic"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        required
                        margin="normal"
                        variant="outlined"
                    />
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
                        label="CPF"
                        value={values.cpf}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        onClick={handleToggle}
                        type="submit">
                        Cadastrar-se
                    </Button>

                </Formulario>
            </BoxForm>
        </BackgroundBox>
    );
}
