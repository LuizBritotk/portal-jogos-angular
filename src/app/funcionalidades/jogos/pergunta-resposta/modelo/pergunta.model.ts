export interface Resposta {
  texto: string;
  correta: boolean;
}

export interface Pergunta {
  enunciado: string;
  respostas: Resposta[];
  respostaCorretaIndex: number;
}

export interface UsuarioRanking {
  nome: string;
  pontos: number;
}

export interface RankingCategoria {
  categoria: string;
  top10: UsuarioRanking[];
}
