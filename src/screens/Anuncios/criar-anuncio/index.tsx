import { Autocomplete, Box, Button, Checkbox, Chip, Container, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import Head from "next/head";
import Bread from "../../../components/Breadcrumbs";
import React from "react";
import mockMarketingPlaces from "../../../mock/marketingPlacesSelecionar.json";

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useRouter } from "next/router";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function generateSlug(titulo) {
    return titulo
      .toLowerCase() // Converte para minúsculas
      .trim() // Remove espaços extras nas extremidades
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-'); // Remove hífens repetidos
  }
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
interface Product {
    id: number;
    titulo: string;
    sku: string;
    estoque: number;
    estoqueCd: number;
    estoqueMin: number;
    estoqueCdMin: number;
}
export default function CriarAnuncio() {
    const router = useRouter()

    const [marketingPlaces, setMarketingPlaces] = React.useState<any[]>([]);
    const [selectedMarketingPlaces, setSelectedMarketingPlaces] = React.useState<any[]>([]);
    const [products, setProducts] = React.useState<Product[]>([]);
    const [selectedProductIds, setSelectedProductIds] = React.useState<number[]>([]);
    const [newAnuncio, setNewAnuncio] = React.useState({
        titulo: "",
        slug:"",
        marketingPlaces: [] as string[],
        produto: [] as { titulo: string; sku: string }[],
    });

    const nav = {
        principal: "anuncios",
        atual: "criacao-anuncio",
    };
    React.useEffect(() => {
        const storedProducts = localStorage.getItem("produtos");
        if (storedProducts && storedProducts !== "[]") {
            setProducts(JSON.parse(storedProducts));
        }
        setMarketingPlaces(mockMarketingPlaces);
    }, []);

    const handleChange = (field: string, value: any) => {
        setNewAnuncio((prev) => {
            const updatedAnuncio = { ...prev, [field]: value };
            if (field === "titulo") {
                updatedAnuncio.slug = generateSlug(value); // Atualiza o slug baseado no título
            }
            return updatedAnuncio;
        });
    };
    const handleProductChange = (selectedProducts: Product[]) => {
        const formattedProducts = selectedProducts?.map((product) => ({
            titulo: product.titulo,
            sku: product.sku,
        }));
        setNewAnuncio((prev) => ({
            ...prev,
            produtos: formattedProducts,
        }));
    };

    const handleSaveAnnouncement = () => {
        const storedAnnouncements = JSON.parse(localStorage.getItem("anuncios") || "[]");
        localStorage.setItem("anuncios", JSON.stringify([...storedAnnouncements, newAnuncio]));
        router.back()
        alert("Anúncio salvo com sucesso!");
    };
    return (
        <>
            <Head>
                <title>Hubeefive - Criar anuncio</title>
            </Head>
            <Container >
                <Bread nav={nav} />
                <Typography variant="h4" gutterBottom>
                    Criar Anuncio
                </Typography>
                <Grid item xs={6}>
                    <TextField
                        label="Titulo do anuncio"
                        type="text"
                        fullWidth
                        value={newAnuncio.titulo}
                        onChange={(e) => handleChange("titulo", e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={marketingPlaces}
                        disableCloseOnSelect
                        onChange={(event, value) => handleChange("marketingPlaces", value.map((place) => place.title))}
                        getOptionLabel={(option) => option.title}
                        renderOption={(props, option, { selected }) => {
                            const { key, ...optionProps } = props;
                            return (
                                <li key={key} {...optionProps}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.title}
                                </li>
                            );
                        }}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Marketing places" placeholder="Selecione... " />
                        )}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Autocomplete
                        freeSolo
                        options={products}
                        getOptionLabel={(option) => (typeof option === "string" ? option : option.titulo)}
                        onChange={(event, value) => {
                            if (value && typeof value !== "string") {
                                handleProductChange([value]); // Adiciona o produto selecionado
                            }
                        }}
                        onInputChange={(event, value) => {
                            const matchingProduct = products.find((product) => product.titulo === value);
                            if (matchingProduct) {
                                handleProductChange([matchingProduct]); // Adiciona o produto ao encontrar no input
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Produto" />}
                    />
                </Grid>
                <Button variant="contained" color="primary" onClick={handleSaveAnnouncement}>
                    Salvar Anúncio
                </Button>

            </Container>
            {/* Ficha tecnina com produto  */}


        </>
    )
}

// const marketingPlaces = [
//     { title: 'Mercado livre', logo: '/marketingplaces/mercadoLivre.png', alt: 'Mercado Livre' },
//     { title: 'Shopee', src: "/marketingplaces/shopee.png", alt: "Shopee" },
//     { title: 'Magalu', src: "/marketingplaces/magalu.png", alt: "Magalu" },
//     { title: 'Americanas', src: "/marketingplaces/americanas.png", alt: "Americanas" },
//     { title: 'Amazon', src: "/marketingplaces/amazon.png", alt: "Amazon" }
// ]