import React, { useState, useEffect } from "react";
import {

  Button,

  Typography,

  Input,
  Grid,
  Checkbox,
  Paper,
  Box,
  Chip,
} from "@mui/material";
import QuickFilteringGrid from "./Tabela2";
import productsData from "../../mock/products.json"; // Importe os dados
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import FiltroTexto from "../../components/common/FiltroText";
import FiltroAvancado from "../../components/common/FiltroAvancado";
import { Delete, Edit } from "@mui/icons-material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Image from "next/image";
import Link from "next/link";
import { showToast } from "@/components/common/AlertToast";
import { ModalVinculo } from "@/components/ui/Modal";
import EditarProdutoForm from "@/components/forms/EditarProdutoForm";
import Head from "next/head";
import { useFormContext } from "@/config/FormContext";
interface Product {
  id: number;
  titulo: string;
  sku: string;
  estoque: number;
  estoqueCd: number;
  estoqueMin: number;
  estoqueCdMin: number;
}

const verificarDadosFaltantes = (product: Product): string[] => {
  return Object.entries(product)
    .filter(([_, value]) => value === null || value === undefined || value === "")
    .map(([key]) => key);
};

export default function Estoque() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Produtos filtrados
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [filtroAvancado, setFiltroAvancado] = useState("");
  const [textoFiltro, setTextoFiltro] = useState("");
  const router = useRouter();
  const { formValues, setFormValues } = useFormContext();

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
  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("produtos", JSON.stringify(updatedProducts));
  };
  const handleEditProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("produtos", JSON.stringify(updatedProducts));
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
  const [modalState, setModalState] = React.useState({
    open: false,
    tipo: "",
    data: null, // Armazena os dados do produto no modal
  });

  const handleOpenModal = (tipo: string, data: Product | null = null) => {
    
    setFormValues('editarProduto', {
      titulo: data.titulo,
      sku: data.sku,
      estoque: data.estoque,
    })
    setModalState({
      open: true,
      tipo,
      data, // Passa os dados do produto atual
    });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, tipo: "", data: null });
  };

  const handleSave = (updatedProduct: { id: string; [key: string]: any }) => {
    // 1. Recupera os dados existentes no localStorage
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");

    // 2. Atualiza o produto específico com base no ID
    const produtosAtualizados = produtos.map((produto: any) => {
      if (produto.id === updatedProduct.id) {
        return { ...produto, ...updatedProduct }; // Atualiza apenas as propriedades fornecidas
      }
      return produto; // Mantém os produtos não editados
    });
    // 3. Salva os dados atualizados no localStorage
    console.log('produtosAtualizados', produtosAtualizados)
    localStorage.setItem("produtos", JSON.stringify(produtosAtualizados));

    console.log("Produtos atualizados:", produtosAtualizados);
  };

  const handleSaveModal = (data: any) => {
    const { tipo } = modalState;
    switch (tipo) {
      case "Configuração":
        return (
          <Box>
            <Typography>Configuração da loja: </Typography>
            {/* Outros inputs específicos */}
          </Box>
        );
        break;  
      case "Deletar":
        handleDeleteProduct(modalState.data.id);
        showToast({
          title: "Produto deletado com sucesso!",
          status: "success",
          position: "bottom-left",
        });
        handleCloseModal();
        break;
      case "Editor":
        console.log(' formValues.editarProduto',  formValues.editarProduto)
        // Novo produto atualizado com base nos dados enviados
        const updatedProduct = {
          id: modalState.data.id, 
          titulo: formValues.editarProduto?.titulo, 
          estoque: Number(formValues.editarProduto?.estoque), 
          sku: formValues.editarProduto?.sku, 
          ...formValues.editarProduto, 
        };

        handleSave(updatedProduct); // Atualiza o localStorage ou a base de dados
        showToast({
          title: "Produto salvo com sucesso!",
          status: "success",
          position: "bottom-left",
        });
        handleCloseModal();
        break;
      default:
        return null;
    }
  };
  const renderModalContent = (data: Product | null = null) => {
    const { tipo } = modalState;

    switch (tipo) {
      case "Configuração":
        return (
          <Box>
            <Typography>Configuração da loja: </Typography>
            {/* Outros inputs específicos */}
          </Box>
        );
      case "Deletar":

        return (
          <Typography>
            Tem certeza que deseja deleter?
          </Typography>
        );
      case "Editor":
        return (
          <Box>

            <EditarProdutoForm view={false} />
          </Box>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Head>
        <title>Estoque - beeFive</title>
      </Head>
      <Grid container justifyContent="flex-end" alignItems="center" spacing={2} padding={2} sx={{ mb: 4 }}>
        <Grid item>
          <Button variant="contained" color="primary" id='estoque-header' onClick={() => router.push("/estoque/criacao-produto")}>
            Cadastro de Produto Individual
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" component="label" color="primary">
            Cadastro de Produto Em Massa
            <Input type="file" sx={{ display: "none" }} />
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedIds.length === 0}
            onClick={exportToCSV}
          >
            Exportar Produtos
          </Button>
        </Grid>
      </Grid>

      <Grid display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Grid display={'contents'}>
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
        <Grid display="flex" alignItems="center" gap={2} padding={1}>
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
      {filteredProducts.map((product, index) => {
        const dadosFaltantes = verificarDadosFaltantes(product);
        return (
          <>
            <Paper key={index}
              style={{
                padding: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}>
              <Grid container spacing={2} alignItems="center">
                {/* Checkbox */}
                <Grid item xs={0.3}>
                  <Checkbox color="secondary" checked={selectedIds.includes(product.id)}
                    onChange={() => handleSelectOne(product.id)} />
                </Grid>

                {/* Imagem */}
                <Grid item xs={1} padding={'none'}>
                  <Image
                    src={"https://picsum.photos/200"}
                    width={100}
                    height={100}
                    alt={`Imagem de ${product.titulo}`}
                    style={{ borderRadius: 4 }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Link href={`/estoque/${product.sku}`} passHref>
                    <Typography style={{ cursor: "pointer" }} fontWeight={'600'} component="h3">
                      {product.titulo}
                    </Typography>


                  </Link>
                  <Typography component="p">
                    SKU : <b>{product.sku}</b>
                  </Typography>
                  <Typography component="p">
                    Estoque : <b>{product.estoqueCd}</b>
                  </Typography>
                  <Typography component="p">
                    Estoque em centro de distribuição : <b>{product.estoque}</b>
                  </Typography>
                  <Typography display={'flex'} component="p">
                    🔗 Vinculado em seus Anúncios
                  </Typography>
                </Grid>
                <Grid item xs={1.7} display={'grid'} padding={5}>
                  {product.estoqueMin > product.estoque ?
                    <>
                      <Chip color="error" label="Estoque   Baixo" sx={{ borderRadius: '5px' }} variant="filled" />
                    </> : " "
                  }
                  {product.estoqueCdMin > product.estoqueCd ?
                    <>
                      <Chip color="error" label="Estoque Baixo Em CD" sx={{ borderRadius: '5px' }} variant="filled" />
                    </> : " "
                  }

                  {dadosFaltantes?.length > 0 ?
                    <>
                      <Button
                        variant="contained"
                        color={dadosFaltantes?.length > 0 ? "warning" : "success"}
                        sx={{ m: 1 }}
                      >
                        {dadosFaltantes?.length > 0
                          ? `Faltam dados: ${dadosFaltantes?.join(", ")}`
                          : " "}
                      </Button>

                    </> : " "
                  }
                </Grid>
                <Grid item xs={2} display={'flex'} justifyContent={'space-evenly'}>
                  <Button variant="contained" color="inherit" id="Editor"
                    onClick={() => handleOpenModal("Editor", product)}>
                    <ModeEditOutlineOutlinedIcon />
                  </Button>
                  <Button variant="contained" color="inherit" disabled

                  >
                    <ContentCopyIcon />
                  </Button>
                  <Button variant="contained" color="inherit"
                    id="delelete"
                    onClick={() =>
                      handleOpenModal("Deletar", product)
                    }

                  >
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                  <Button variant="contained" color="inherit" disabled

                  >
                    <RemoveRedEyeOutlinedIcon />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </>
        )
      })
      }
      {/* <ModalVinculo
        open={modalState.open}
        onClose={handleCloseModal}
        title={'Editar Produto'}
        onSave={handleSaveModal}>

        <EditarProdutoForm view={false} />

      </ModalVinculo> */}
      <ModalVinculo
        open={modalState.open}
        onClose={handleCloseModal}
        title={modalState.tipo}
        subTitulo=""
        onSave={handleSaveModal}>
        {renderModalContent()}
      </ModalVinculo>

    </>
  );
}
