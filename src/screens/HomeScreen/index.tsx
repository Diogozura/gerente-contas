/* eslint-disable react/no-children-prop */
import { Grid, Typography } from "@mui/material";
import CardsPlano from "./Cards";
import { Plan, plans } from "./planos";
import Head from "next/head";
import Link from "next/link";
import React from "react";


  export default function HomeScreen() {

  return (
    <>
     <Head>
      <title>Hubeefive - seu novo hub de marketing places</title>
    </Head>
      <Grid container >
        <Grid item xs={12} id="home" textAlign={'center'} mt={5}>
          <Typography variant="h5" color={'text.secondary'} component={'h1'}>Escolha um plano que mais se encaixa com sua operação</Typography>
        </Grid>
        <Link href={'/dashboard'}>Direto para dash</Link>
      
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
    </>
  );
}
