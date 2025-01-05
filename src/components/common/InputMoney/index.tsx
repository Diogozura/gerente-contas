import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../../config/FormContext';


export default function MoneyInput() {
  const { formattedValue, handleChange } = useFormContext();


  return (
    <TextField
      label="Valor (BRL)"
      variant="outlined"
      value={formattedValue} // Valor formatado
      onChange={handleChange} // Lida com mudanças no input
      fullWidth
    />
  );
}
