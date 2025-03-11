import React, { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Container, Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { authService } from "@/services/auth/authService";
import { setCookie } from "nookies";
import { useFormContext } from "@/config/FormContext";

export default function Verificacao({ dadosSala }) {
  const [open, setOpen] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const router = useRouter();
  const { setFormValues } = useFormContext();

  const messages = ["Carregando...", "Verificando...", "Autenticando..."];

  useEffect(() => {
    if (dadosSala?.dados) {
      const usuarioLogado = {
        userName: dadosSala.dados.first_name,
        email: dadosSala.dados.email,
        plano: dadosSala.dados.planos_contratados || "Nenhum plano",
        contas: dadosSala.dados.contas,
      };
      console.log('empresas_listadas', dadosSala.dados.empresas_listadas)
      console.log('dadosSala.dados', dadosSala.dados)
      const idConta = dadosSala.dados.contas[0]?.id;
      localStorage.setItem("dadosUsuarioLogado", JSON.stringify(usuarioLogado));
      localStorage.setItem("empresas", JSON.stringify(dadosSala.dados.empresas_listadas));
      setFormValues("IdDaConta", { idConta });

      if (idConta) {
        setCookie(null, "idConta", idConta, {
          maxAge: 60 * 60 * 24 * 7, // 7 dias
          path: "/",
        });
      }

      // 🔹 Redirecionar imediatamente após processar os dados
      router.replace("/dashboard");
    } else {
      // 🔹 Se não houver dados, redireciona para cadastro
      router.replace("/dashboard/cadastroUser");
    }
  }, [dadosSala]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
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
        <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
          <CircularProgress color="inherit" />
          <Typography sx={{ fontSize: "1.2rem", textAlign: "center" }}>
            {messages[currentMessageIndex]}
          </Typography>
        </Stack>
      </Backdrop>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  console.log('session', session)
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  try {
    const dadosSala = await authService.dadosSala(session.accessToken);
    return { props: { dadosSala } };
  } catch (error) {
    console.error("Erro ao buscar dadosSala:", error);
    return { props: { dadosSala: null } };
  }
}
