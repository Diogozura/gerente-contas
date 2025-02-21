import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from '../../config/FormContext';





export default function MinhaContaForm({view}) {
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
                        label="Nome da empresa"
                        type="text"
                        name='nomeEmpresa'
                        fullWidth
                        variant='standard'
                        disabled={view}
                        value={formValues.minhaConta?.nomeEmpresa || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
               
                <Grid item xs={12}>
                    <TextField
                        label="Email Cadastrado"
                        type="text"
                        name='email'
                        fullWidth
                        variant='standard'
                        disabled={view}
                        value={formValues.minhaConta?.email || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Razão Social"
                        type="text"
                        name='razaoSocial'
                        fullWidth
                        variant='standard'
                        disabled={view}
                        value={formValues.minhaConta?.razaoSocial || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="CNPJ"
                        type="text"
                        name='cnpj'
                        fullWidth
                        variant='standard'
                        disabled={view}
                        value={formValues.minhaConta?.cnpj || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Plano Contratado"
                        type="text"
                        name='plano'
                        fullWidth
                        variant='standard'
                        disabled={view}
                        value={formValues.minhaConta?.plano || ''}
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
