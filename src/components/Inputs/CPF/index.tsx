import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../../config/FormContext';

interface CPFInputProps {
  label: string;
  name: string;
  variant?: 'outlined' | 'filled' | 'standard';
}

// Função para aplicar máscara de CPF
const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
    .replace(/(\d{3})(\d{2})$/, '$1-$2'); // Adiciona o traço
};

export default function CPFInput({ label, name, variant = 'outlined' }: CPFInputProps) {
  const { formValues, setFormValues } = useFormContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setFormValues('infoDados', { [name]: rawValue }); // Armazena o valor bruto no contexto
  };

  const formattedValue = maskCPF(formValues.infoDados?.[name] || ''); // Aplica a máscara no valor atual

  return (
    <TextField
      label={label}
      value={formattedValue} // Exibe o valor mascarado
      onChange={handleInputChange}
      variant={variant}
      fullWidth
      inputProps={{ maxLength: 14 }} // Limita a quantidade máxima de caracteres exibidos no campo (incluindo a máscara)
    />
  );
}
