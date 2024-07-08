import { Backdrop, Button, CircularProgress, Container, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { BoxForm, Formulario } from "../../../components/forms/Formulario";
import { TituloFom } from "../../../components/forms/Formulario/TituloForm";
import { authService } from "../../../services/auth/authService";
import { Notification } from "../../../components/common/AlertToast";
import { BackgroundBox } from "../../../components/layout/backgrouds/comeia";
import CadastroForm from "./Form";

interface Props {
  senha: string;
  nome: string;
  email: string;
}

const error = () => {
  toast.error("Error usuário já existe", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default function CadastroScreen() {
  const router = useRouter();

  return (
    <BackgroundBox>
     <Container  maxWidth="sm"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}>
     <CadastroForm />
     </Container>
     

      {/* <CadastroForm /> */}
    </BackgroundBox>
  );
}
