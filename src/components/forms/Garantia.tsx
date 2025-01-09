import { FormControl, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../common/InputMoney';
import { FormProvider, useFormContext } from '../../config/FormContext';



export default function Garantia({ view }) {
  const { formValues, setFormValues } = useFormContext();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
        // Evita números negativos nos campos numéricos
        const numericValue = e.target.type === "number" ? Math.max(0, Number(value)) : value;

        setFormValues("garantia", { [name]: numericValue });
 
  };
  // Monitora mudanças no tipo de garantia
  React.useEffect(() => {
    if (formValues.garantia?.tipoGarantia === "semGarantia") {
      setFormValues("garantia", { unidade: "", valor: "" });
    }
  }, [formValues.garantia?.tipoGarantia, setFormValues]);
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


        {/* Garantia  */}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Garantia
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              name="tipoGarantia"
              value={formValues.garantia?.tipoGarantia || ''}
                onChange={handleInputChange}
            >
              <FormControlLabel
                value="garantiaVendedor"
                control={<Radio />}
                label="Garantia do vendedor"
              />
              <TextField
                label='Garantia do vendedor'
                name="valor"
                value={formValues.garantia?.valor || ''}
                onChange={handleInputChange}
                type="number"
                variant="outlined"
                disabled={view}
                fullWidth
                sx={{
                  display:formValues.garantia?.tipoGarantia == 'garantiaVendedor' ? 'block': 'none'
                }}
                InputProps={{
                  endAdornment: (
                    <TextField
                      select
                      name="unidade"
                      value={formValues.garantia?.unidade || ''}
                      onChange={handleInputChange}
                      variant="outlined"
                      disabled={view}
                      sx={{
                        width: 120, // Largura do seletor
                        padding: 0, // Remove padding interno

                        '& .MuiOutlinedInput-root': {
                          height: '100%', // Garante que o seletor preencha a altura do campo
                          marginRight: '-14px', // Remove margem direita extra (herdada pelo adornment)
                        },
                      }}
                    >
                      <MenuItem value="Dias">Dias</MenuItem>
                      <MenuItem value="Meses">Meses</MenuItem>
                      <MenuItem value="Anos">Anos</MenuItem>
                    </TextField>
                  ),
                }}
              />
              <FormControlLabel
                value="garantiaFabrica"
                control={<Radio />}
                label="Garantia de fábrica"
              />
              <TextField
                label='Garantia de fábrica'
                name="valor"
                value={formValues.garantia?.valor || ''}
                onChange={handleInputChange}
                type="number"
                variant="outlined"
                disabled={view}
                fullWidth
                sx={{
                  display: formValues.garantia?.tipoGarantia == 'garantiaFabrica' ? 'block': 'none'
                }}
                InputProps={{
                  endAdornment: (
                    <TextField
                      select
                      name="unidade"
                      value={formValues.garantia?.unidade || ''}
                      onChange={handleInputChange}
                      variant="outlined"
                      disabled={view}
                      sx={{
                        width: 120, // Largura do seletor
                        padding: 0, // Remove padding interno
                        '& .MuiOutlinedInput-root': {
                          height: '100%', // Garante que o seletor preencha a altura do campo
                          marginRight: '-14px', // Remove margem direita extra (herdada pelo adornment)
                        },
                      }}
                    >
                      <MenuItem value="Dias">Dias</MenuItem>
                      <MenuItem value="Meses">Meses</MenuItem>
                      <MenuItem value="Anos">Anos</MenuItem>
                    </TextField>
                  ),
                }}
              />
              <FormControlLabel
                value="semGarantia"
                control={<Radio />}
                label="Sem garantia"
              />

            </RadioGroup>
          </FormControl>
        </Grid>
       
      </Grid>

    </>

  );
}
