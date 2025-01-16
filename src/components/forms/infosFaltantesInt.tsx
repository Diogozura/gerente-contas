import { FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';

import { useFormContext } from '../../config/FormContext';
import CPFInput from '../Inputs/CPF';
import CNPJInput from '../Inputs/CNPJ';
import PhoneInput from '../Inputs/Telefone';




export default function InfosFaltantesInt({ view }) {
  const { formValues, setFormValues } = useFormContext();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues('infosFaltantesInt', { [name]: value }); // Atualiza valores dinamicamente
  };


  console.log('formValues.infosFaltantesInt?.cnpjOuCpf', formValues.infosFaltantesInt)

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} display={'grid'} alignItems={'center'}>
          <TextField
            label="Razão Social"
            name="razaoSocial"
            fullWidth
            disabled={view}
            value={formValues.infosFaltantesInt?.razaoSocial || ''}
            required
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Inscrição estadual"
            name="inscricaoEstadual"
            fullWidth
            disabled={view}
            value={formValues.infosFaltantesInt?.inscricaoEstadual || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" fontWeight="bold">
            CNPJ ou CPF
          </Typography>
          <RadioGroup
            row
            name='cnpjOuCpf'
            value={formValues.infosFaltantesInt?.cnpjOuCpf}
            onChange={handleInputChange}
          >
            <FormControlLabel value="CNPJ" control={<Radio />} label="CNPJ" />
            <FormControlLabel value="CPF" control={<Radio />} label="CPF" />
          </RadioGroup>
          {formValues.infosFaltantesInt?.cnpjOuCpf === "CNPJ" ? 
          <CNPJInput
            name='cnpj'
            label='CNPJ'
          /> :
           <CPFInput
            label="CPF"
            name='cpf'
          />
          }
        </Grid>

      </Grid>

    </>

  );
}