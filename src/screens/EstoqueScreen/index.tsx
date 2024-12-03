import { Box, Button, Checkbox, Container, Divider, Grid, Paper, Select, Tabs, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { styled } from '@mui/system';
import { Check } from "@mui/icons-material";
import TabelaProdutos from "./Tabela";
import QuickFilteringGrid from "./Tabela2";
import { SaveAlt} from "@mui/icons-material";
import React from "react";
// Dados fake (simula importação)
import productsData from "../../../src/mock/products.json";
import { saveAs } from "file-saver";

// Estilização para o menu lateral
const SideMenu = styled(Paper)({
    width: '250px',
    borderRight: '2px solid #E0E0E0',
    padding: '20px',
    height:'80vh',
    backgroundColor: '#FAFAFA',
  });
  
  const TabPanel = styled(Box)({
    padding: '16px',
  });
export default function Estoque(){
  const [products, setProducts] = React.useState(productsData);
  const [selected, setSelected] = React.useState<number[]>([]);

  // Selecionar ou desmarcar todos os produtos
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? products.map((product) => product.id) : []);
  };

  


   // Exportação para CSV
   const exportToCSV = () => {
    const selectedProducts = products.filter((product) =>
      selected.includes(product.id)
    );

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
    saveAs(blob, "produtos.csv");
  };
    return(
        <>
       <Head>
            <title>Hubeefive - Gerenciamento</title>
        </Head>
        <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display={'flex'} justifyContent={'space-around'}>
        <Button variant="contained" color='primary'>
        Cadastro de Produto Individual
        </Button>
        <Button variant="contained" color='primary'>
        Cadastro de Produto Em Massa
        </Button>
        <Button variant="contained" color='primary'   disabled={selected.length === 0}  onClick={exportToCSV} >
        Exportar Produtos
        </Button>
      </Box>   
      </Container>
        <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display={'flex'} justifyContent={'space-around'}>
        
      <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < products.length
                  }
                  checked={selected.length === products.length}
                  onChange={handleSelectAll}
                />
      <TextField>fileds</TextField>
      <Select/>
      </Box>   
      </Container>
      
        <QuickFilteringGrid products={products} selectedAll={selected}/>
        </>
    )
}