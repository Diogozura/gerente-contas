import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../../config/FormContext';


interface MoneyInputProps {
  label: string;
  name: string; // Identificador único para o campo
}

export default function MoneyInput({ label, name }: MoneyInputProps) {
  const { formValues, setFormValues } = useFormContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const numericValue = rawValue ? parseFloat(rawValue) / 100 : 0; // Converte para decimal
    setFormValues('detalhesProduto', { [name]: numericValue }); // Atualiza apenas este campo no contexto
  };

  const formattedValue = formValues.detalhesProduto?.[name]?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }) || '';

  return (
    <TextField
      label={label}
      value={formattedValue}
      onChange={handleInputChange}
      fullWidth
    />
  );
}
