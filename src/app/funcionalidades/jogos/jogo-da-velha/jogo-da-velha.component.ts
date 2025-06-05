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
  tamanho = 9;
  opcoesQuadrados = [9, 16, 25, 36, 49, 64];

  jogoIniciado = false;
  tabuleiro: string[] = [];
  jogadorAtual = 'O';
  lado = 3;
  vencedor: string | null = null;

  // Getter para acessar Math no template HTML
  get Math() {
    return Math;
  }

  iniciarJogo() {
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
      return;
    }

    if (this.tabuleiro.every(cell => cell !== '')) {
      this.vencedor = 'Empate';
      return;
    }

    this.jogadorAtual = this.jogadorAtual === 'O' ? 'X' : 'O';

    if (this.modoJogo === 'bot' && this.jogadorAtual === 'X') {
      this.jogadaBot();
    }
  }

  jogadaBot() {
    const casasVazias = this.tabuleiro
      .map((v, i) => (v === '' ? i : -1))
      .filter(i => i !== -1);

    if (casasVazias.length === 0 || this.vencedor) return;

    const aleatorio = casasVazias[Math.floor(Math.random() * casasVazias.length)];
    setTimeout(() => this.jogar(aleatorio), 400);
  }

  verificarVencedor(): boolean {
    const linhas = [];

    // Linhas horizontais
    for (let i = 0; i < this.tamanho; i += this.lado) {
      linhas.push(this.tabuleiro.slice(i, i + this.lado));
    }

    // Colunas verticais
    for (let i = 0; i < this.lado; i++) {
      linhas.push(this.tabuleiro.filter((_, index) => index % this.lado === i));
    }

    // Diagonais
    linhas.push(this.tabuleiro.filter((_, index) => index % (this.lado + 1) === 0));
    linhas.push(this.tabuleiro.filter((_, index) => index % (this.lado - 1) === 0 && index !== 0 && index !== this.tamanho - 1));

    return linhas.some(linha => linha.every(cell => cell === this.jogadorAtual));
  }

  reiniciar() {
    this.jogoIniciado = false;
    this.tabuleiro = [];
    this.vencedor = null;
    this.jogador1 = '';
    this.jogador2 = '';
    this.tamanho = 9;
    this.modoJogo = 'pvp';
  }
}
