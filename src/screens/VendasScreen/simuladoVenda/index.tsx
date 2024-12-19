import React, { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";

interface Produto {
  sku: string;
  titulo: string;
  preco: number;
  estoque: number;
}

const SimularVenda: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleVenda = () => {
    // Recupera os produtos do localStorage
    const produtosJSON = localStorage.getItem("produtos");
    if (!produtosJSON) {
      setNotification("Nenhum produto encontrado no estoque!");
      return;
    }
console.log('produtosJSON', produtosJSON)
    const produtos: Produto[] = JSON.parse(produtosJSON);

    // Filtra produtos com estoque disponível
    const produtosDisponiveis = produtos.filter((produto) => produto.estoque > 0);
    if (produtosDisponiveis.length === 0) {
      setNotification("Todos os produtos estão sem estoque!");
      return;
    }

    // Seleciona um produto aleatório
    const produtoAleatorio = 
      produtosDisponiveis[Math.floor(Math.random() * produtosDisponiveis.length)];

    // Atualiza o estoque do produto
    produtoAleatorio.estoque -= 1;

    // Atualiza o localStorage
    const produtosAtualizados = produtos.map((produto) =>
      produto.sku === produtoAleatorio.sku ? produtoAleatorio : produto
    );
    localStorage.setItem("produtos", JSON.stringify(produtosAtualizados));
    console.log('produtoAleatorio', produtoAleatorio.titulo)
    // Cria a notificação
    const dataAtual = new Date().toLocaleString("pt-BR");
    const notificacao = `
    ${produtoAleatorio?.titulo}
     vendido às ${dataAtual} | 
     SKU: ${produtoAleatorio.sku} - 
     R$${produtoAleatorio?.preco?.toFixed(2)}
     `;
    setNotification(notificacao);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleVenda}>
        Simular Venda
      </Button>

      {/* Exibe notificação */}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
      >
        <Alert severity="info" onClose={() => setNotification(null)}>
          {notification}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SimularVenda;
