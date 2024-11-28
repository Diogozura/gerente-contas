import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';

// Importa os dados fake
import dadosVendas from '../../mock/dadosVendas.json';
import { Container } from '@mui/material';

// Registra todos os elementos necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LineElement
);

export default function Dashboards() {
  return (
    <Container>
     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h2>Vendas por Mês</h2>
        <Bar data={dadosVendas.vendasPorMes} options={{ responsive: true }} />
      </div>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h2>Categorias Mais Vendidas</h2>
        <Doughnut data={dadosVendas.categoriasMaisVendidas} options={{ responsive: true }} />
      </div>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h2>Lucro por Semana</h2>
        <Line data={dadosVendas.lucroPorSemana} options={{ responsive: true }} />
      </div>
    </div>
    </Container>
   
  );
}
