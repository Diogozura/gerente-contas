import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import Head from "next/head";
import PerfilForm from "@/components/forms/PerfilForm";
import { useFormContext } from "@/config/FormContext";
import { UsuarioLogado } from "@/types/usuarioLogado";
import { requireAuthentication } from "@/helpers/auth";
import { authService } from "@/services/auth/authService";

interface User {
  nome: string;
  email: string;
  telefone: string;
  permissao: string;
}

export default function Perfil({dadosSala}) {
  const router = useRouter();
  const { formValues, setFormValues } = useFormContext();

     useEffect(() => {
      const nomeCompleto = dadosSala?.dados?.first_name +' '+  dadosSala?.dados?.last_name

       setFormValues("dadosUsuarioLogado", {
        nome: nomeCompleto,
         email: dadosSala?.dados?.email,
       });
     
     }, []);
  


  return (
    <>
      <Head>
        <title>Hubeefive - Perfil</title>
      </Head>
      <Container>
        <Typography variant="h4" gutterBottom>
          Dados do usuario logado
        </Typography>

        <PerfilForm view={true}/>

      </Container>
    </>
  );
}
export const getServerSideProps = requireAuthentication(async (ctx) => {
  const token = ctx.req.token;
  try {
    const dadosSala = await authService.dadosSala(token);

    return {
      props: {
        dadosSala,
      },
    };
  } catch (error) {
    return {
      redirect: {

        permanent: true,
      },
    };
  }
});