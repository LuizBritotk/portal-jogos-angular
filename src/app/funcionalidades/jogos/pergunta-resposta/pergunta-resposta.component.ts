import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pergunta {
  id: number;
  texto: string;
  respostas: string[];
  correta: number;
  selecao: number | null;
}

@Component({
  selector: 'app-pergunta-resposta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pergunta-resposta.component.html',
  styleUrls: ['./pergunta-resposta.component.scss'],
})
export class PerguntaRespostaComponent {
  perguntas: Pergunta[] = [
    {
      id: 1,
      texto: 'Qual é a capital do Brasil?',
      respostas: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
      correta: 2,
      selecao: null,
    },
    {
      id: 2,
      texto: 'Quem pintou a Mona Lisa?',
      respostas: ['Vincent Van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
      correta: 2,
      selecao: null,
    },
    {
      id: 3,
      texto: 'Quanto é 9 × 7?',
      respostas: ['63', '72', '56', '49'],
      correta: 0,
      selecao: null,
    },
  ];

  indiceAtual = 0;
  mostrarResultados = false;

  // Getters para contagem do resultado final
  get quantidadeCorretas(): number {
    return this.perguntas.filter(p => p.selecao === p.correta).length;
  }

  get quantidadeErradas(): number {
    return this.perguntas.filter(p => p.selecao !== null && p.selecao !== p.correta).length;
  }

  get quantidadeNaoRespondidas(): number {
    return this.perguntas.filter(p => p.selecao === null).length;
  }

  // Registra a resposta selecionada
  selecionarResposta(indiceResposta: number): void {
    this.perguntas[this.indiceAtual].selecao = indiceResposta;
  }

  // Avança para próxima pergunta ou finaliza o quiz
  proximaPergunta(): void {
    if (this.perguntas[this.indiceAtual].selecao === null) {
      // Opcional: mostrar alerta ou feedback ao usuário
      return; // evita avançar sem seleção
    }

    if (this.indiceAtual < this.perguntas.length - 1) {
      this.indiceAtual++;
    } else {
      this.mostrarResultados = true;
    }
  }

  // Reinicia o quiz zerando dados
  reiniciarQuiz(): void {
    this.indiceAtual = 0;
    this.mostrarResultados = false;
    this.perguntas.forEach(p => (p.selecao = null));
  }
}
