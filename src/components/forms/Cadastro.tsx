import { Grid,  TextField, Tooltip } from '@mui/material';
import React from 'react';
import {  useFormContext } from '../../config/FormContext';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";



export default function Estoque({ view }) {
  const { formValues, setFormValues } = useFormContext();



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Math.max(0, Number(value));
    setFormValues('cadastro', { [name]: numericValue }); // Atualiza valores dinamicamente
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Estoque Local"
            name='estoqueLocal'
            type="number"
            fullWidth
            disabled={view}
            value={formValues.estoque?.estoqueLocal || ''}
            onChange={handleInputChange}
            InputProps={{
              inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
              style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
            }}
          />
          <TextField
            label="Estoque Local"
            name='estoqueLocal'
            type="number"
            fullWidth
            disabled={view}
            value={formValues.estoque?.estoqueLocal || ''}
            onChange={handleInputChange}
            InputProps={{
              inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
              style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
            }}
          />
        </Grid>
        
      </Grid>

    </>

  );
}
