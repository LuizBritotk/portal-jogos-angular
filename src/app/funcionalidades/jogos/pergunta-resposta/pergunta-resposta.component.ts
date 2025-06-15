import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerguntaService } from '../pergunta-resposta/servico/pergunta.service';
import { Pergunta, RankingCategoria } from '../pergunta-resposta/modelo/pergunta.model';

@Component({
  selector: 'app-pergunta-resposta',
  templateUrl: './pergunta-resposta.component.html',
  styleUrls: ['./pergunta-resposta.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class PerguntaRespostaComponent implements OnInit {
  categorias: string[] = [];

  jogoIniciado = false;
  jogoFinalizado = false;

  perguntas: Pergunta[] = [];
  perguntaAtual = 0;
  respostaSelecionada: number | null = null;
  respostasUsuario: number[] = [];

  rankingsPorCategoria: RankingCategoria[] = [];
  rankingGeral!: RankingCategoria;

  constructor(private perguntaService: PerguntaService) {}

  ngOnInit(): void {
    this.categorias = this.perguntaService.obterCategorias();

    // Se ranking vier do Firebase (opcional)
    this.perguntaService.obterRankingsPorCategoria().subscribe(rankings => {
      this.rankingsPorCategoria = rankings;
    });

    this.perguntaService.obterRankingGeral().subscribe(ranking => {
      this.rankingGeral = ranking;
    });
  }

  iniciarJogo(categoria: string): void {
    this.jogoIniciado = true;
    this.jogoFinalizado = false;
    this.perguntaAtual = 0;
    this.respostaSelecionada = null;
    this.respostasUsuario = [];

    this.perguntaService.carregarPerguntasPorCategoria(categoria).subscribe(perguntas => {
      this.perguntas = perguntas;
    });
  }

  selecionarResposta(indice: number): void {
    this.respostaSelecionada = indice;
  }

  proximaPergunta(): void {
    if (this.respostaSelecionada === null) return;

    this.respostasUsuario[this.perguntaAtual] = this.respostaSelecionada;
    this.respostaSelecionada = null;

    if (!this.estaNaUltimaPergunta()) {
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

  private estaNaUltimaPergunta(): boolean {
    return this.perguntaAtual + 1 >= this.perguntas.length;
  }
}
