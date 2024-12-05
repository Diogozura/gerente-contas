import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import Bread from "../../components/Breadcrumbs";

export default function CriacaoProduto() {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState({
    id: 0,
    titulo: "",
    sku: "",
    estoque: 0,
    estoqueCd: 0,
  });

  const handleChange = (field: string, value: string | number) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: field === "estoque" || field === "estoqueCd" ? +value : value,
    }));
  };

  const saveProduct = () => {
    const storedProducts = localStorage.getItem("produtos");
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProducts = [
      ...products,
      { ...newProduct, id: products.length + 1 },
    ];
    localStorage.setItem("produtos", JSON.stringify(updatedProducts));
    router.push("/estoque");
  };
const nav ={
    'principal': 'estoque',
    'atual': 'criacao-produto'
};
   

  return (
    <Container>
         <Bread nav={nav}/>
      <Typography variant="h4" gutterBottom>
        Criar Produto
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Título"
              fullWidth
              value={newProduct.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="SKU"
              fullWidth
              value={newProduct.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Estoque"
              type="number"
              fullWidth
              value={newProduct.estoque}
              onChange={(e) => handleChange("estoque", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Estoque em CD"
              type="number"
              fullWidth
              value={newProduct.estoqueCd}
              onChange={(e) => handleChange("estoqueCd", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={saveProduct}>
              Salvar Produto
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
