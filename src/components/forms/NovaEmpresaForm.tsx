import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from '../../config/FormContext';
import CNPJInput from '../Inputs/CNPJ';





export default function NovaEmpresaForm({view}) {
    const { formValues, setFormValues } = useFormContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues('novaEmpresa', { [name]: value }); // Atualiza valores dinamicamente
    };
    return (
        <>
            <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                    <TextField
                        label="Nome da empresa"
                        type="text"
                        name='nomeEmpresa'
                        fullWidth
                        variant='standard'
                        disabled={view}
                        value={formValues.novaEmpresa?.nomeEmpresa || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid> */}
               
                <Grid item xs={6}>
                    <TextField
                        label="Razão Social"
                        type="text"
                        name='razaoSocial'
                        fullWidth
                        variant='standard'
                        disabled={view}
                        value={formValues.novaEmpresa?.razaoSocial || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                  <CNPJInput label={'Novo CNPJ'} name={'novoCNPJ'} variant={'standard'}               />
                </Grid>
              
            </Grid>

        </>

    );
}
