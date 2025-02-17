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
import { authService } from "../../../services/auth/authService";
import LinearStepper from "../../../components/common/Stepper";

export default function Pedido() {
  const router = useRouter();
  const { id } = router.query;

  const steps = ["Select Plano", "Primeiro contato", "Pagamento", "Cadastro"];

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const confirmarPagamento = async (id) => {
      try {
        if (id) {
          
          await authService.confirmarPagamento({ id });
            router.push({
              pathname: "/auth/cadastro",
              query: { id },
            });
          
        }
      } catch (error) {
        console.error("Erro ao confirmar pagamento:", error);
      }
    };

    confirmarPagamento(id);
  }, [countdown, router, id]);

  return (
    <>
     <Container
      
        sx={{
          mt:2,
          display:'flex',
          justifyContent: "center",
          flexDirection:'column',
          alignItems: "stretch",
          minHeight: "80vh",
        }}
      >
       
        {/* <LinearStepper/> */}
        <Grid container xs={12}>
          <Grid
            item
            borderRadius={4}
            padding={2}
            textAlign={'center'}
            sx={{
              m: "0px auto",
              bgcolor: "#14961a65",
            }}
          >
            <Typography variant="h3" component={"h1"}>
              Pagamento Confirmado
            </Typography>
            <Typography variant="h4" component={"h2"}>
              Redirecionando em {countdown}...
            </Typography>
            <Link href={"/auth/cadastro"}>Seguir com cadastro</Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
