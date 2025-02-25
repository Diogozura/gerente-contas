import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { authService } from "../../../services/auth/authService";
import Head from "next/head";
import TituloHub from "@/components/common/HubfiveName";
import NovaSenhaForm from "@/components/forms/NovaSenhaForm";
import { useFormContext } from "@/config/FormContext";

export default function NovaSenha() {
    const router = useRouter()
    const { formValues, setFormValues } = useFormContext();
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const [values, setValues] = React.useState({
        senha: '',
        senha2: ''
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues("cadastroConta", { [name]: value });
      };

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
        //     const res = await authService.novaSenha({
        //         password: values.password,
        //         token : values.token
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
            <title>Hubeefive - nova  senha</title>
        </Head>
        <Container maxWidth="xs" component={'main'} sx={{
                minHeight: '80vh',
                display: "flex",
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>

                <Grid
                    bgcolor={'background.paper'}
                    padding={3}
                    borderRadius={2}
                    textAlign='center'
                >
                    <TituloHub />
                    <Typography variant="h5" component='h3' mb={5} fontWeight={'600'}>Troca de senha</Typography>
                    <form onSubmit={handleSubmit}>
                        <NovaSenhaForm errors={errors} handleInputChange={handleInputChange}/>
                        <Button fullWidth

                            sx={{

                                textTransform: 'uppercase',
                                mt: 2,
                                background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
                                color: 'white',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #9A44C8 5%, #5E247C 55%)',
                                },
                            }} color="primary" variant="contained" type="submit">
                            Entrar
                        </Button>
                    </form>



                    <Typography>Garantimos a privacidade dos seus
                        dados com criptografia.</Typography>
                </Grid>


            </Container >
        </>
    )
}