import { Grid, Typography } from "@mui/material";
import Head from "next/head";
import CardsPlano from "../HomeScreen/Cards";
import { Plan, plans } from "../HomeScreen/planos";

export default function PlanosScreen (){
    return(
        <>
        <Head>
            <title>Planos - hubFive</title>
        </Head>
        <Grid container >
        <Grid item xs={12} id="home" textAlign={'center'} mt={5}>
          <Typography variant="h5" color={'text.secondary'} fontWeight={'500'} component={'h1'}>Escolha um plano que mais se encaixa com sua operação</Typography>
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
        </>
    )
}