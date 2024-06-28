import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Pedido() {

  const router = useRouter();
  const { name } = router.query;

  const onClick = async (ctx) => {

    // try {
    //   const response = await HttpClient('/api/refresh', {
    //     method: 'PUT',
    //   });
    //   // console.log('API response:', response);
    //   // Faça algo com a resposta, se necessário
    // } catch (error) {
    //   console.error('Error refreshing:', error);
    // }
    // const token = tokenService.get(ctx);
    // return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/token/verify/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: { token },
     
    //   ctx,
    //   refresh: true,
    // }

    // )
    //   .then((response) => {
    //     console.log('response', response.status)
    //     if (!response.ok) throw new Error('Não autorizado');
    //     return response.body;
    //   });
  }
  return (
    <>
      <Typography>Pedido</Typography>

      <Grid container xs={12} >

        <Grid item>
          <Box
            sx={{
              width: 400,
              height: 400,
              bgcolor: "#14961a65",
            }}
          >
            {name}
           Pagamento Confirmado 
           <Button onClick={onClick}>
      
      Refresh
    </Button>
           <Link href={'/auth/cadastro'}>Seguir com cadastro</Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
