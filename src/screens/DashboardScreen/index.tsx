import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Container } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { Venda } from "@/types/Venda";

// Registra os elementos necessários para os gráficos
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

const Dashboards: React.FC = () => {
  const [marketplacesData, setMarketplacesData] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });

  const [vendasPorSemana, setVendasPorSemana] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });

  const [titulosVendidos, setTitulosVendidos] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });

  useEffect(() => {
    const carregarVendas = () => {
      const vendas: Venda[] = JSON.parse(localStorage.getItem("vendas") || "[]");

      const marketingPlacesCounter: Record<string, number> = {};
      const titulosCounter: Record<string, number> = {};
      const semanaContador: Record<string, number> = {};

      const hoje = new Date();
      for (let i = 6; i >= 0; i--) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() - i);
        const diaFormatado = data.toLocaleDateString("pt-BR", { weekday: "short" });
        semanaContador[diaFormatado] = 0;
      }

      vendas.forEach(({ marketingPlaces, titulo, dataHora }) => {
        // Contagem de Marketplaces
        const marketplaceKey = marketingPlaces.toLowerCase().replace(/\s+/g, "");
        marketingPlacesCounter[marketplaceKey] = (marketingPlacesCounter[marketplaceKey] || 0) + 1;

        // Contagem de Títulos
        titulosCounter[titulo] = (titulosCounter[titulo] || 0) + 1;

        // Contagem de Vendas por Dia na Semana
        const dataVenda = new Date(dataHora);
        const diaSemana = dataVenda.toLocaleDateString("pt-BR", { weekday: "short" });
        if (semanaContador[diaSemana] !== undefined) {
          semanaContador[diaSemana]++;
        }
      });

      setMarketplacesData({
        labels: Object.keys(marketingPlacesCounter),
        values: Object.values(marketingPlacesCounter),
      });

      setTitulosVendidos({
        labels: Object.keys(titulosCounter),
        values: Object.values(titulosCounter),
      });

      setVendasPorSemana({
        labels: Object.keys(semanaContador),
        values: Object.values(semanaContador),
      });
    };

    carregarVendas();

    const handleStorageChange = () => carregarVendas();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Container>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", padding: "20px" }}>
        {/* Marketplaces Mais Utilizados */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
          <h2>Marketplaces Mais Utilizados</h2>
          <PieChart
            series={[
              {
                data: marketplacesData.labels.map((label, index) => ({
                  id: index,
                  value: marketplacesData.values[index],
                  label,
                })),
              },
            ]}
            width={400}
            height={300}
          />
        </div>

        {/* Vendas por Dia na Última Semana */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
          <h2>Vendas por Dia na Última Semana</h2>
          <Bar
            data={{
              labels: vendasPorSemana.labels,
              datasets: [
                {
                  label: "Vendas",
                  data: vendasPorSemana.values,
                  backgroundColor: "#4CAF50",
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>

        {/* Títulos Mais Vendidos */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
          <h2>Títulos Mais Vendidos</h2>
          <Doughnut
            data={{
              labels: titulosVendidos.labels,
              datasets: [
                {
                  data: titulosVendidos.values,
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Dashboards;
