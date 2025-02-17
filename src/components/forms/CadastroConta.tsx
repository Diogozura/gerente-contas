import { useFormContext } from "@/config/FormContext";
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import CNPJInput from "../Inputs/CNPJ";
import CPFInput from "../Inputs/CPF";
import PhoneInput from "../Inputs/Telefone";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
interface CadastroContaProps {
    errors: { [key: string]: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function CadastroConta({ errors, handleInputChange }: CadastroContaProps) {
    const { formValues } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Nome"
                        type="text"
                        name='nome'
                        required
                        error={!!errors.nome}
                        helperText={errors.nome}
                        fullWidth
                        value={formValues.cadastroConta?.nome || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Sobrenome"
                        type="text"
                        name='sobrenome'
                        required
                        error={!!errors.sobrenome}
                        helperText={errors.sobrenome}
                        fullWidth
                        value={formValues.cadastroConta?.sobrenome || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Razão Social"
                        type="text"
                        name='razaoSocial'
                        fullWidth
                        value={formValues.cadastroConta?.razaoSocial || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CPFInput
                        label="CPF"
                        name='cpf'
                    />
                </Grid>
                <Grid item xs={12}>
                    <CNPJInput
                        name='cnpj'
                        label='CNPJ'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        type="email"
                        name='email'
                        fullWidth
                        required
                        value={formValues.cadastroConta?.email || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: 0 }, // Bloqueia manualmente valores negativos
                            style: { appearance: "textfield", WebkitAppearance: "none" }, // Remove spinner
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <PhoneInput label={'Telefone'} name={'telefone'} view={false} />
                </Grid>
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