/**
 * Representa uma única resposta para uma pergunta.
 */
export interface Resposta {
  texto: string;         // Texto da resposta (ex: "Dom Pedro I")
  correta: boolean;      // Define se essa resposta é a correta
}

/**
 * Representa uma pergunta do quiz com múltiplas opções de resposta.
 */
export interface Pergunta {
  enunciado: string;             // Enunciado da pergunta (ex: "Quem foi o primeiro imperador do Brasil?")
  respostas: Resposta[];         // Lista de 4 respostas possíveis
  respostaCorretaIndex: number;  // Índice da resposta correta no array "respostas"
}

/**
 * Representa um usuário e sua pontuação dentro de um ranking.
 */
export interface UsuarioRanking {
  nome: string;     // Nome do jogador
  pontos: number;   // Pontuação total no jogo
}

/**
 * Representa o ranking de uma categoria específica com os 10 melhores usuários.
 */
export interface RankingCategoria {
  categoria: string;             // Nome da categoria (ex: "História")
  top10: UsuarioRanking[];       // Lista dos 10 melhores usuários
}
