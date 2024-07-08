export const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? undefined : 'Email inválido';
  };
  
  export const validateCPF = (cpf: string) => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf) ? undefined : 'CPF inválido';
  };
  
  export const validateCNPJ = (cnpj: string) => {
    return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj) ? undefined : 'CNPJ inválido';
  };
  
  export const validatePhone = (phone: string) => {
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(phone) ? undefined : 'Telefone inválido';
  };
  
  export const validatePassword = (password: string) => {
    return password.length >= 6 ? undefined : 'Senha deve ter pelo menos 6 caracteres';
  };
  
  export const validateName = (name: string) => {
    return name.trim().length > 0 ? undefined : 'Nome é obrigatório';
  };
  export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword ? undefined : 'As senhas não são iguais';
  };