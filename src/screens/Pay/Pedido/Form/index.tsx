import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import { validateEmail, validateName } from '../../../../utils/validators';
import { useFormContext } from '../../../../config/FormContext';
import { authService } from '../../../../services/auth/authService';
import { PromiseNotification } from '../../../../components/common/PromiseNotification';
import { tokenService } from '../../../../services/auth/tokenService';

export default function SimpleForm({ plano }) {
  const { formValues, setFormValues } = useFormContext();
  const formName = 'contato';
  const [formErrors, setFormErrors] = React.useState({
    email: '',
    // name: '',
  });

  const router = useRouter();

  const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormValues(formName, { [field]: value });

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
      // name: validateName,
    };

    const currentFormValues = formValues[formName] || {};


    Object.keys(currentFormValues).forEach((field) => {
      const error = validateFn[field as keyof typeof currentFormValues]?.(currentFormValues[field]);
      if (error) {
        errors[field] = error;
      }
    });

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const primeiroContaoPromise = authService.primeiroContato({
        email: formValues.contato.email,
        plano,
      });

      PromiseNotification({
        promise: primeiroContaoPromise,
        pendingMessage: 'Logging in...',
        successMessage: 'Login successful! Redirecting...',
        errorMessage: 'An error occurred. Please try again.',
        successCallback: () => {
          return setTimeout((ctx) => {
            router.push({
              pathname: '/pay/pagamento',
              query: { id: tokenService.getPay(ctx) },
            });
          }, 300);
        },
      });
    }
  };

  return (
    <form  onSubmit={handleSubmit}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <CustomInput
              label="Email"
              type="email"
              value={formValues[formName]?.email || ''}
              onChange={handleChange('email')}
              helperText={formErrors.email}
              error={!!formErrors.email}
            /> */}
          </Grid>
          {/* <Grid item xs={12}>
            <CustomInput
              label="Nome"
              type="text"
              value={formValues[formName]?.name || ''}
              onChange={handleChange('name')}
              helperText={formErrors.name}
              error={!!formErrors.name}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={!formValues[formName]?.email} color="primary">
              Avançar
            </Button>
          </Grid>
        </Grid>
      </FormGroup>
    </form>
  );
}
