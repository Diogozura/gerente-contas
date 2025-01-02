import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Typography, Box, TextField, Button, Grid } from "@mui/material";
import Bread from "../../src/components/Breadcrumbs";

interface Product {
  slug: string | string[];
  id: number;
  titulo: string;
  sku: string;
  estoque: number;
  estoqueCd: number;
}

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditable, setIsEditable] = useState(false); // Controla se o formulário é editável

  useEffect(() => {
    // Verifica permissões no localStorage
    const userData = localStorage.getItem("dadosUsuarioLogado");
    if (userData) {
      const user = JSON.parse(userData);
      setIsEditable(user.permissao === "editar"); // Exemplo: 'editar' ou 'visualizar'
    }

    // Carrega os dados do produto
    if (slug) {
      const storedProducts = localStorage.getItem("anuncios");
      if (storedProducts) {
        const products: Product[] = JSON.parse(storedProducts);
        const foundProduct = products.find((p) => p?.slug === slug);
        setProduct(foundProduct || null);
      }
    }
  }, [slug]);

  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Produto não encontrado</Typography>
      </Container>
    );
  }

  const nav = {
    principal: "anuncios",
    atual: "Produto",
  };

  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : null
    );
  };

  const handleSave = () => {
    const storedProducts = localStorage.getItem("anuncios");
    if (storedProducts && product) {
      const products: Product[] = JSON.parse(storedProducts);
      const updatedProducts = products.map((p) => (p.id === product.id ? product : p));
      localStorage.setItem("produtos", JSON.stringify(updatedProducts));
      alert("Produto atualizado com sucesso!");
    }
  };

  return (
    <Container>
      <Bread nav={nav} />
      <Typography variant="h4" gutterBottom>
        Detalhes do Produto
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Título"
              value={product.titulo}
              fullWidth
              onChange={(e) => handleChange("titulo", e.target.value)}
              disabled={!isEditable} // Campo editável apenas se permitido
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="SKU"
              value={product.sku}
              fullWidth
              onChange={(e) => handleChange("sku", e.target.value)}
              disabled={!isEditable}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Estoque"
              value={product.estoque}
              fullWidth
              type="number"
              onChange={(e) => handleChange("estoque", parseInt(e.target.value, 10))}
              disabled={!isEditable}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Estoque em CD"
              value={product.estoqueCd}
              fullWidth
              type="number"
              onChange={(e) => handleChange("estoqueCd", parseInt(e.target.value, 10))}
              disabled={!isEditable}
            />
          </Grid>
        </Grid>
        {isEditable && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginTop: "16px" }}
          >
            Salvar Alterações
          </Button>
        )}
        {!isEditable && (
          <Button variant="outlined" disabled style={{ marginTop: "16px" }}>
            Somente visualização
          </Button>
        )}
      </Box>
    </Container>
  );
}
