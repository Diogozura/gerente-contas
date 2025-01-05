export const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o nono e o décimo dígitos
  };
  
  export const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos primeiros dois dígitos
      .replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um hífen entre o quinto e o sexto dígitos
  };
  export const maskCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{2})(\d)/, '$1.$2') // Coloca um ponto entre o segundo e o terceiro dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o quinto e o sexto dígitos
      .replace(/(\d{3})(\d)/, '$1/$2') // Coloca uma barra entre o oitavo e o nono dígitos
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o décimo terceiro e o décimo quarto dígitos
  };

  /**
 * Remove todas as máscaras de um valor.
 * @param value - O valor mascarado.
 * @returns O valor sem nenhuma máscara.
 */
export const removeMask = (value: string): string => {
  return value.replace(/\D/g, ''); // Remove caracteres não numéricos
};

  /**
  *Aplica máscara de moeda no formato BRL (R$ X.XXX,XX).
  * @param value - O valor a ser mascarado.
  * @returns O valor formatado como moeda brasileira.
  */
export const maskCurrencyBRL = (value: string | number): string => {
  // Converte o valor para string, remove caracteres não numéricos e formata para BRL
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/\D/g, '')) : value;
  
  if (isNaN(numericValue)) return 'R$ 0,00';

  return numericValue
    .toFixed(2) // Garante duas casas decimais
    .replace(/\D/g, '') // Remove caracteres não numéricos (se necessário)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') // Adiciona pontos para milhares
    .replace('.', ','); // Substitui o ponto por vírgula no final
};

/**
 * Remove máscara de moeda e retorna o valor numérico.
 * @param value - O valor mascarado como moeda.
 * @returns O valor numérico sem formatação.
 */
export const removeCurrencyMask = (value: string): number => {
  const numericValue = value.replace(/[^\d,.-]/g, '').replace(',', '.');
  return parseFloat(numericValue) || 0;
};