import {
  Box,
  Button,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { tokenService } from "../../../services/auth/tokenService";
import { BackgroundBox } from "../../../components/layout/backgrouds/comeia";
import HubeefivePlano from "../../../components/layout/HubeefivePlano";

export default function Pedido() {
  const router = useRouter();
  const { id } = router.query;

  const steps = ["Select Plano", "Primeiro contato", "Pagamento", "Cadastro"];

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push({
        pathname: '/auth/cadastro',
        query: { id }, // Supondo que você precisa do ID da resposta
      });
    }
  }, [countdown, router, id]);

  return (
    <>
     
     <Container
        maxWidth="sm"
        sx={{
          display:'flex',
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}>
        {/* <LinearStepper/> */}
       <Grid container height={'50vh'} xs={12}>
          {/* <Grid item xs={12}>
            <Stepper activeStep={2} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid> */}
          <Grid
            item
            borderRadius={4}
            padding={1}
            sx={{
              m: '0px auto',
              bgcolor: "#14961a65",
            }}
          >
            <Typography variant="h3" component={'h1'}>
              Pagamento Confirmado
            </Typography> 
            <Typography variant="h4" component={'h2'}>
              Redirecionando em {countdown}...
            </Typography>
            <Link href={"/auth/cadastro"}>Seguir com cadastro</Link>
          </Grid>
        </Grid>
          
     
      </Container>
    </>
  );
}
