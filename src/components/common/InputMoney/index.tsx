import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../../config/FormContext';


interface MoneyInputProps {
  label: string;
  name: string; // Identificador único para o campo
  variant?: 'outlined' | 'filled' | 'standard'; // Torna `variant` opcional e define os tipos permitidos
}

export default function MoneyInput({ label, name, variant = 'outlined' }: MoneyInputProps) {
  const { formValues, setFormValues } = useFormContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const numericValue = rawValue ? parseFloat(rawValue) / 100 : 0; // Converte para decimal
    setFormValues('precos', { [name]: numericValue }); // Atualiza apenas este campo no contexto
  };

  const formattedValue = formValues.precos?.[name]?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }) || '';

  return (
    <TextField
      label={label}
      value={formattedValue}
      onChange={handleInputChange}
      variant={variant} // Usa o valor passado ou 'outlined' como padrão
      fullWidth
    />
  );
}
