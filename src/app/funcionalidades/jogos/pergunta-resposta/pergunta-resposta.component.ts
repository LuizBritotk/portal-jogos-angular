import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerguntaService } from './servico/pergunta.service';
import { Pergunta, RankingCategoria } from './modelo/pergunta.model';



@Component({
  selector: 'app-pergunta-resposta',
  templateUrl: './pergunta-resposta.component.html',
    imports: [CommonModule],
  styleUrls: ['./pergunta-resposta.component.scss']
})
export class PerguntaRespostaComponent implements OnInit {
  categorias = ['História', 'Ciência', 'Tecnologia'];

  jogoIniciado = false;
  jogoFinalizado = false;

  perguntas: Pergunta[] = [];
  perguntaAtual = 0;
  respostaSelecionada: number | null = null;
  respostasUsuario: number[] = [];

  rankingsPorCategoria: RankingCategoria[] = [
    {
      categoria: 'História',
      top10: [
        { nome: 'Ana', pontos: 85 },
        { nome: 'Carlos', pontos: 70 },
        { nome: 'João', pontos: 60 },
      ]
    },
    {
      categoria: 'Ciência',
      top10: [
        { nome: 'Mariana', pontos: 90 },
        { nome: 'Lucas', pontos: 75 },
        { nome: 'Pedro', pontos: 65 },
      ]
    },
    {
      categoria: 'Tecnologia',
      top10: [
        { nome: 'Camila', pontos: 95 },
        { nome: 'Felipe', pontos: 80 },
        { nome: 'Rafael', pontos: 70 },
      ]
    }
  ];

  rankingGeral: RankingCategoria = {
    categoria: 'Geral',
    top10: [
      { nome: 'Camila', pontos: 270 },
      { nome: 'Mariana', pontos: 250 },
      { nome: 'Ana', pontos: 230 },
      { nome: 'Lucas', pontos: 220 },
      { nome: 'Carlos', pontos: 210 }
    ]
  };

  constructor() {}

  ngOnInit(): void {}

  iniciarJogo(categoria: string): void {
    this.jogoIniciado = true;
    this.jogoFinalizado = false;
    this.perguntaAtual = 0;
    this.respostaSelecionada = null;
    this.respostasUsuario = [];

    this.carregarPerguntas(categoria);
  }

  carregarPerguntas(categoria: string): void {
    // Mock simples para 10 perguntas de acordo com categoria
    this.perguntas = [];

    for (let i = 1; i <= 10; i++) {
      this.perguntas.push({
        enunciado: `Pergunta ${i} de ${categoria}`,
        respostas: [
          { texto: 'Resposta A', correta: i % 4 === 1 },
          { texto: 'Resposta B', correta: i % 4 === 2 },
          { texto: 'Resposta C', correta: i % 4 === 3 },
          { texto: 'Resposta D', correta: i % 4 === 0 }
        ],
        respostaCorretaIndex: (i % 4) - 1 >= 0 ? (i % 4) - 1 : 3
      });
    }
  }

  selecionarResposta(i: number): void {
    this.respostaSelecionada = i;
  }

  proximaPergunta(): void {
    if (this.respostaSelecionada === null) return;

    this.respostasUsuario[this.perguntaAtual] = this.respostaSelecionada;
    this.respostaSelecionada = null;

    if (this.perguntaAtual + 1 < this.perguntas.length) {
      this.perguntaAtual++;
    } else {
      this.finalizarJogo();
    }
  }

  finalizarJogo(): void {
    this.jogoFinalizado = true;
  }

  reiniciarJogo(): void {
    this.jogoIniciado = false;
    this.jogoFinalizado = false;
    this.perguntaAtual = 0;
    this.respostaSelecionada = null;
    this.respostasUsuario = [];
  }
}
