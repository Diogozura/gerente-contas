import { Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../Inputs/InputMoney';
import { FormProvider, useFormContext } from '../../config/FormContext';
import mockMarketingPlaces from "../../mock/marketingPlacesSelecionar.json";
import { Product } from '@/types/product';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
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

export default function DetalhesAnuncio({ view }) {
    const { formValues, setFormValues } = useFormContext();

    const [errors, setErrors] = React.useState({ titulo: false, marketingPlaces: false, produto: false });
    const [products, setProducts] = React.useState<Product[]>([]);
    const [marketingPlaces, setMarketingPlaces] = React.useState<any[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = React.useState([]);
    const [newAnuncio, setNewAnuncio] = React.useState({
        titulo: "",
        slug: "",
        marketingPlaces: [] as string[],
        produto: [] as { titulo: string; sku: string }[],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues('detalhesAnuncio', { [name]: value }); // Atualiza valores dinamicamente
    };
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
    const handleChange = (field: string, value: any) => {
        setNewAnuncio((prev) => {
            const updatedAnuncio = { ...prev, [field]: value };
            if (field === "titulo") {
                updatedAnuncio.slug = generateSlug(value); // Atualiza o slug baseado no título
            }
            return updatedAnuncio;
        });
    };
    React.useEffect(() => {
        const storedProducts = localStorage.getItem("produtos");
        if (storedProducts && storedProducts !== "[]") {
            setProducts(JSON.parse(storedProducts));
        }
        setMarketingPlaces(mockMarketingPlaces);
    }, []);


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Título do Anúncio"
                        name="tituloAnuncio"
                        fullWidth
                        disabled={view}
                        value={formValues.meuFormulario?.tituloAnuncio || ''}
                        required
                        onChange={handleInputChange}
                    />
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
                            
                            renderInput={(params) => (
                                <TextField {...params} label="Marketing places" placeholder="Selecione... " error={errors.marketingPlaces} helperText={errors.marketingPlaces && "Selecione pelo menos um marketing place."} />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={errors.produto} sx={{ marginBottom: 2 }}>
                        <Autocomplete
                            value={produtoSelecionado[0] || null}
                            options={products}
                            disableCloseOnSelect
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

        </>

    );
}
