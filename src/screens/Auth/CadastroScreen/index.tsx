import { Backdrop, Button, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { BoxForm, Formulario } from "../../../components/forms/Formulario";
import { TituloFom } from "../../../components/forms/Formulario/TituloForm";
import { authService } from "../../../services/auth/authService";
import { Notification } from "../../../components/common/AlertToast";
import { BackgroundBox } from "../../../components/layout/backgrouds/comeia";
import CadastroForm from "./Form";


export default function CadastroScreen() {

  return (
    <>
     <Container
        maxWidth="sm"
        sx={{
          display:'flex',
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}>
      <Grid  padding={2}>
      <Typography variant="h6" m={1} color={'text.secondary'} component={'h1'} textAlign={'center'}>FINALIZE O SEU CADASTRO</Typography>

      <CadastroForm />
      </Grid>
     
      
     </Container>
     
    
      {/* <CadastroForm /> */}
    </>
  );
}
