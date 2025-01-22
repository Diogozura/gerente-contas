import React, { useEffect, useState } from "react";
import Joyride, { Step, CallBackProps } from "react-joyride";
import { Typography, Button } from "@mui/material";
import { useFormContext } from "@/config/FormContext";
import { useRouter } from "next/router";

export default function Sobre() {
  const { formValues, setFormValues } = useFormContext();
  const router = useRouter();
  const [run, setRun] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Verificar se está no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);
  const currentPath = router.pathname.replace(/^\//, ""); // Remover barra inicial
  const tourKey = currentPath || "home"; // Use 'home' para a página inicial

  const steps: Step[] = [
    {
      target: "#sobre-title",
      content: "Bem-vindo à página Sobre!",
    },
    {
      target: "#sobre-btn",
      content: "Clique aqui para saber mais sobre nossa equipe!",
    },
  ];

  // Sincronizar estado global e local para iniciar o tour
  useEffect(() => {
    if (!isClient) return;
    const tourState = formValues.Tuor?.[tourKey] || false;
    if (tourState) {
      setRun(true); // Iniciar o tour
    }
  }, [formValues.Tuor, tourKey]);

  // Callback do Joyride para detectar quando o tour termina
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      // Tour terminou: resetar o estado global
      setRun(false); // Parar o tour localmente
      setFormValues("Tuor", { ...formValues?.Tuor, [tourKey]: false });
    }
  };
  // Evitar renderização no servidor
  if (!isClient) return null;
  return (
    <div>
      <Typography variant="h2" textAlign="center" id="sobre-title">
        Página Sobre
      </Typography>
      <Button
        id="sobre-btn"
        variant="contained"
        color="secondary"
        onClick={() => setRun(!run)} // Ativar/desativar o tour manualmente
      >
        Iniciar Tour
      </Button>

      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        callback={handleJoyrideCallback} // Adicionar callback
        styles={{
          options: {
            zIndex: 1000,
            primaryColor: "#d32f2f",
          },
        }}
      />
    </div>
  );
}
