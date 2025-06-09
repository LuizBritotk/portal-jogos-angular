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
  nivelBot = 'facil'; // novo campo para nível do bot
  tamanho = 9;
  opcoesQuadrados = [9, 16, 25, 36, 49, 64];

  jogoIniciado = false;
  tabuleiro: string[] = [];
  jogadorAtual = 'O';
  lado = 3;
  vencedor: string | null = null;

  // Saldo de pontos
  pontosJogador1 = 0;
  pontosJogador2 = 0;

  // Getter para acessar Math no template HTML
  get Math() {
    return Math;
  }

  /**
   * Inicia o jogo: configura jogadores, tabuleiro, e reseta variáveis
   */
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

  /**
   * Realiza uma jogada no índice dado, verifica vencedor, alterna jogador, e se for bot faz jogada
   */
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
      this.jogadaBot();
    }
  }

  /**
   * Realiza a jogada do bot de acordo com o nível selecionado (fácil: aleatório, médio: bloqueia, difícil: minimax)
   */
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

  /**
   * Jogada aleatória para nível fácil
   */
  jogadaBotFacil() {
    const casasVazias = this.tabuleiro
      .map((v, i) => (v === '' ? i : -1))
      .filter(i => i !== -1);

    if (casasVazias.length === 0) return;

    const aleatorio = casasVazias[Math.floor(Math.random() * casasVazias.length)];
    this.jogar(aleatorio);
  }

  /**
   * Jogada para nível médio: tenta bloquear vitória do jogador adversário, senão joga aleatório
   */
  jogadaBotMedio() {
    // Tenta bloquear a jogada do jogador 'O' (usuário)
    const bloqueio = this.encontrarJogadaVitoria('O');
    if (bloqueio !== -1) {
      this.jogar(bloqueio);
      return;
    }
    // Se não tem bloqueio, joga aleatório
    this.jogadaBotFacil();
  }

  /**
   * Jogada para nível difícil: utiliza minimax para melhor jogada
   */
  jogadaBotDificil() {
    const melhorMovimento = this.minimax(this.tabuleiro, 'X').indice;
    this.jogar(melhorMovimento);
  }

  /**
   * Atualiza pontos dos jogadores após vitória
   */
  atualizarPontos(vencedor: string) {
    if (vencedor === this.jogador1) {
      this.pontosJogador1++;
    } else if (vencedor === this.jogador2) {
      this.pontosJogador2++;
    }
  }

  /**
   * Verifica se há jogada vencedora para o jogador dado e retorna o índice da jogada, ou -1 se não existir
   */
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

  /**
   * Verifica se o jogador dado venceu no estado atual do tabuleiro sem alterar o estado principal
   */
  verificarVencedorParaJogador(jogador: string): boolean {
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

    return linhas.some(linha => linha.every(cell => cell === jogador));
  }

  /**
   * Função minimax para avaliar todas as jogadas possíveis e retornar a melhor jogada para o bot no nível difícil
   */
  minimax(tabuleiroAtual: string[], jogador: string): { pontuacao: number; indice: number } {
    const jogadorMax = 'X';
    const jogadorMin = 'O';

    const casasVazias = tabuleiroAtual
      .map((v, i) => (v === '' ? i : -1))
      .filter(i => i !== -1);

    if (this.verificarVencedorParaJogadorMinimax(tabuleiroAtual, jogadorMax)) {
      return { pontuacao: 10, indice: -1 };
    } else if (this.verificarVencedorParaJogadorMinimax(tabuleiroAtual, jogadorMin)) {
      return { pontuacao: -10, indice: -1 };
    } else if (casasVazias.length === 0) {
      return { pontuacao: 0, indice: -1 };
    }

    const movimentos: { indice: number; pontuacao: number }[] = [];

    for (const i of casasVazias) {
      const novoTabuleiro = [...tabuleiroAtual];
      novoTabuleiro[i] = jogador;

      const resultado = this.minimax(novoTabuleiro, jogador === jogadorMax ? jogadorMin : jogadorMax);
      movimentos.push({ indice: i, pontuacao: resultado.pontuacao });
    }

    let melhorMovimento;
    if (jogador === jogadorMax) {
      let melhorPontuacao = -Infinity;
      for (const mov of movimentos) {
        if (mov.pontuacao > melhorPontuacao) {
          melhorPontuacao = mov.pontuacao;
          melhorMovimento = mov;
        }
      }
    } else {
      let melhorPontuacao = Infinity;
      for (const mov of movimentos) {
        if (mov.pontuacao < melhorPontuacao) {
          melhorPontuacao = mov.pontuacao;
          melhorMovimento = mov;
        }
      }
    }

    return melhorMovimento!;
  }

  /**
   * Verifica se o jogador dado venceu no tabuleiro passado como parâmetro (usado pelo minimax)
   */
  verificarVencedorParaJogadorMinimax(tabuleiroAtual: string[], jogador: string): boolean {
    const lado = Math.sqrt(tabuleiroAtual.length);
    const tamanho = tabuleiroAtual.length;
    const linhas = [];

    // Linhas horizontais
    for (let i = 0; i < tamanho; i += lado) {
      linhas.push(tabuleiroAtual.slice(i, i + lado));
    }

    // Colunas verticais
    for (let i = 0; i < lado; i++) {
      linhas.push(tabuleiroAtual.filter((_, index) => index % lado === i));
    }

    // Diagonais
    linhas.push(tabuleiroAtual.filter((_, index) => index % (lado + 1) === 0));
    linhas.push(tabuleiroAtual.filter((_, index) => index % (lado - 1) === 0 && index !== 0 && index !== tamanho - 1));

    return linhas.some(linha => linha.every(cell => cell === jogador));
  }

  /**
   * Verifica se o jogador atual venceu no tabuleiro atual
   */
  verificarVencedor(): boolean {
  const winLength = 3; // ou Math.min(3, this.lado); se quiser adaptar para tabuleiros menores
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
        x <= this.lado - winLength &&
        y <= this.lado - winLength &&
        Array.from({ length: winLength }, (_, i) => get(x + i, y + i)).every(cell => cell === simbolo)
      ) return true;

      if (
        x >= winLength - 1 &&
        y <= this.lado - winLength &&
        Array.from({ length: winLength }, (_, i) => get(x - i, y + i)).every(cell => cell === simbolo)
      ) return true;
    }
  }

  return false;
}


  /**
   * Reinicia o jogo, reseta estado e pontos se desejar
   */
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
