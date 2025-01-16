import { Autocomplete, createFilterOptions, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../Inputs/InputMoney';
import { FormProvider, useFormContext } from '../../config/FormContext';
import Image from 'next/image';


const filter = createFilterOptions();
export default function DetalhesProduto({ view }) {
  const { formValues, setFormValues } = useFormContext();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues('produto', { [name]: value }); // Atualiza valores dinamicamente
  };
  const [options, setOptions] = React.useState<{ title: string }[]>([]);
  const [value, setValue] = React.useState<{ title: string } | null>(null);

  React.useEffect(() => {
    // Carrega as opções do localStorage ao inicializar
    const storedOptions = localStorage.getItem("autocompleteOptions");
    if (storedOptions) {
      setOptions(JSON.parse(storedOptions));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    if (typeof newValue === "string") {
      // Novo valor digitado pelo usuário
      const newOption = { title: newValue };
      setOptions((prev) => {
        const updatedOptions = [...prev, newOption];
        saveToLocalStorage(updatedOptions);
        return updatedOptions;
      });
      setValue(newOption);
    } else if (newValue && newValue.inputValue) {
      // Adiciona novo item
      const newOption = { title: newValue.inputValue };
      setOptions((prev) => {
        const updatedOptions = [...prev, newOption];
        saveToLocalStorage(updatedOptions);
        return updatedOptions;
      });
      setValue(newOption);
    } else {
      setValue(newValue);
    }
  };

  const saveToLocalStorage = (updatedOptions: { title: string }[]) => {
    localStorage.setItem("autocompleteOptions", JSON.stringify(updatedOptions));
  };
  return (
    <>
      <Grid container spacing={2}>
        {/* <Grid item xs={6} sm={6}>
          <MoneyInput label="Valor Mínimo" name="valorMinimo" />
          <MoneyInput label="Valor da compra" name="valorCompra" />
          <MoneyInput label="Preço sugerido" name="precoSugerido" />
          <MoneyInput label="Lucro real" name="lucroReal" />
          <Typography>Valores: {JSON.stringify(formValues.detalhesProduto || {})}</Typography>
          <Typography>meu form: {JSON.stringify(formValues.produto || {})}</Typography>
        </Grid> */}
        
        <Grid item xs={2} textAlign={'center'}>
          <Image width={'100'} height={'100'} src={'/defaultImage.png'} alt={"image default"} />
        </Grid>
        <Grid item xs={10} display={'grid'} alignItems={'center'}>
          <TextField
            label="Título"
            name="titulo"
            fullWidth
            disabled={view}
            value={formValues.produto?.titulo || ''}
            required
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Código SKU"
            name="sku"
            fullWidth
            disabled={view}
            value={formValues.produto?.sku || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Código EAN"
            name="ean"
            fullWidth
            disabled={view}
            value={formValues.produto?.ean || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Unidade"
            name='unidade'
            fullWidth
            disabled={view}
            value={formValues.produto?.unidade || ''}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Altura (cm)"
            type="number"
            name='altura'
            fullWidth
            disabled={view}
            value={formValues.produto?.altura || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Largura (cm)"
            type="number"
            name='largura'
            fullWidth
            disabled={view}
            value={formValues.produto?.largura || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Profundidade (cm)"
            type="number"
            name='profundidade'
            fullWidth
            disabled={view}
            value={formValues.produto?.profundidade || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Peso Líquido (g)"
            name='pesoLiquido'
            type="number"
            fullWidth
            disabled={view}
            value={formValues.produto?.pesoLiquido || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Modelo"
            name='modelo'
            fullWidth
            disabled={view}
            value={formValues.produto?.modelo || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Marca"
            name='marca'
            fullWidth
            disabled={view}
            value={formValues.produto?.marca || ''}
            onChange={handleInputChange}
          />
        </Grid>
        
        <Grid item xs={4}>
          <Autocomplete
           disabled={view}
            value={value}
            onChange={handleChange}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;

              // Verifica se a entrada é nova e sugere adicionar
              const isExisting = options.some((option) => inputValue === option.title);
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="autocomplete-local-storage"
            options={options}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.title;
            }}
            renderOption={(props, option) => (
              <li {...props}>{option.title}</li>
            )}
            freeSolo
            renderInput={(params) => (
              <TextField {...params}  disabled={view} label="Fornecedor" />
            )}
            
          />
        </Grid>
      </Grid>

    </>

  );
}