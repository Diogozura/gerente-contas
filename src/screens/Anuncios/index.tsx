import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Box, Button, Chip, Grid, Modal, Paper, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import FiltroTexto from "../../components/common/FiltroText";
import { Anuncio } from "@/types/anuncio";

interface ProdutoLocalStorage {
  sku: string;
  estoque: number;
}

const verificarEstoque = (anuncio: Anuncio): boolean => {
  if (typeof window === "undefined") return false;
  const produtosLocalStorage: ProdutoLocalStorage[] = JSON.parse(localStorage.getItem("produtos") || "[]");
  
  return anuncio.produto.some(produtoAnuncio => {
    const produtoLocal = produtosLocalStorage.find(p => p.sku === produtoAnuncio.sku);
    return produtoLocal ? produtoLocal.estoque <= 0 : true;
  });
};

export default function Anuncios() {
  const [openModal, setOpenModal] = React.useState(false);
  const [storedAnuncios, setStoredAnuncios] = React.useState<Anuncio[]>([]);
  const [textoFiltro, setTextoFiltro] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const stored = localStorage.getItem("anuncios");
    if (stored && stored !== "[]") {
      setStoredAnuncios(JSON.parse(stored));
    } else {
      setOpenModal(true);
    }
  }, []);

  const produtosFiltrados = storedAnuncios.filter(produto => produto.titulo.toLowerCase().includes(textoFiltro.toLowerCase()));

  const handleDelete = (slug: string) => {
    const updatedAnuncios = storedAnuncios.filter(anuncio => anuncio.slug !== slug);
    setStoredAnuncios(updatedAnuncios);
    localStorage.setItem("anuncios", JSON.stringify(updatedAnuncios));
  };

  return (
    <>
      <Head>
        <title>Hubeefive - Anúncios</title>
      </Head>
      <Grid container justifyContent="flex-end" alignItems="center" spacing={2} padding={6} sx={{ mb: 4 }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => router.push("/anuncios/criar-anuncio")}>
            Criar anúncio
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" spacing={2} padding={3} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <FiltroTexto label="Filtrar por título ou SKU" value={textoFiltro} onChange={setTextoFiltro} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" textAlign={'end'}>Total de anúncios: <strong>{produtosFiltrados.length}</strong></Typography>
        </Grid>
      </Grid>
      {produtosFiltrados.map((anuncio, index) => (
        <Paper key={index} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box display={'flex'} alignItems={'center'}>
            <Image width={100} height={100} src={'/defaultImage.png'} alt={"image default"} />
            <Typography variant="h3" color={'primary'}>
              <Link href={`/anuncios/${anuncio.slug}`}>{anuncio.titulo}</Link>
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1"><strong>Produtos:</strong></Typography>
            {anuncio.produto.map((produto, idx) => (
              <Typography key={idx} variant="body2">- {produto.titulo} (SKU: {produto.sku})</Typography>
            ))}
            <Typography variant="body1"><strong>🔗</strong> {anuncio.marketingPlaces?.join(", ")}</Typography>
          </Box>
          <Box>
            {verificarEstoque(anuncio) && <Chip color="default" label="Anúncio pausado - sem estoque" sx={{ borderRadius: '5px' }} />}
          </Box>
          <Box>
            <Button variant="contained" color="inherit" onClick={() => handleDelete(anuncio.slug)} sx={{ m: 1 }}>
              <Delete />
            </Button>
          </Box>
        </Paper>
      ))}
      <Modal open={openModal}>
        <Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 2, maxWidth: 550 }}>
          <Typography variant="h4">Você não possui anúncios criados. <Link href={'/anuncios/criar-anuncio'}>Clique aqui</Link> para criar um anúncio.</Typography>
        </Paper>
      </Modal>
    </>
  );
}
