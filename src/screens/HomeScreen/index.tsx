/* eslint-disable react/no-children-prop */
import { blue } from "@mui/material/colors";
import styled from "styled-components";

import { Box, Button, colors, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { tokenService } from "../../services/auth/tokenService";
import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { authService } from "../../services/auth/authService";
import { themes } from "../../../styles/themes";
import { Theme } from "@mui/material/styles";
import SpacingGrid from "./Cards";
import CardsPlano from "./Cards";
import { Plan, plans } from "./planos";
import { BackgroundBox } from "../../components/layout/backgrouds/comeia";


  export default function HomeScreen(applyHeightRule) {
  const onClick = async (ctx) => {
    await authService.getSession(ctx);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography,
    padding: 1,
    textAlign: "center",
    color: colors.blue,
  }));
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <BackgroundBox>
      <Box 
        // height={applyHeightRule && !isMobile ? "100vh" : "auto"}
       sx={{ flexGrow: 1  }} >
      <Grid container >
        <Grid item xs={12} textAlign={'center'}>
          <h1>Bem-vindo a Hubeefive 🐝</h1>
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <Typography>🐝Escolha um plano que mais se encaixa com sua operação</Typography>
        </Grid>
        <Grid item xs={12} padding={1} display={"flex"} flexWrap={'wrap'} textAlign={"center"} justifyContent={'space-around'} >
          {plans.map((plan: Plan) => (
            <CardsPlano
              key={plan.plano}
              plano={plan.plano}
              preco={plan.preco}
              descricao={plan.descricao}
            />
          ))}
        </Grid>
      </Grid>
      </Box>
      
    </BackgroundBox>
  );
}
