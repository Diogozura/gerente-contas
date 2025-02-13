/* eslint-disable react/no-children-prop */
import { Box, Grid, Typography } from "@mui/material";
import CardsPlano from "./Cards";
import { Plan, plans } from "./planos";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { requireAuthentication } from "@/helpers/auth";
import { authService } from "@/services/auth/authService";
import { GetServerSideProps } from "next";


export default function HomeScreen({dadosSala}) {
  console.log('dadosSala', dadosSala)
  return (
    <>
      <Head>
        <title>Hubeefive - seu novo hub de marketing places</title>
      </Head>
      <Box sx={{
        backgroundColor: '#7B5192'
      }}
       padding={10}
      textAlign={'center'}
       >
        <Typography component={'h1'} variant="h5" fontWeight={'bold'} color={'white'}>INTEGRE, ADMINISTRE E OTIMIZE SUAS <br/>
          VENDAS E ANÚNCIOS EM UM ÚNICO LUGAR</Typography>
      </Box>
      <Grid container >
        <Grid item xs={12} id="home" textAlign={'center'} mt={5}>
          <Typography variant="h5" color={'text.secondary'} fontWeight={'500'} component={'h1'}>Escolha um plano que mais se encaixa com sua operação</Typography>
        </Grid>


        <Grid item xs={12} padding={1} display={"flex"} flexWrap={'wrap'} textAlign={"center"} justifyContent={'space-around'} >
          {dadosSala?.planos?.map((plan: Plan) => (
            <CardsPlano
              key={plan?.plano}
              plano={plan?.plano}
              preco={plan?.valor}
              // descricao={plan.descricao}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const dadosSala = await authService.planosHub();

    return {
      props: {
        dadosSala: dadosSala.dados || [], // Evita retornar undefined
      },
    };
  } catch (error) {
    console.error("Erro ao buscar planos do hub:", error);

    return {
      props: {
        dadosSala: [], // Retorna array vazio em caso de erro
      },
    };
  }
};