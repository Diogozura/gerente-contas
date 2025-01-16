import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from '../../config/FormContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';




export default function LoginForm() {
    const { formValues, setFormValues } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues('login', { [name]: value }); // Atualiza valores dinamicamente
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
                       
                        value={formValues.login?.email || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl  variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            name='senha'
                            fullWidth
                            value={formValues.login?.senha || ''}
                            onChange={handleInputChange}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Senha"
                        />
                    </FormControl>
                </Grid>

            </Grid>

        </>

    );
}
