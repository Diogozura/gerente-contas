import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Modal,
  TextField,
  Grid,
  IconButton,
  Input,
} from "@mui/material";
import { Add, Save, Close, Upload } from "@mui/icons-material";
import QuickFilteringGrid from "./Tabela2";
import productsData from "../../mock/products.json"; // Importe os dados
import {  useRouter } from "next/router";
import { saveAs } from 'file-saver';
import Papa from "papaparse";

interface Product {
  id: number;
  titulo: string;
  sku: string;
  estoque: number;
  estoqueCd: number;
}

export default function Estoque() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const router = useRouter();
  // Carregar produtos do localStorage ou iniciar com exemplos
 


  useEffect(() => {
    const storedProducts = localStorage.getItem("produtos");
  
    if (storedProducts && storedProducts !== "[]") {
      // Se o localStorage tiver dados válidos, carregue-os
      setProducts(JSON.parse(storedProducts));
    } else {
      // Caso contrário, use os dados mocados e inicialize o localStorage
      setProducts(productsData);
      localStorage.setItem("produtos", JSON.stringify(productsData));
    }
  }, []);

  useEffect(() => {
    // Salva os produtos no localStorage sempre que forem atualizados
    const produtosLocal =  localStorage.getItem("produtos")
    if(!produtosLocal){
      localStorage.setItem("produtos", JSON.stringify(products));
    }
   
  }, [products]);
  // Abrir o modal para adicionar ou editar produto
  const openModal = (product?: Product) => {
    setSelectedProduct(product || { id: 0, titulo: "", sku: "", estoque: 0, estoqueCd: 0 });
    setIsModalOpen(true);
  };

  // Fechar modal
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Salvar produto (adicionar ou editar)
  const saveProduct = () => {
    if (selectedProduct) {
      if (selectedProduct.id === 0) {
        // Adicionar novo produto
        const newProduct = { ...selectedProduct, id: products.length + 1 };
        setProducts([...products, newProduct]);
      } else {
        // Editar produto existente
        setProducts(products.map((p) => (p.id === selectedProduct.id ? selectedProduct : p)));
      }
      closeModal();
    }
  };

  // Remover produto
  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(products.map((product) => product.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };
    
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const newProducts: Product[] = result.data.map((row: any, index: number) => ({
            id: products.length + index + 1, // Gerar IDs únicos
            titulo: row["Título"] || "Sem título",
            sku: row["SKU"] || `SKU${Date.now() + index}`,
            estoque: parseInt(row["Estoque"] || "0", 10),
            estoqueCd: parseInt(row["Estoque em CD"] || "0", 10),
          }));
          setProducts((prev) => [...prev, ...newProducts]);
        },
        error: (err) => {
          console.error("Erro ao processar o CSV: ", err);
        },
      });
    }
  };
  const exportToCSV = () => {
    const selectedProducts = products.filter((product) => selectedIds.includes(product.id));
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["ID", "Título", "SKU", "Estoque", "Estoque em CD"],
        ...selectedProducts.map((product) => [
          product.id,
          product.titulo,
          product.sku,
          product.estoque,
          product.estoqueCd,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "produtos_selecionados.csv");
  };
  return (
    <>
   
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          {/* <Typography variant="h5">Gerenciamento de Estoque</Typography> */}
          <Button
            variant="contained"
            color="primary"
           
            onClick={() => router.push('/estoque/criacao-produto')}
          >
            Adicionar Produto
          </Button>
          <Button
            variant="contained"
            component="label"
            color="primary"
            
          >
            Importar CSV
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              sx={{ display: "none" }}
            />
          </Button>
          <Button
          variant="contained"
          color="primary"
          disabled={selectedIds.length === 0}
          onClick={exportToCSV}
        >
          Exportar Selecionados
        </Button>
        </Box>
        <Box mb={2}>
        <Typography>
           Total de Produtos: {products.length} / Selecionados: {selectedIds.length} 
        </Typography>
      </Box>
        

        {/* Modal para Adicionar/Editar Produto */}
        <Modal open={isModalOpen} >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            <Typography variant="h6" mb={2}>
              {selectedProduct?.id ? "Editar Produto" : "Adicionar Produto"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Título"
                  fullWidth
                  value={selectedProduct?.titulo || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev!, titulo: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="SKU"
                  fullWidth
                  value={selectedProduct?.sku || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev!, sku: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Estoque"
                  type="number"
                  fullWidth
                  value={selectedProduct?.estoque || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({
                      ...prev!,
                      estoque: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Estoque em CD"
                  type="number"
                  fullWidth
                  value={selectedProduct?.estoqueCd || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({
                      ...prev!,
                      estoqueCd: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  onClick={saveProduct}
                >
                  Salvar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Close />}
                  onClick={closeModal}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
      <QuickFilteringGrid
        products={products}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        onEdit={(product) => openModal(product)}
        onDelete={(id) => removeProduct(id)}
        />
    </>
  );
}
