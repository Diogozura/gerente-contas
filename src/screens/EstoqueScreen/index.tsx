import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Modal,
  TextField,
  Input,
  Grid,
  Checkbox,
} from "@mui/material";
import QuickFilteringGrid from "./Tabela2";
import productsData from "../../mock/products.json"; // Importe os dados
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import FiltroTexto from "../../components/common/FiltroText";
import FiltroAvancado from "../../components/common/FiltroAvancado";

interface Product {
  id: number;
  titulo: string;
  sku: string;
  estoque: number;
  estoqueCd: number;
}

export default function Estoque() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Produtos filtrados
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [filtroAvancado, setFiltroAvancado] = useState("");
  const [textoFiltro, setTextoFiltro] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedProducts = localStorage.getItem("produtos");
    if (storedProducts && storedProducts !== "[]") {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(productsData);
      localStorage.setItem("produtos", JSON.stringify(productsData));
    }
  }, []);

  useEffect(() => {
    // Atualiza os produtos filtrados sempre que os filtros ou os produtos mudarem
    const filtered = products.filter((product) => {
      const matchText =
        product.titulo.toLowerCase().includes(textoFiltro.toLowerCase()) ||
        product.sku.toLowerCase().includes(textoFiltro.toLowerCase());
      const matchAdvanced =
        !filtroAvancado || product.titulo.toLowerCase().includes(filtroAvancado.toLowerCase());
      return matchText && matchAdvanced;
    });
    setFilteredProducts(filtered);
  }, [products, textoFiltro, filtroAvancado]);

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

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert("Selecione pelo menos um produto para excluir.");
      return;
    }
    if (confirm("Você tem certeza que deseja excluir os produtos selecionados?")) {
      setProducts((prev) => prev.filter((product) => !selectedIds.includes(product.id)));
      setSelectedIds([]);
    }
  };

  return (
    <>
      <Grid container justifyContent="flex-end" alignItems="center" spacing={2} padding={2} sx={{ mb: 4 }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => router.push("/estoque/criacao-kit-produto")}>
            Cadastro de kit 
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => router.push("/estoque/criacao-produto")}>
            Cadastro de Produto Individual
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" component="label" color="primary">
            Cadastro de Produto Em Massa
            <Input type="file" sx={{ display: "none" }} />
          </Button>
        </Grid>
      </Grid>

      <Grid display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Grid>
          <Checkbox
            indeterminate={selectedIds.length > 0 && selectedIds.length < products.length}
            checked={selectedIds.length === products.length}
            onChange={handleSelectAll}
          />
          <FiltroTexto
            label="Filtrar por título ou SKU"
            value={textoFiltro}
            onChange={setTextoFiltro}
          />
          <FiltroAvancado
            label="Filtrar por"
            options={[
              { value: "categoria", label: "Categoria" },
              { value: "status", label: "Status" },
              { value: "preco", label: "Preço" },
            ]}
            value={filtroAvancado}
            onChange={setFiltroAvancado}
          />
        </Grid>
        <Grid display="flex" alignItems="center" gap={2}>
          <Typography variant="body2">
            Total de Produtos: {products.length} / Selecionados: {selectedIds.length}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
          >
            Excluir Produtos
          </Button>
        </Grid>
      </Grid>

      <QuickFilteringGrid
        products={filteredProducts} // Use os produtos filtrados
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne} onEdit={function (product: Product): void {
          throw new Error("Function not implemented.");
        } } onDelete={function (id: number): void {
          throw new Error("Function not implemented.");
        } }      />
    </>
  );
}
