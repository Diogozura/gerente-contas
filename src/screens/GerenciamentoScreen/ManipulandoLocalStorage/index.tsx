import { v4 as uuidv4 } from "uuid";
import { Anuncio } from "@/types/anuncio";
import { IntegracaoMarketingPlace } from "@/types/IntegracaoMarketingPlace";

const STORAGE_KEY = "integracoesMarketingPlace";
const ANUNCIOS_KEY = "anuncios";

// Recupera as integrações do localStorage
export const getIntegracoes = (): IntegracaoMarketingPlace[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Salva uma nova integração garantindo um ID único
export const saveIntegracao = (novaIntegracao) => {
  const integracoes = getIntegracoes();

  // Se a integração não tiver um ID, cria um novo
  if (!novaIntegracao.id) {
    novaIntegracao.id = uuidv4();
  }

  integracoes.push(novaIntegracao);
  localStorage.setItem("integracoesMarketingPlace", JSON.stringify(integracoes));
};

// Atualiza o nome da loja mantendo os dados
export const updateLojaNome = (id: string, novoNome: string) => {
  const integracoes = getIntegracoes();
  const updated = integracoes.map((int) =>
    int.id === id ? { ...int, loja: novoNome } : int
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// Verifica se existem anúncios vinculados antes de deletar
export const canDeleteIntegracao = (id: string) => {
  const anuncios: Anuncio[] = JSON.parse(localStorage.getItem(ANUNCIOS_KEY) || "[]");
  const anunciosVinculados = anuncios.filter((a) => a.marketplaceId === id);

  return {
    canDelete: anunciosVinculados.length === 0,
    numAnuncios: anunciosVinculados.length,
  };
};

// Deleta uma integração usando apenas o ID
export const deleteIntegracao = (id: string) => {
  const { canDelete, numAnuncios } = canDeleteIntegracao(id);

  if (!canDelete) {
    alert(`Não é possível deletar a loja, pois tem ${numAnuncios} anúncios vinculados.`);
    return false;
  }

  const integracoes = getIntegracoes().filter((int) => int.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(integracoes));
  return true;
};
