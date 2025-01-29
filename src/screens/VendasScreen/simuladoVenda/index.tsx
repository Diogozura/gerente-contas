import React, { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";

interface Produto {
  sku: string;
  titulo: string;
  preco: number;
  estoque: number;
}

interface Anuncio {
  slug: string;
  titulo: string; // Nome do anúncio
  marketingPlaces: string[];
  produto: { sku: string; titulo: string }[]; // Lista de produtos dentro do anúncio
  
}

interface Venda {
  titulo: string;
  sku: string;
  dataHora: string;
  marketingPlaces: string[];
}
interface SimularVendaProps {
  atualizarVendas: () => void;
}

const SimularVenda: React.FC<SimularVendaProps> = ({ atualizarVendas }) => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleVenda = () => {
    if (typeof window === "undefined") return;

    const anuncios: Anuncio[] = JSON.parse(localStorage.getItem("anuncios") || "[]");
    const produtos: Produto[] = JSON.parse(localStorage.getItem("produtos") || "[]");

    if (anuncios.length === 0) {
      setNotification("Nenhum anúncio disponível.");
      return;
    }

    const indexAleatorio = Math.floor(Math.random() * anuncios.length);
    const anuncioSelecionado = anuncios[indexAleatorio];

    if (anuncioSelecionado.produto.length === 0) {
      setNotification(`O anúncio "${anuncioSelecionado.titulo}" não tem produtos vinculados.`);
      return;
    }

    const produtoAnuncio = anuncioSelecionado.produto[0];
    const produtoIndex = produtos.findIndex((produto) => produto.sku === produtoAnuncio.sku);

    if (produtoIndex === -1) {
      setNotification(`Produto "${produtoAnuncio.titulo}" não encontrado no estoque.`);
      return;
    }

    const produtoSelecionado = produtos[produtoIndex];

    if (produtoSelecionado.estoque > 0) {
      produtoSelecionado.estoque -= 1;
      produtos[produtoIndex] = produtoSelecionado;
      localStorage.setItem("produtos", JSON.stringify(produtos));
      console.log('produtoSelecionado', produtoSelecionado)
      console.log('anuncioSelecionado', anuncioSelecionado)
      // Criar venda
      const novaVenda: Venda = {
        titulo: produtoSelecionado.titulo,
        sku: produtoSelecionado.sku,
        marketingPlaces: anuncioSelecionado.marketingPlaces[0],
        dataHora: new Date().toISOString(),
      };

      const vendasExistentes: Venda[] = JSON.parse(localStorage.getItem("vendas") || "[]");
      vendasExistentes.push(novaVenda);
      localStorage.setItem("vendas", JSON.stringify(vendasExistentes));

      // Atualiza a tela
      atualizarVendas();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleVenda}>
        Simular Venda
      </Button>
    </div>
  );
};

export default SimularVenda;
