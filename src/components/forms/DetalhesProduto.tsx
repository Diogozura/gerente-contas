import { TextField, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../common/InputMoney';
import { FormProvider, useFormContext } from '../../config/FormContext';



export default function DetalhesProduto() {
 const { value  } = useFormContext();
 console.log('value ', value )
  return (
    <>
      <MoneyInput  />
    </>

  );
}
