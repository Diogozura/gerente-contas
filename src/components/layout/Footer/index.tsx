import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <Grid
        container
        component={'footer'}
        sx={{
          bgcolor: "#ca434f",
          p: 11,
          mt:9,
          justifyContent:'space-evenly',
          alignItems:'center'
        }}
      >
        
          <Typography>Hubeefive ©  Todos os direitos reservados 2024</Typography>
          <Typography>
            {" "}
            <Link href={"/politicas-seguranca-privacidade"}>Políticas de Segurança
             e
            Privacidade</Link>
          </Typography>
       
      </Grid>
    </>
  );
}
