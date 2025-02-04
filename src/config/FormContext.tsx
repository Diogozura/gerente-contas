import React, { createContext, useState, useContext, ReactNode } from 'react';

// Tipos para valores do formulário
interface FormContextProps {
  formValues: Record<string, Record<string, any>>; // Estrutura do tipo { formName: { key: value } }
  setFormValues: (formName: string, values: Record<string, any>) => void; // Atualiza valores do formulário
  resetFormValues:()=> void;
}

// Tipos para valores monetários
interface CurrencyContextProps {
  value: number; // Valor bruto
  formattedValue: string; // Valor formatado
  setValue: (value: number) => void; // Atualiza valor bruto
  handleCurrencyChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Lida com mudanças no campo
}

// Combina os dois contextos
type CombinedContextProps = FormContextProps & CurrencyContextProps;

// Criação do Contexto
const FormContext = createContext<CombinedContextProps | undefined>(undefined);

// Hook para usar o contexto
export const useFormContext = (): CombinedContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

// Provedor do Contexto
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado dos valores do formulário
  const [formValues, setFormValuesState] = useState<Record<string, Record<string, any>>>({});

  const setFormValues = (formName: string, values: Record<string, any>) => {
    setFormValuesState((prev) => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        ...values,
      },
    }));
  };
  const resetFormValues = () => {
    setFormValuesState({}); // Limpa todos os formulários
  };
  // Estado dos valores monetários
  const [value, setValue] = useState<number>(0);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const numericValue = rawValue ? parseFloat(rawValue) / 100 : 0; // Converte para decimal
    setValue(numericValue);
  };

  const formattedValue = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Provedor
  return (
    <FormContext.Provider
      value={{
        formValues,
        setFormValues,
        resetFormValues,
        value,
        formattedValue,
        setValue,
        handleCurrencyChange,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
