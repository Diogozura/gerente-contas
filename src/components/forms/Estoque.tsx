import { Grid,  TextField, Tooltip } from '@mui/material';
import React from 'react';
import {  useFormContext } from '../../config/FormContext';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";



export default function Estoque({ view }) {
  const { formValues, setFormValues } = useFormContext();



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Math.max(0, Number(value));
    setFormValues('estoque', { [name]: numericValue }); // Atualiza valores dinamicamente
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
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque minimo"
            name='estoqueMinimo'
            type="number"
            fullWidth
            disabled={view}
            value={formValues.estoque?.estoqueMinimo || ''}
            onChange={handleInputChange}
            InputProps={{
              inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
              style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque Máximo"
            type="number"
            fullWidth
            disabled={view}
            value={formValues.estoque?.tituloAnuncio || ''}
            onChange={handleInputChange}
            InputProps={{
              inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
              style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
            }}
          />
        </Grid>
        <Grid item xs={6} display="flex" alignItems="center" gap={1}>
          <TextField
            label="Crossdocking"
            name='crossdocking'
            type="number"
            fullWidth
            disabled={view}
            value={formValues.estoque?.crossdocking || ''}
            onChange={handleInputChange}
            InputProps={{
              inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
              style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
            }}
          />

            {/* Tooltip com ícone de informação */}
            <Tooltip title="Crossdocking é uma prática logística onde os produtos são recebidos em um centro de distribuição e enviados diretamente ao destino final, minimizando o armazenamento." arrow>
              <InfoOutlinedIcon style={{ color: "info", cursor: "pointer" }} />
            </Tooltip>
          
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Localização"
            type="Text"
            fullWidth
            disabled={view}
            value={formValues.estoque?.tituloAnuncio || ''}
            onChange={handleInputChange}
            InputProps={{
              inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
              style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque em CD"
            type="number"
            fullWidth
            disabled={view}
            value={formValues.estoque?.tituloAnuncio || ''}
            onChange={handleInputChange}
            InputProps={{
              inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
              style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque Mínimo"
            type="number"
            fullWidth
            disabled={view}
            value={formValues.estoque?.tituloAnuncio || ''}
            onChange={handleInputChange}
            InputProps={{
              inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
              style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque máximo"
            type="number"
            fullWidth
            disabled={view}
            value={formValues.estoque?.tituloAnuncio || ''}
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
