export type IntegracaoMarketingPlace = {
    id?: string; // ID único do marketplace
    nome?: string; // Nome do marketplace
    loja?: string; // Nome da loja associada
    cnpjOuCpf?: string; // Pode ser opcional
    razaoSocial?: string;
    inscricaoEstadual?: string;
    nomeMarketplace:string;
    nomeLoja:string;
  };
  
  export type Anuncio = {
    id: string;
    nomeMarketplace: string;
    nomeLoja: string;
  };
  