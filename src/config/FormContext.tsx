import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FormContextProps {
  formValues: {
    email: string;
    name: string;
  };
  setFormValues: React.Dispatch<React.SetStateAction<{
    email: string;
    name: string;
  }>>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    name: '',
  });

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
};
