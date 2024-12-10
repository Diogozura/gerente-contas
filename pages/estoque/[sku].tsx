import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import Bread from "../../src/components/Breadcrumbs";

interface Product {
  id: number;
  titulo: string;
  sku: string;
  estoque: number;
  estoqueCd: number;
}

export default function ProductDetail() {
  const router = useRouter();
  const { sku } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (sku) {
      const storedProducts = localStorage.getItem("produtos");
      if (storedProducts) {
        const products: Product[] = JSON.parse(storedProducts);
        const foundProduct = products.find((p) => p.sku === sku);
        setProduct(foundProduct || null);
      }
    }
  }, [sku]);

  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Produto não encontrado</Typography>
      </Container>
    );
  }
  const nav ={
    'principal': 'estoque',
    'atual': 'Produto'
};
  return (
    <Container>
       <Bread nav={nav}/>
      <Typography variant="h4" gutterBottom>
        Detalhes do Produto
      </Typography>
      <Box>
        <Typography><strong>ID:</strong> {product.id}</Typography>
        <Typography><strong>Título:</strong> {product.titulo}</Typography>
        <Typography><strong>SKU:</strong> {product.sku}</Typography>
        <Typography><strong>Estoque:</strong> {product.estoque}</Typography>
        <Typography><strong>Estoque em CD:</strong> {product.estoqueCd}</Typography>
        <Button>Nova compra</Button>
      </Box>
    </Container>
  );
}
