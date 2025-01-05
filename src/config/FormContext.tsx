import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FormContextProps {
  formValues: { [key: string]: any };
  setFormValues: (formName: string, values: { [key: string]: any }) => void;
}

interface CurrencyContextProps {
  value: number; // Valor bruto
  formattedValue: string; // Valor formatado
  setValue: (value: number) => void; // Função para atualizar o valor bruto
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Função para lidar com mudanças
}

interface CombinedContextProps extends FormContextProps, CurrencyContextProps {}

const FormContext = createContext<CombinedContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Form Values
  const [formValues, setFormValuesState] = useState<{ [key: string]: any }>({});

  const setFormValues = (formName: string, values: { [key: string]: any }) => {
    setFormValuesState((prevValues) => ({
      ...prevValues,
      [formName]: {
        ...prevValues[formName],
        ...values,
      },
    }));
  };

  // Currency Values
  const [value, setValue] = useState<number>(0); // Estado do valor bruto

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const numericValue = rawValue ? parseFloat(rawValue) / 100 : 0; // Converte para decimal
    setValue(numericValue);
  };

  const formattedValue = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }); // Valor formatado

  return (
    <FormContext.Provider
      value={{
        formValues,
        setFormValues,
        value,
        formattedValue,
        setValue,
        handleChange,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
