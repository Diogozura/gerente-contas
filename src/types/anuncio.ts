import { ProdutoDetail } from "./produtoDetail";

export interface Anuncio {
  marketingPlaces: string[];
  produto: ProdutoDetail[];
  slug: string;
  titulo: string;
  marketplaceId:string;
  loja:string;
}