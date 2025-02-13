import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from '../../config/FormContext';





export default function PedidoForm() {
    const { formValues, setFormValues } = useFormContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues('pedido', { [name]: value }); // Atualiza valores dinamicamente
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        type="email"
                        name='email'
                        fullWidth
                        variant='standard'
                        value={formValues.pedido?.email || ''}
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
