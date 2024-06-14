import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { BoxForm, Formulario } from "../../components/Formulario";
import { TituloFom } from "../../components/Formulario/TituloForm";
import { authService } from "../../services/auth/authService";

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
    function processo() {
        
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleToggle(); // Show loading indicator

        authService.cadastro({
            email: values.email,
            firstname: values.firstname,
            lastname: values.lastname,
            password: values.senha,
            cpf: values.cpf
        })
        .then((res) => {
            setOpen(false); // Hide loading indicator
            if (res.status == 200) {
                console.log('ok')
                alert(res.body.mensagem)
                toast.success(res.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    router.push("/login");
                }, 5000); // Wait for 5 seconds before redirecting
            } else {
                alert(res.body.mensagem)
            }
        })
        .catch((err) => {
            setOpen(false); // Hide loading indicator
            // error(err.message);
        });
    };
    return (
        <>
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
    );
}
