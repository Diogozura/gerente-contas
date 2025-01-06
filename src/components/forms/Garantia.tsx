import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../common/InputMoney';
import { FormProvider, useFormContext } from '../../config/FormContext';



export default function Garantia({view}) {
  const { formValues, setFormValues  } = useFormContext();



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues('meuFormulario', { [name]: value }); // Atualiza valores dinamicamente
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
          <Typography>meu form: {JSON.stringify(formValues.meuFormulario || {})}</Typography>
        </Grid> */}

        <Grid item xs={12}>
        <TextField
          label="Título"
          name="titulo"
          fullWidth
          disabled={view}
          value={formValues.meuFormulario?.titulo || ''}
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
            value={formValues.meuFormulario?.sku || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Código EAN"
            name="codigoEan"
            fullWidth
            disabled={view}
            value={formValues.meuFormulario?.codigoEan || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Unidade"
            name='unidade'
            fullWidth
            disabled={view}
            value={formValues.meuFormulario?.unidade || ''}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Altura (cm)"
            type="number"
            name='altura'
            fullWidth
            disabled={view}
            value={formValues.meuFormulario?.altura || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Largura (cm)"
            type="number"
            name='largura'
            fullWidth
            disabled={view}
            value={formValues.meuFormulario?.largura || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Profundidade (cm)"
            type="number"
            name='profundidade'
            fullWidth
            disabled={view}
            value={formValues.meuFormulario?.profundidade || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Modelo"
            name='modelo'
            fullWidth
            disabled={view}
            value={formValues.meuFormulario?.modelo || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Marca"
            name='marca'
            fullWidth
            disabled={view}
            value={formValues.meuFormulario?.marca || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Peso Líquido (g)"
            name='pesoLiquido'
            type="number"
            fullWidth
            disabled={view}
            value={formValues.meuFormulario?.pesoLiquido || ''}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

    </>

  );
}
