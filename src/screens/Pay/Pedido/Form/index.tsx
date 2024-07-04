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


export default function SimpleForm ({plano}) {
  const { formValues, setFormValues } = useFormContext();
  const [formErrors, setFormErrors] = React.useState({
    email: '',
    name: '',
  });

  const router = useRouter();

  const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormValues({
      ...formValues,
      [field]: value,
    });

    // Clear the error for the current field
    setFormErrors({
      ...formErrors,
      [field]: '',
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors: any = {};

    const validateFn = {
      email: validateEmail,
      name: validateName,
    };
   

    Object.keys(formValues).forEach((field) => {
      const error = validateFn[field as keyof typeof formValues](formValues[field as keyof typeof formValues]);
      if (error) {
        errors[field] = error;
      }else{
        const primeiroContaoPromise = authService.primeiroContato({
          email: formValues.email,
          plano,
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
      }
    });

    setFormErrors(errors);

   
 
    if (Object.keys(errors).length === 0) {
      // Redirecionar para a página de pagamento
      router.push('/pay/pagamento');
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

