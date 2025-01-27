import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";
import { useFormContext } from "@/config/FormContext";
import { useRouter } from "next/router";

interface TourProps {
  steps: Step[];
  nextPage?: string; // Caminho da próxima página (opcional)
}

const Tour: React.FC<TourProps> = ({ steps, nextPage }) => {
  const { formValues, setFormValues } = useFormContext();
  const router = useRouter();
  const [run, setRun] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const currentPath = router.pathname.replace(/^\//, "") || "home";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const tourState = formValues?.Tuor?.[currentPath] || false;
    if (tourState) {
      setRun(true);
    }
  }, [formValues?.Tuor, currentPath, isClient]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action } = data; // Verifica também a ação (e.g., close ou skip)
    console.log("Joyride status:", status);
    console.log("Joyride action:", action);
  
    const finishedStatuses = ["finished", "skipped"]; // Statuses que encerram o tour
    const interruptActions = ["close", "skip"]; // Ações que devem interromper
  
    if (finishedStatuses.includes(status) || interruptActions.includes(action)) {
      setRun(false); // Para o tour
      setFormValues("Tuor", {
        ...formValues?.Tuor,
        [currentPath]: false, // Marca a página atual como "tour finalizado"
      });
  
      // Redireciona se uma próxima página for especificada
      if (nextPage && status === "finished") {
        router.push(nextPage);
      }
    }
  };
  if (!isClient) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 1000,
          primaryColor: "#44d219",
        },
      }}
      locale={{
        next: "Próximo", // Altere o texto de "Next"
        back: "Voltar", // Altere o texto de "Back"
        skip: "Pular", // Altere o texto de "Skip"
        close: "Fechar", // Altere o texto de "Close"
        last: "Proxima tela", // Altere o texto de "Close"
      }}
    />
  );
};

export default Tour;
