// Definindo a interface para os planos
export interface Plan {
    plano: 'A' | 'B' | 'C';
    valor: string;
    descricao: string | Recurso[];

  }
  interface Recurso {
    descricao: string;
  }
  const recursos: Recurso[] = [
    { descricao: "Conta CNPJ" },
    { descricao: "Integração com marketplaces" },
    { descricao: "Emissão de nota fiscal" },
    { descricao: "Gerenciamento de estoque e full" },
    { descricao: "Criação e importação de anúncios" },
    { descricao: "Calculadora de precificação" },
    { descricao: "Interface de atendimento Mercado Livre" },
    { descricao: "Métricas" },
    { descricao: "Planilhas e relatórios" },
    { descricao: "Suporte" }
  ];
  
  // Criando um array de planos
  export const plans: Plan[] = [
    {
      plano: 'A',
      valor: '79,90',
      descricao: [
        { descricao: 'Plano A - 1 mês de acesso' },
        { descricao: '1 Conta CNPJ' },
        ...recursos
      ],
    },
    {
      plano: 'B',
      valor: '109,90',
      descricao: [
        { descricao: 'Plano A - 1 mês de acesso' },
        { descricao: '2 Conta CNPJ' },
        ...recursos
      ],
    },
    {
      plano: 'C',
      valor: '149,90',
      descricao: [
        { descricao: 'Plano A - 1 mês de acesso' },
        { descricao: '3 Conta CNPJ' },
        ...recursos
      ],
    },
  ];
  