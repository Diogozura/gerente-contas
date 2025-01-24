import React from "react";

import { Typography, Button } from "@mui/material";

import { sobreSteps } from "@/features/tours/sobre/steps";
import Tour from "@/components/tuor";

export default function Sobre() {

  return (
    <div>
      <Typography variant="h2" textAlign="center" id="sobre-title">
        Página Sobre
      </Typography>

       {/* Componente de Tour */}
       <Tour steps={sobreSteps}  nextPage="/contato"/>
    </div>
  );
}
