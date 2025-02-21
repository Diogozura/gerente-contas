import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from '../../config/FormContext';
import CPFInput from '../Inputs/CPF';





export default function NovoUsuarioForm({view}) {
    const { formValues, setFormValues } = useFormContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues('novoUsuario', { [name]: value }); // Atualiza valores dinamicamente
    };
    return (
        <>
            <Grid container spacing={0}>
                {/* <Grid item xs={12}>
                    <TextField
                        label="Nome de Usuário"
                        type="text"
                        name='nomeEmpresa'
                        fullWidth
                        variant='standard'
                        disabled={view}
                        value={formValues.novoUsuario?.nomeEmpresa || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid> */}
               
                <Grid item xs={6}>
                    <TextField
                        label="Email"
                        type="text"
                        name='email'
                        fullWidth
                        variant='standard'
                        disabled={view}
                        value={formValues.novoUsuario?.email || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
{/*               
                <Grid item xs={6}>
                   <CPFInput  variant='standard' label={'Novo CPF'}  name={'Novo CPF'}/>
                </Grid>
                */}
            </Grid>

        </>

    );
}
