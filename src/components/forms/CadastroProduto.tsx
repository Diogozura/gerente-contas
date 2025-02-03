import { Autocomplete, createFilterOptions, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../Inputs/InputMoney';
import { FormProvider, useFormContext } from '../../config/FormContext';
import Image from 'next/image';


const filter = createFilterOptions();
export default function CadastroProduto({ view }) {
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
        <Grid item xs={3}>
          <TextField
            label="Código SKU"
            name="sku"
            fullWidth
            disabled={view}
            value={formValues.produto?.sku || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Código EAN"
            name="ean"
            fullWidth
            disabled={view}
            value={formValues.produto?.ean || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
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
            label="Condição"
            name='condicao'
            fullWidth
            disabled={view}
            value={formValues.produto?.condicao || ''}
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
            label="Itens por caixa"
            name='itensPorCaixa'
            type="number"
            fullWidth
            disabled={view}
            value={formValues.produto?.itensPorCaixa || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Marca"
            name='marca'
            fullWidth
            disabled={view}
            value={formValues.produto?.marca || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Produção"
            name='producao'
            fullWidth
            disabled={view}
            value={formValues.produto?.producao || ''}
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
        <Grid item xs={3}>
          <TextField
            label="Peso Bruto (g)"
            name='pesoBruto'
            type="number"
            fullWidth
            disabled={view}
            value={formValues.produto?.pesoBruto || ''}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

    </>

  );
}