import React from "react";
import { withSession } from "../../services/auth/session"; // Assuming session management
import Link from "next/link";
import { authService } from "../../services/auth/authService"; // Assuming authentication service
import CustomModal from "../../components/common/CustomModal";
// import { requireAuthentication } (../../helpers/auth"); // Assuming authentication helper
import LineChart from "../../components/ui/charts/LineChart"; // Assuming LineChart component
import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import Head from "next/head";

import Image from "next/image";
import moment from "moment";
import SimularVenda from "./simuladoVenda";
import { Venda } from "@/types/Venda";



// ... (rest of your imports)

export default function Vendas({ data }) {
  const [vendas, setVendas] = React.useState<Venda[]>([]);

  // Carregar vendas ao montar o componente
  React.useEffect(() => {
    const carregarVendas = () => {
      const vendasLocal: Venda[] = JSON.parse(localStorage.getItem("vendas") || "[]");
      setVendas(vendasLocal);
    };

    carregarVendas();

    // Adicionar listener para atualizar sempre que localStorage mudar
    window.addEventListener("storage", carregarVendas);

    return () => {
      window.removeEventListener("storage", carregarVendas);
    };
  }, []);

  const hoje = moment();
  const ontem = moment().subtract(1, "days");

  // Filtrar vendas das últimas 24 horas
  const vendasUltimas24h = vendas?.filter((venda) => {
    const dataVenda = moment(venda.dataHora);
    return dataVenda.isBetween(ontem, hoje);
  });

  // Função para atualizar vendas depois de simular
  const atualizarVendas = () => {
    const vendasAtualizadas: Venda[] = JSON.parse(localStorage.getItem("vendas") || "[]");
    setVendas(vendasAtualizadas);
  };
  const formatarMarketplace = (nome: string | undefined) => {
    if (!nome) return "default"; // Retorna uma imagem padrão caso o nome seja undefined
    return nome.toLowerCase().replace(/\s+/g, "");
  };
  return (
    <Container maxWidth="lg" sx={{ p: 5, borderRadius: "10px" }}>
      <Box bgcolor="#f4f4f4">
        <Typography variant="h3" component="h2" textTransform="uppercase" fontWeight={'500'} textAlign="center">
          NOTIFICAÇÕES de vendas
        </Typography>
        <Typography variant="body1" component="p" textAlign="center">
          Vá até o marketplace para seguir com a venda
        </Typography>
        <SimularVenda atualizarVendas={atualizarVendas}/>

     
        {vendasUltimas24h.length === 0 ? (
          <Typography variant="body1" textAlign="center">
            Não houve vendas nas últimas 24 horas.
          </Typography>

        ) : (
          vendasUltimas24h.map((item) => (
            <Paper key={item.sku} elevation={1} sx={{ p: 3, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <Image src={`/marketingplaces/${formatarMarketplace(item?.marketingPlaces)}.png`} alt={item.titulo} width={100} height={46} style={{ objectFit: "contain" }} />
                </Grid>
                <Grid item xs={7}>
                  {item.titulo} / {item.sku}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" component="p">
                    Vendido há {moment(item.dataHora).fromNow()}
                  </Typography>

                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </Box>
    </Container>
  );
}
