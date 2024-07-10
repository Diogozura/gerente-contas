// import { FormGroup } from "@mui/material";
// import Text from "../Inputs/Text";

// export default function formPadrao(){
//     return(
//         <>
//         <FormGroup>
//            <Text/>

//         </FormGroup>
//         </>
//     )
// }
import React, { useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';

const Form: React.FC = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    password2: '',
    cpf: '',
    cnpj: '',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    password2: '',
    cpf: '',
    cnpj: '',
    phone: '',
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCPF = (cpf: string) => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  };

  const validateCNPJ = (cnpj: string) => {
    return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
  };

  const validatePhone = (phone: string) => {
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: any = {};

    if (!validateEmail(formValues.email)) {
      errors.email = 'Email inválido';
    }

    if (formValues.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    if (formValues.password2.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!validateCPF(formValues.cpf)) {
      errors.cpf = 'CPF inválido';
    }

    if (!validateCNPJ(formValues.cnpj)) {
      errors.cnpj = 'CNPJ inválido';
    }

    if (!validatePhone(formValues.phone)) {
      errors.phone = 'Telefone inválido';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Adicione a lógica de envio do formulário aqui
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomInput
              label="Email"
              type="email"
              value={formValues.email}
              onChange={handleChange('email')}
              error={formErrors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Senha"
              type="password"
              value={formValues.password}
              onChange={handleChange('password')}
              error={formErrors?.password}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Repetir Senha"
              type="password"
              value={formValues.password2}
              onChange={handleChange('password2')}
              error={formErrors?.password2}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="CPF"
              type="cpf"
              value={formValues.cpf}
              onChange={handleChange('cpf')}
              error={formErrors.cpf}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="CNPJ"
              type="text"
              value={formValues.cnpj}
              onChange={handleChange('cnpj')}
              error={formErrors.cnpj}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Telefone"
              type="tel"
              value={formValues.phone}
              onChange={handleChange('phone')}
              error={formErrors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </FormGroup>
    </form>
  );
};

export default Form;
