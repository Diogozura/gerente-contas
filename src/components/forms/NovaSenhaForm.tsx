import { useFormContext } from "@/config/FormContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";

interface CadastroContaProps {
    errors: { [key: string]: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NovaSenhaForm({ errors, handleInputChange }: CadastroContaProps) {
    const { formValues } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            name='senha'
                            fullWidth
                            required
                            value={formValues.cadastroConta?.senha || ''}
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

                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff color="action" /> : <Visibility color="action" />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Senha"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth error={!!errors.confirmarSenha}>
                        <InputLabel htmlFor="outlined-adornment-password">Confirmar Senha</InputLabel>
                        <OutlinedInput
                            name='confirmarSenha'
                            fullWidth
                            required
                            value={formValues.cadastroConta?.confirmarSenha || ''}
                            onChange={handleInputChange}
                            id="outlined-adornment-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showConfirmPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowConfirmPassword}

                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff color="action" /> : <Visibility color="action" />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirmar Senha"
                        />
                        {errors.confirmarSenha && <FormHelperText>{errors.confirmarSenha}</FormHelperText>}

                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}