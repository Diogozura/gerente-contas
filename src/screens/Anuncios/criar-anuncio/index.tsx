import { Accordion, AccordionSummary, Autocomplete, Box, Button, Checkbox, Chip, Container, Divider, FormControl, FormHelperText, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
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
import { useFormContext } from "@/config/FormContext";
import { ProdutoDetail } from "@/types/produtoDetail";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomAccordion from "@/components/common/CustomAccordionProps";
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" color="action"/>;
const checkedIcon = <CheckBoxIcon fontSize="small" color="action" />;


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
    const { formValues, setFormValues } = useFormContext();
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
        const storedProducts = localStorage.getItem("ProdutosCadastrados");

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
            titulo: product?.CadastroProdutos?.titulo,
            sku: product?.infoProdutos?.sku,
        }));
        // Passa os dados para o contexto
        console.log('formattedProducts', formattedProducts)
        console.log('selectedProducts', selectedProducts)
        setFormValues("produto", selectedProducts[0]?.infoProdutos);
        setProdutoSelecionado(selectedProducts);
        setNewAnuncio((prev) => ({
            ...prev,
            produto: formattedProducts,
        }));
    };


    // Verifica se todos os campos obrigatórios estão preenchidos


    const handleSaveAnnouncement = () => {
        const isTituloValid = newAnuncio.titulo.trim() !== "";
        const isMarketingPlacesValid = newAnuncio.marketingPlaces.length > 0;
        const isProductValid = produtoSelecionado.length >= 1;

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
                <Grid sx={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <Typography variant="h4" gutterBottom>
                        Criar Anuncio
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveAnnouncement}

                    >
                        Salvar Anúncio
                    </Button>
                </Grid>

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
                                                color="info"
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.title}
                                        </li>
                                    );
                                }}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Marketing places" placeholder="Selecione... " error={errors.marketingPlaces} helperText={errors.marketingPlaces && "Selecione pelo menos um marketing place."} />
                                )}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth error={errors.produto} sx={{ marginBottom: 2 }}>
                            <Autocomplete
                                value={produtoSelecionado[0] || null} // Mostra o produto selecionado ou vazio
                                options={products}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option?.CadastroProdutos?.titulo || ""}
                                onChange={(event, value) => {
                                    if (value) {
                                        // Produto selecionado
                                        handleProductChange([value]);
                                    } else {
                                        // Campo limpo
                                        handleProductChange([]);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Produto"
                                        color="primary"
                                        error={errors.produto}
                                        helperText={errors.produto && "Selecione pelo menos um produto."}
                                    />
                                )}
                            />

                        </FormControl>
                    </Grid>
                </Grid>

                <Divider sx={{ m: 2 }} />
                {/* Ficha tecnina com produto  */}
                <Grid>
                    {produtoSelecionado[0] ? (
                        <>
                            {/* Informações do produto */}
                            <CustomAccordion
                                title="Informações do produto"
                                subtitle="Informações detalhadas sobre o produto"
                                defaultExpanded
                                icon={<ShoppingBasketOutlinedIcon />}
                            >
                                <DetalhesProduto view={true} />
                            </CustomAccordion>
                            <Divider sx={{ m: 2 }} />
                            {/* Informações do preço */}
                            <CustomAccordion
                                title="Informações do de precificação "
                                subtitle="Informações detalhadas sobre os preços"
                                defaultExpanded
                                icon={<AttachMoneyOutlinedIcon />}
                            >
                                <ListaPreco view={true} />
                            </CustomAccordion>
                            <Divider sx={{ m: 2 }} />
                            {/* Informações do estoque */}
                            <CustomAccordion
                                title="Informações do de precificação "
                                subtitle="Informações detalhadas sobre os preços"
                                defaultExpanded
                                icon={<LocalShippingOutlinedIcon />}
                            >
                                <Estoque view={true} />
                            </CustomAccordion>

                            <Grid container spacing={2}></Grid>
                        </>
                    ) : ''}
                </Grid>



            </Container >


        </>
    )
}

