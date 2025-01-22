import React, { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Container, Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";

export default function Verificacao() {
  const [open, setOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const router = useRouter();

  const messages = [
    "Carregando...",
    "Verificando...",
    "Autenticando...",
  ];

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
