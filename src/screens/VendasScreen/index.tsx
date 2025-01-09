import React from "react";
import { withSession } from "../../services/auth/session"; // Assuming session management
import Link from "next/link";
import { authService } from "../../services/auth/authService"; // Assuming authentication service
import CustomModal from "../../components/common/CustomModal";
// import { requireAuthentication } (../../helpers/auth"); // Assuming authentication helper
import LineChart from "../../components/ui/charts/LineChart"; // Assuming LineChart component
import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import Head from "next/head";
import vendas from "../../mock/vendas.json"; // Replace with your data source
import Image from "next/image";
import moment from "moment";
import SimularVenda from "./simuladoVenda";
import DetalhesAnuncio from "@/components/forms/DetalhesAnuncio";
import DetalhesProduto from "@/components/forms/DetalhesProduto";

import Garantia from "@/components/forms/Garantia";
import ListaPreco from "@/components/forms/ListaPreco";
import Tributacao from "@/components/forms/Tributacao";
import Estoque from '@/components/forms/Estoque';

// ... (rest of your imports)

export default function Vendas({ data }) {
  // Filter recent sales (24 hours)
  const hoje = moment(data);
  const ontem = moment(data).subtract(1, "days");
  const vendasUltimas24h = vendas.filter((venda) => {
    const dataVenda = moment(venda.data);
    return dataVenda.isBetween(ontem, hoje);
  });

  // Sort sales by date (most recent first)
  vendasUltimas24h.sort((a, b) => moment(b.data).diff(moment(a.data)));

  return (
    <Container maxWidth="lg" sx={{ p: 5, borderRadius: "10px" }}>
      <Box bgcolor="#f4f4f4" padding={10}>
        <Typography variant="h3" component="h2" textTransform="uppercase" textAlign="center">
          NOTIFICAÇÕES de vendas
        </Typography>
        <Typography variant="body1" component="p" textAlign="center">
          Vá até o marketplace para seguir com a venda
        </Typography>
        <SimularVenda />
        {vendasUltimas24h.length === 0 ? (
          <Typography variant="body1" textAlign="center">
            Não houve vendas nas últimas 24 horas.
          </Typography>

        ) : (
          vendasUltimas24h.map((item) => (
            <Paper key={item.id} elevation={1} sx={{ p: 3, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <Image src={item.img} alt={item.titulo} width={100} height={46} style={{ objectFit: "contain" }} />
                </Grid>
                <Grid item xs={7}>
                  {item.descricao} / {item.sku}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" component="p">
                    Vendido há {moment(item.data).fromNow()}
                  </Typography>

                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </Box>

    
      {/* Rest of your content... */}
    </Container>
  );
}

// Consider adding authentication logic (optional)
// Vendas.getLayout = (page) => requireAuthentication(page);