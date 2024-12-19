import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface MinValueTextFieldProps extends Omit<TextFieldProps, "onChange"> {
  minValue?: number;
  value: number;
  onChange: (value: number) => void;
}

const InputMoney: React.FC<MinValueTextFieldProps> = ({
  minValue = 0,
  value,
  onChange,
  ...props
}) => {
  // Formata o valor para BRL
  const formatToBRL = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  // Remove a formatação para obter o número
  const parseBRLToNumber = (value: string): number => {
    const numericValue = value.replace(/[^\d,-]/g, "").replace(",", ".");
    return parseFloat(numericValue) || 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseBRLToNumber(inputValue);
    const newValue = numericValue < minValue ? minValue : numericValue;
    onChange(newValue);
  };

  return (
    <TextField
      {...props}
      value={formatToBRL(value)} // Exibe o valor formatado
      onChange={handleChange}
    />
  );
};

export default InputMoney;
