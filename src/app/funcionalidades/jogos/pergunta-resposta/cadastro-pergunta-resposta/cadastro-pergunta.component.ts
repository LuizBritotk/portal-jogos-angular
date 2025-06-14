
import { Component } from '@angular/core';
import { PerguntaService } from '../servico/pergunta.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pergunta } from '../modelo/pergunta.model';

@Component({
  selector: 'app-cadastro-pergunta',
  templateUrl: './cadastro-pergunta.component.html',
  imports: [FormsModule, CommonModule],
   standalone: true,
  styleUrls: ['./cadastro-pergunta.component.scss']
})
export class CadastroPerguntaComponent {
  novaPergunta: Pergunta = {
    enunciado: '',
    respostas: [
      { texto: '', correta: false },
      { texto: '', correta: false },
      { texto: '', correta: false },
      { texto: '', correta: false }
    ],
    respostaCorretaIndex: 0
  };

  constructor(private perguntaService: PerguntaService) {}

  salvarPergunta(): void {
    // Atualiza o campo "correta" com base na respostaCorretaIndex
    this.novaPergunta.respostas = this.novaPergunta.respostas.map((r, i) => ({
      ...r,
      correta: i === this.novaPergunta.respostaCorretaIndex
    }));

    this.perguntaService.adicionarPergunta(this.novaPergunta).then(() => {
      alert('Pergunta salva com sucesso!');
      this.resetarFormulario();
    });
  }

  resetarFormulario(): void {
    this.novaPergunta = {
      enunciado: '',
      respostas: [
        { texto: '', correta: false },
        { texto: '', correta: false },
        { texto: '', correta: false },
        { texto: '', correta: false }
      ],
      respostaCorretaIndex: 0
    };
  }
}
