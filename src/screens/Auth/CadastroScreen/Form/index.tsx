import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import CustomInput from '../../../../components/forms/Inputs/CustomInput';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import { validateEmail, validateName } from '../../../../utils/validators';
import { useFormContext } from '../../../../config/FormContext';
import { apiPadrao } from '../../../../utils/api';
import { authService } from '../../../../services/auth/authService';
import { PromiseNotification } from '../../../../components/common/PromiseNotification';
import { tokenService } from '../../../../services/auth/tokenService';


export default function CadastroForm ({plano}) {
  const router = useRouter();

  const [values, setValues] = React.useState({
      firstname: '',
      lastname: '',
      email: '',
      senha: '',
      cpf: ''
  });

  function handleChange(event: any) {
      const fieldName = event.target.name;
      let fieldValue = event.target.value;

      // Format CPF to contain only numbers
      if (fieldName === 'cpf') {
          fieldValue = fieldValue.replace(/\D/g, ''); // Remove non-digit characters
      }

      setValues((currentValues) => {
          return {
              ...currentValues,
              [fieldName]: fieldValue
          }
      });
  }

  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
      setOpen(!open);
  };
  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const primeiroContaoPromise = authService.cadastro({
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.senha,
        cpf: values.cpf,
      });
      console.log('loginPromise', primeiroContaoPromise);
      
      PromiseNotification({
        promise: primeiroContaoPromise,
        pendingMessage: 'Logging in...',
        successMessage: 'Login successful! Redirecting...',
        errorMessage: 'An error occurred. Please try again.',
        successCallback: () => {
          return setTimeout((ctx) => {
            router.push({
              pathname: '/pay/pagamento',
              query: { id: tokenService.getPay(ctx) }, // Supondo que você precisa do ID da resposta
            });
          }, 300);
        },
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <CustomInput
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              helperText={formErrors.email}
              error={!!formErrors.email}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <CustomInput
              label="Nome"
              type="text"
              value={formValues.name}
              onChange={handleChange('name')}
              helperText={formErrors.name}
              error={!!formErrors.name}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Avançar
            </Button>
          </Grid>
        </Grid>
      </FormGroup>
    </form>
  );
};

