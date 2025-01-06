import { Box, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../common/InputMoney';
import { FormProvider, useFormContext } from '../../config/FormContext';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";



export default function Estoque({ view }) {
  const { formValues, setFormValues } = useFormContext();



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues('estoque', { [name]: value }); // Atualiza valores dinamicamente
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
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque minimo"
            name='estoqueMinimo'
            type="number"
            fullWidth
            value={formValues.estoque?.estoqueMinimo || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque Máximo"
            type="number"
            fullWidth
            value={formValues.estoque?.tituloAnuncio || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6} display="flex" alignItems="center" gap={1}>
          <TextField
            label="Crossdocking"
            name='crossdocking'
            type="number"
            fullWidth
            disabled
            value={formValues.estoque?.crossdocking || ''}
            onChange={handleInputChange}
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
            disabled
            value={formValues.estoque?.tituloAnuncio || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque em CD"
            type="number"
            fullWidth
            value={formValues.estoque?.tituloAnuncio || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque Mínimo"
            type="number"
            fullWidth
            value={formValues.estoque?.tituloAnuncio || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Estoque máximo"
            type="number"
            fullWidth
            value={formValues.estoque?.tituloAnuncio || ''}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

    </>

  );
}
