import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../../config/FormContext';
import { maskPhone } from '../../../utils/mask'; // Função de máscara já existente

interface PhoneInputProps {
  label: string;
  view: boolean;
  name: string; // Identificador único para o campo
  variant?: 'outlined' | 'filled' | 'standard'; // Torna `variant` opcional e define os tipos permitidos
}

export default function PhoneInput({ view, label, name, variant = 'outlined' }: PhoneInputProps) {
  const { formValues, setFormValues } = useFormContext();

 const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setFormValues('infoDados', { [name]: rawValue }); // Armazena o valor bruto no contexto
  };


  const formattedValue = maskPhone(formValues.infoDados?.[name] || ''); // Aplica a máscara no valor atual

  return (
    <TextField
      label={label}
      value={formattedValue}
      onChange={handleInputChange}
      variant={variant} // Usa o valor passado ou 'outlined' como padrão
      fullWidth
      disabled={view}
      inputProps={{ maxLength: 15 }} // Limita a quantidade máxima de caracteres exibidos no campo (incluindo a máscara)

    />
  );
}
