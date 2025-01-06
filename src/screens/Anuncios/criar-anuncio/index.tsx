import { Autocomplete, Box, Button, Checkbox, Chip, Container, Divider, FormControl, FormHelperText, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import Head from "next/head";
import Bread from "../../../components/ui/Breadcrumbs";
import React from "react";
import mockMarketingPlaces from "../../../mock/marketingPlacesSelecionar.json";
import { Product } from "@/types/product";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useRouter } from "next/router";
import Image from "next/image";
import { TabPanelProps } from "@/types/tabPanelProps";
import DetalhesAnuncio from "@/components/forms/DetalhesAnuncio";
import DetalhesProduto from "@/components/forms/DetalhesProduto";
import Garantia from "@/components/forms/Garantia";
import ListaPreco from "@/components/forms/ListaPreco";
import Tributacao from "@/components/forms/Tributacao";
import Estoque from "@/components/forms/Estoque";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


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

export default function CriarAnuncio() {
    const router = useRouter()

    const [marketingPlaces, setMarketingPlaces] = React.useState<any[]>([]);
    const [selectedMarketingPlaces, setSelectedMarketingPlaces] = React.useState<any[]>([]);
    const [products, setProducts] = React.useState<Product[]>([]);
    const [selectedProductIds, setSelectedProductIds] = React.useState<number[]>([]);
    const [newAnuncio, setNewAnuncio] = React.useState({
        titulo: "",
        slug: "",
        marketingPlaces: [] as string[],
        produto: [] as { titulo: string; sku: string }[],
    });
    const [produtoSelecionado, setProdutoSelecionado] = React.useState([]);

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
    const [errors, setErrors] = React.useState({ titulo: false, marketingPlaces: false, produto: false });

    const handleProductChange = (selectedProducts: Product[]) => {
        const formattedProducts = selectedProducts.map((product) => ({
            titulo: product.titulo,
            sku: product.sku,
        }));

        setProdutoSelecionado(selectedProducts);
        setNewAnuncio((prev) => ({
            ...prev,
            produto: formattedProducts,
        }));
    };


    // Verifica se todos os campos obrigatórios estão preenchidos

   
    const handleSaveAnnouncement = () => {
        const isTituloValid = newAnuncio.titulo.trim() !== "";
        const isMarketingPlacesValid = newAnuncio.marketingPlaces.length > 0 ;
        const isProductValid = produtoSelecionado.length >= 1 ;

        setErrors({
            titulo: !isTituloValid,
            marketingPlaces: !isMarketingPlacesValid,
            produto: !isProductValid,
        });

        if (!isTituloValid || !isMarketingPlacesValid || !isProductValid) {
            return; // Impede a submissão se houver erro
        }
        const storedAnnouncements = JSON.parse(localStorage.getItem("anuncios") || "[]");
        localStorage.setItem("anuncios", JSON.stringify([...storedAnnouncements, newAnuncio]));
        router.back()
        // Salvar anúncio (lógica de salvamento aqui)
        alert("Anúncio salvo com sucesso!");
    };
    return (
        <>
            <Head>
                <title>Hubeefive - Criar anuncio</title>
            </Head>
            <Container sx={{ padding: '30px 0' }} >
                <Bread nav={nav} />
                <Typography variant="h4" gutterBottom>
                    Criar Anuncio
                </Typography>
          
                <Grid container spacing={2}>


                    <Grid item xs={8}>
                        <FormControl fullWidth error={errors.titulo} sx={{ marginBottom: 2 }}>
                            <TextField
                                label="Título do Anúncio"
                                value={newAnuncio.titulo}
                                onChange={(e) => handleChange("titulo", e.target.value)}
                            />
                            {errors.titulo && <FormHelperText>O título é obrigatório.</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth error={errors.marketingPlaces} sx={{ marginBottom: 2 }}>
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
                                    <TextField {...params} label="Marketing places" placeholder="Selecione... "  error={errors.marketingPlaces} helperText={errors.marketingPlaces && "Selecione pelo menos um marketing place."}/>
                                )}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth error={errors.produto} sx={{ marginBottom: 2 }}>
                            <Autocomplete
                                value={produtoSelecionado[0] || null}
                                options={products}
                                getOptionLabel={(option) => option.titulo || ""}
                                onChange={(event, value) => {
                                    if (value) handleProductChange([value]);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Produto" error={errors.produto} helperText={errors.produto && "Selecione pelo menos um produto."} />
                                )}
                            />
                            
                        </FormControl>
                    </Grid>
                </Grid>

                <Divider sx={{ m: 2 }} />
                {/* Ficha tecnina com produto  */}
                <Grid container spacing={2}>
                    <Grid item xs={12} textAlign={'center'}>
                        <Typography variant="h4" component={'h2'}>Informações do produto</Typography>
                    </Grid>
                    <Grid item xs={2} textAlign={'center'}>
                        <Image width={'100'} height={'100'} src={'/defaultImage.png'} alt={"image default"} />
                    </Grid>

                    {produtoSelecionado.map((product) => (
                        <>
                            <Grid item xs={10} display={'grid'} alignItems={'center'}>
                                <TextField
                                    label="Titulo do anuncio"
                                    type="text"
                                    fullWidth
                                    disabled
                                    value={product?.titulo}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="SKU"
                                    type="text"
                                    fullWidth
                                    disabled
                                    value={product?.sku}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="EAN"
                                    type="text"
                                    fullWidth
                                    disabled
                                    value={product?.ean}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Marca"
                                    type="text"
                                    fullWidth
                                    disabled
                                    value={product?.marca}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Modelo"
                                    type="text"
                                    fullWidth
                                    disabled
                                    value={product?.modelo}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Unidade"
                                    type="text"
                                    fullWidth
                                    disabled
                                    value={product?.unidade}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Estoque total"
                                    type="number"
                                    fullWidth
                                    disabled
                                    value={product?.estoque}

                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="altura"
                                    type="number"
                                    fullWidth
                                    disabled
                                    value={product?.altura}

                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="largura"
                                    type="number"
                                    fullWidth
                                    disabled
                                    value={product?.largura}

                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Profundidade"
                                    type="number"
                                    fullWidth
                                    disabled
                                    value={product?.profundidade}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="peso"
                                    type="number"
                                    fullWidth
                                    disabled
                                    value={product?.pesoLiquido}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Descrição"
                                    type="text"
                                    fullWidth
                                    multiline
                                    disabled
                                    value={product?.descricao}

                                />
                            </Grid>
                        </>
                    ))}

                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveAnnouncement}
                    
                >
                    Salvar Anúncio
                </Button>

            </Container>


        </>
    )
}

