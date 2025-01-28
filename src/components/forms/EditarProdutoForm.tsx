import { Grid,  TextField, Tooltip } from '@mui/material';
import React from 'react';
import {  useFormContext } from '../../config/FormContext';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";



export default function EditarProdutoForm({ view }) {
  const { formValues, setFormValues } = useFormContext();



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues("editarProduto", {
      ...formValues.editarProduto,
      [name]: name === "estoque" ? Math.max(0, Number(value)) : value, // Garante que estoque seja >= 0
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Titulo"
            name='titulo'
            type="text"
            fullWidth
            disabled={view}
            value={formValues.editarProduto?.titulo || ''}
            onChange={handleInputChange}
           
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="SKU"
            name='sku'
            type="text"
            fullWidth
            disabled
            value={formValues.editarProduto?.sku || ''}
            onChange={handleInputChange}
          
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Atualizar Estoque"
            name='estoque'
            type="number"
            fullWidth
            disabled={view}
            value={formValues.editarProduto?.estoque || 0}
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
