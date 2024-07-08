import styled from "styled-components";
import { Box } from "@mui/material";

export const BackgroundBox = styled(Box)`
  background-image: url("/COLMEIA-FUNDO.svg");
  background-size: cover; // Ajuste para cobrir a tela inteira
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  /* height: 100vh; // Ajuste a altura para cobrir a tela inteira */
  display: flex;
  align-items: center;
  justify-content: center;

`;