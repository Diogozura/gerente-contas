/* eslint-disable react/no-children-prop */
import { Grid, Typography } from "@mui/material";
import CardsPlano from "./Cards";
import { Plan, plans } from "./planos";


  export default function HomeScreen() {
  
  return (
    <>
      <Grid container >
        <Grid item xs={12} textAlign={'center'} mt={5}>
          <Typography variant="h5" color={'text.secondary'} component={'h1'}>Escolha um plano que mais se encaixa com sua operação</Typography>
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
  );
}
