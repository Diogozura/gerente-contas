import React, { useState } from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";
import { Typography, Button } from "@mui/material";

const Contato: React.FC = () => {
  const [run, setRun] = useState(false); // Estado para iniciar o tour
  const steps: Step[] = [
    {
      target: "#contato-title",
      content: "Este é o título da página de contato!",
    },
    {
      target: "#contato-btn",
      content: "Clique neste botão para mais informações!",
    },
  ];

  const handleStartTour = () => {
    setRun(true); // Iniciar o tour
  };

  const handleCallback = (data: CallBackProps) => {
    const { action, index, type } = data;

    if (type === "tour:end") {
      setRun(false); // Encerrar o tour ao finalizar
    }
  };

  return (
    <div>
      <Typography variant="h2" textAlign="center" id="contato-title">
        Página de Contato
      </Typography>
      <Button
        id="contato-btn"
        variant="contained"
        color="primary"
        onClick={handleStartTour}
      >
        Iniciar Tour
      </Button>

      {/* Joyride */}
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        callback={handleCallback}
        styles={{
          options: {
            zIndex: 1000,
            primaryColor: "#1976d2",
          },
        }}
      />
    </div>
  );
};

export default Contato;
