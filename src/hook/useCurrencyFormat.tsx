import { useState } from 'react';

export function useCurrencyMask(initialValue = 0) {
  const [value, setValue] = useState<number>(initialValue); // Valor bruto

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    const numericValue = rawValue ? parseFloat(rawValue) / 100 : 0; // Converte para decimal
    setValue(numericValue); // Atualiza o valor bruto
  };

  const formattedValue = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }); // Valor formatado

  return { value, formattedValue, setValue, handleChange };
}
