import React, { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Container, Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { requireAuthentication } from "@/helpers/auth";
import { authService } from "@/services/auth/authService";
import { parseCookies, setCookie } from "nookies";
import { useFormContext } from "@/config/FormContext";

export default function Verificacao({dadosSala}) {
  const [open, setOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const router = useRouter();
const {  setFormValues } = useFormContext();
  const messages = [
    "Carregando...",
    "Verificando...",
    "Autenticando...",
  ];
  
  useEffect(() => {
    if (dadosSala?.dados) {
      const usuarioLogado = {
        userName: dadosSala.dados.first_name,
        email: dadosSala.dados.email,
        plano: dadosSala.dados.planos_contratados || "Nenhum plano",
        contas: dadosSala.dados.contas,
      };
      const idConta = dadosSala.dados.contas[0].id
      console.log('contas', dadosSala.dados.contas[0].id)
      localStorage.setItem("dadosUsuarioLogado", JSON.stringify(usuarioLogado));
      setFormValues('IdDaConta', { idConta: idConta }); // Atualiza valores dinamicamente
      if (idConta) {
        setCookie(null, "idConta", idConta, {
          maxAge: 60 * 60 * 24 * 7, // 7 dias
          path: "/",
        });
      }
      
    }
  }, [dadosSala]);
  

  useEffect(() => {
    const userData = localStorage.getItem("dadosUsuarioLogado");
    setOpen(true);
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Troca de mensagem a cada 3 segundos

    setTimeout(() => {
      clearInterval(interval);
      if (!userData) {
        router.push("/dashboard/cadastroUser"); // Redireciona para cadastro se não houver dados
      } else {
        router.push("/dashboard"); // Redireciona para dashboard se houver dados
      }
    }, messages.length * 1000); // Espera o tempo total das mensagens antes de redirecionar

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="inherit" />
          <Typography
            sx={{
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {messages[currentMessageIndex] || "Finalizando..."}
          </Typography>
        </Stack>
      </Backdrop>
    </Container>
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