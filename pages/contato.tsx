import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";
import { Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useFormContext } from "@/config/FormContext";
import { contatoSteps } from "@/features/tours/contato/steps";
import Tour from "@/components/tuor";

const Contato: React.FC = () => {

  return (
    <div>
      <Typography variant="h2" textAlign="center" id="contato-title">
        Página de Contato
      </Typography>
      {/* Componente de Tour */}
      <Tour steps={contatoSteps} />
    </div>
  );
};

export default Contato;
