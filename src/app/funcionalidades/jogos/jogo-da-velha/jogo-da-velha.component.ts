import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class JogoDaVelhaComponent {
  jogador1 = '';
  jogador2 = '';
  modoJogo = 'pvp';
  nivelBot = 'facil';
  tamanho = 9;
  opcoesQuadrados = [9, 16, 25, 36, 49, 64];

  exibirModal = false;
  mensagemModal = '';

  jogoIniciado = false;
  tabuleiro: string[] = [];
  jogadorAtual = 'O';
  lado = 3;
  vencedor: string | null = null;

  pontosJogador1 = 0;
  pontosJogador2 = 0;

  get Math() {
    return Math;
  }

  abrirModal(mensagem: string) {
    this.mensagemModal = mensagem;
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
  }

  iniciarJogo() {
    if (!this.jogador1.trim() || (this.modoJogo === 'pvp' && !this.jogador2.trim())) {
      this.abrirModal('Preencha todos os nomes dos jogadores.');
      return;
    }

    if (this.modoJogo === 'bot') {
      this.jogador2 = 'Bot';
    }

    this.lado = Math.sqrt(this.tamanho);
    this.tabuleiro = Array(this.tamanho).fill('');
    this.jogoIniciado = true;
    this.jogadorAtual = 'O';
    this.vencedor = null;

    localStorage.setItem('jogador1', this.jogador1);
    localStorage.setItem('jogador2', this.jogador2);
    localStorage.setItem('tamanho', this.tamanho.toString());
  }

  jogar(index: number) {
    if (this.tabuleiro[index] || this.vencedor) return;

    this.tabuleiro[index] = this.jogadorAtual;

    if (this.verificarVencedor()) {
      this.vencedor = this.jogadorAtual === 'O' ? this.jogador1 : this.jogador2;
      this.atualizarPontos(this.vencedor);
      return;
    }

    if (this.tabuleiro.every(cell => cell !== '')) {
      this.vencedor = 'Empate';
      return;
    }

    this.jogadorAtual = this.jogadorAtual === 'O' ? 'X' : 'O';

    if (this.modoJogo === 'bot' && this.jogadorAtual === 'X') {
      setTimeout(() => this.jogadaBot(), 300);
    }
  }

  jogadaBot() {
    if (this.vencedor) return;

    switch (this.nivelBot) {
      case 'facil':
        this.jogadaBotFacil();
        break;
      case 'medio':
        this.jogadaBotMedio();
        break;
      case 'dificil':
        this.jogadaBotDificil();
        break;
      default:
        this.jogadaBotFacil();
    }
  }

  jogadaBotFacil() {
    const casasVazias = this.tabuleiro
      .map((v, i) => (v === '' ? i : -1))
      .filter(i => i !== -1);

    if (casasVazias.length === 0) return;

    const aleatorio = casasVazias[Math.floor(Math.random() * casasVazias.length)];
    this.jogar(aleatorio);
  }

  jogadaBotMedio() {
    const bloqueio = this.encontrarJogadaVitoria('O');
    if (bloqueio !== -1) {
      this.jogar(bloqueio);
      return;
    }
    this.jogadaBotFacil();
  }

  jogadaBotDificil() {
    const melhorMovimento = this.minimax(this.tabuleiro, 'X').indice;
    this.jogar(melhorMovimento);
  }

  atualizarPontos(vencedor: string) {
    if (vencedor === this.jogador1) this.pontosJogador1++;
    else if (vencedor === this.jogador2) this.pontosJogador2++;
  }

  encontrarJogadaVitoria(jogador: string): number {
    for (let i = 0; i < this.tabuleiro.length; i++) {
      if (this.tabuleiro[i] === '') {
        this.tabuleiro[i] = jogador;
        if (this.verificarVencedorParaJogador(jogador)) {
          this.tabuleiro[i] = '';
          return i;
        }
        this.tabuleiro[i] = '';
      }
    }
    return -1;
  }

  verificarVencedorParaJogador(jogador: string): boolean {
    const linhas = [];
    for (let i = 0; i < this.tamanho; i += this.lado) linhas.push(this.tabuleiro.slice(i, i + this.lado));
    for (let i = 0; i < this.lado; i++) linhas.push(this.tabuleiro.filter((_, index) => index % this.lado === i));
    linhas.push(this.tabuleiro.filter((_, index) => index % (this.lado + 1) === 0));
    linhas.push(this.tabuleiro.filter((_, index) => index % (this.lado - 1) === 0 && index !== 0 && index !== this.tamanho - 1));
    return linhas.some(linha => linha.every(cell => cell === jogador));
  }

  verificarVencedor(): boolean {
    const winLength = 3;
    const simbolo = this.jogadorAtual;
    const get = (x: number, y: number) => this.tabuleiro[y * this.lado + x];

    for (let y = 0; y < this.lado; y++) {
      for (let x = 0; x < this.lado; x++) {
        if (
          x <= this.lado - winLength &&
          Array.from({ length: winLength }, (_, i) => get(x + i, y)).every(cell => cell === simbolo)
        ) return true;

        if (
          y <= this.lado - winLength &&
          Array.from({ length: winLength }, (_, i) => get(x, y + i)).every(cell => cell === simbolo)
        ) return true;

        if (
          x <= this.lado - winLength && y <= this.lado - winLength &&
          Array.from({ length: winLength }, (_, i) => get(x + i, y + i)).every(cell => cell === simbolo)
        ) return true;

        if (
          x >= winLength - 1 && y <= this.lado - winLength &&
          Array.from({ length: winLength }, (_, i) => get(x - i, y + i)).every(cell => cell === simbolo)
        ) return true;
      }
    }

    return false;
  }

  verificarVencedorParaJogadorMinimax(tabuleiroAtual: string[], jogador: string): boolean {
    const lado = Math.sqrt(tabuleiroAtual.length);
    const tamanho = tabuleiroAtual.length;
    const linhas = [];

    for (let i = 0; i < tamanho; i += lado) linhas.push(tabuleiroAtual.slice(i, i + lado));
    for (let i = 0; i < lado; i++) linhas.push(tabuleiroAtual.filter((_, index) => index % lado === i));
    linhas.push(tabuleiroAtual.filter((_, index) => index % (lado + 1) === 0));
    linhas.push(tabuleiroAtual.filter((_, index) => index % (lado - 1) === 0 && index !== 0 && index !== tamanho - 1));

    return linhas.some(linha => linha.every(cell => cell === jogador));
  }

  minimax(tabuleiroAtual: string[], jogador: string): { pontuacao: number; indice: number } {
    const jogadorMax = 'X';
    const jogadorMin = 'O';

    const casasVazias = tabuleiroAtual
      .map((v, i) => (v === '' ? i : -1))
      .filter(i => i !== -1);

    if (this.verificarVencedorParaJogadorMinimax(tabuleiroAtual, jogadorMax)) return { pontuacao: 10, indice: -1 };
    if (this.verificarVencedorParaJogadorMinimax(tabuleiroAtual, jogadorMin)) return { pontuacao: -10, indice: -1 };
    if (casasVazias.length === 0) return { pontuacao: 0, indice: -1 };

    const movimentos = casasVazias.map(i => {
      const novoTabuleiro = [...tabuleiroAtual];
      novoTabuleiro[i] = jogador;
      const resultado = this.minimax(novoTabuleiro, jogador === jogadorMax ? jogadorMin : jogadorMax);
      return { indice: i, pontuacao: resultado.pontuacao };
    });

    return jogador === jogadorMax
      ? movimentos.reduce((a, b) => (b.pontuacao > a.pontuacao ? b : a))
      : movimentos.reduce((a, b) => (b.pontuacao < a.pontuacao ? b : a));
  }

  reiniciar() {
    this.jogoIniciado = false;
    this.tabuleiro = [];
    this.vencedor = null;
    this.jogador1 = '';
    this.jogador2 = '';
    this.tamanho = 9;
    this.modoJogo = 'pvp';
    this.nivelBot = 'facil';
    this.pontosJogador1 = 0;
    this.pontosJogador2 = 0;
  }
}
