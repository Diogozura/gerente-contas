import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Typography, Box, TextField, Button, Grid } from "@mui/material";
import Bread from "../../src/components/ui/Breadcrumbs";
import DetalhesProduto from "../../src/components/forms/DetalhesProduto";
import { useFormContext } from "../../src/config/FormContext";
import { ProdutoDetail } from "@/types/produtoDetail";




interface Product {
  slug: string | string[];
  id: number;
  titulo: string;
  marketingPlaces: string[];
  produto: ProdutoDetail[];
}

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const {  setFormValues  } = useFormContext();
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
        console.log('foundProduct', foundProduct)

        if (foundProduct) {
          setProduct(foundProduct);

          // Pega o primeiro produto do array, ajustando conforme necessário
          const produtoDetail: ProdutoDetail = foundProduct.produto?.[0] || { sku: "", titulo: "", estoque: 0, estoqueCd: 0 };


          // Passa os dados para o contexto
          setFormValues("produto", {
            marketingPlaces: foundProduct.marketingPlaces || [],
            sku: produtoDetail?.sku || "",
            titulo: produtoDetail?.titulo || "",
            estoque: produtoDetail?.estoque || 0,
            estoqueCd: produtoDetail?.estoqueCd || 0,
          });
        }
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
      prev ? {
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
      <DetalhesProduto view={isEditable} />
       
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
