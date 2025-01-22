import { Button } from "@mui/material";
import { useTour } from "@/context/TourContext";

export default function StartTourButton() {
  const { setRun, setStepIndex } = useTour();

  const handleStartTour = () => {
    setRun(true); // Ativa o tour
    setStepIndex(0); // Começa do primeiro passo
  };

  return (
    <Button
      onClick={handleStartTour}
      variant="contained"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
    >
      Iniciar Tour
    </Button>
  );
}
