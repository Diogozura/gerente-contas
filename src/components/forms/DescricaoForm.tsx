import { useFormContext } from '@/config/FormContext';
import { Grid, TextField } from '@mui/material';
import React from 'react';


export default function DescricaoForm({ view }) {
    const { formValues, setFormValues } = useFormContext();

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues('produtoDescricao', { [name]: value }); // Atualiza valores dinamicamente
  };


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                     <TextField
                      label="Descrição do Produto"
                      multiline
                      fullWidth
                      disabled={view}
                      value={formValues.produtoDescricao?.descricao || ''}
                      onChange={handleInputChange}
                    />
                </Grid>

            </Grid>

        </>

    );
}
