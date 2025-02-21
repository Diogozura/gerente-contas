import { FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from '../../config/FormContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PhoneInput from '../Inputs/Telefone';

export default function PerfilForm({ view }) {
    const { formValues, setFormValues } = useFormContext();
  
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormValues('minhaConta', { [name]: value }); // Atualiza valores dinamicamente
      };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Nome"
                        type="text"
                        name='nome'
                        fullWidth
                        disabled={view}
                        value={formValues.dadosUsuarioLogado?.nome || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                    
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        type="email"
                        name='email'
                        fullWidth
                        disabled={view}
                        value={formValues.dadosUsuarioLogado?.email || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <PhoneInput label={'Telefone de contato'} name={'telefone'} view={view} />
                </Grid>


            </Grid>

        </>

    );
}
