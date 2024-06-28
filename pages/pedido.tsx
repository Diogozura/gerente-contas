import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import {  useRouter } from "next/router";

export default function Pedido() {

  const router = useRouter();
  const { name } = router.query;
  return (
    <>
      <Typography>Pedido</Typography>

      <Grid container xs={12} >
        <Grid item xs={6}>
          <Box
            sx={{
              width: 400,
              height: 400,
              bgcolor: "#0855b960",
            }}
          >
            Produto adquirido
            <p>Name: {name}</p>
            <Link 
             href={{
              pathname: '/pagamento',
              query: { name},
            }}
            >Pagar</Link>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              width: 400,
              height: 400,
              bgcolor: "#14961a65",
            }}
          >
            tipos de pagamento
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
