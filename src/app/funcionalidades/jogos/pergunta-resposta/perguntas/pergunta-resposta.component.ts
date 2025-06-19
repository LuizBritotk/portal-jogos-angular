import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Pergunta, Resposta } from '../modelo/pergunta.model';
import { PerguntaService } from '../servico/pergunta.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pergunta-resposta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pergunta-resposta.component.html',
  styleUrls: ['./pergunta-resposta.component.scss']
})
export class PerguntaRespostaComponent implements OnInit {
  nomeUsuario = '';
  categoriaSelecionada = '';
  perguntas: Pergunta[] = [];
  perguntaAtualIndex = 0;
  respostaSelecionada: number | null = null;
  respostasUsuario: number[] = [];
  jogoFinalizado = false;
  carregando = true;

  constructor(
    private perguntaService: PerguntaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nome = localStorage.getItem('quiz_nome');
    const categoria = localStorage.getItem('quiz_categoria');

    if (!nome || !categoria) {
      this.router.navigate(['/jogos/pergunta-resposta/inicio']);
      return;
    }

    this.nomeUsuario = nome;
    this.categoriaSelecionada = categoria;

    this.perguntaService.listarPerguntasPorCategoria(categoria).subscribe({
      next: (perguntas) => {
        this.perguntas = perguntas;
        this.carregando = false;

        if (!this.perguntas.length) {
              this.carregando = false;
            }
      },
      error: (err) => {
        console.error('Erro ao carregar perguntas:', err);
        this.router.navigate(['/jogos/pergunta-resposta/inicio']);
      }
    });
  }

  selecionarResposta(index: number): void {
    this.respostaSelecionada = index;
  }

  irParaCadastro(): void {
    this.router.navigate(['/jogos/pergunta-resposta/cadastro']);
  }

  proximaPergunta(): void {
    if (this.respostaSelecionada !== null) {
      this.respostasUsuario.push(this.respostaSelecionada);
      this.respostaSelecionada = null;

      if (this.perguntaAtualIndex + 1 < this.perguntas.length) {
        this.perguntaAtualIndex++;
      } else {
        this.jogoFinalizado = true;
      }
    }
  }

  reiniciar(): void {
    this.router.navigate(['/jogos/pergunta-resposta/inicio']);
  }

  get perguntaAtual(): Pergunta | null {
    return this.perguntas.length > 0 ? this.perguntas[this.perguntaAtualIndex] : null;
  }
}
