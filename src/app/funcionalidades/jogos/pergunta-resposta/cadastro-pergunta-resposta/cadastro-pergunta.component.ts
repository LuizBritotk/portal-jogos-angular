import { Component, OnInit } from '@angular/core';
import { PerguntaService } from '../servico/pergunta.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pergunta } from '../modelo/pergunta.model';

@Component({
  selector: 'app-cadastro-pergunta',
  templateUrl: './cadastro-pergunta.component.html',
  styleUrls: ['./cadastro-pergunta.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CadastroPerguntaComponent implements OnInit {
  categorias: string[] = []; // Lista de categorias disponíveis
  categoriaSelecionada: string = ''; // Categoria atualmente selecionada pelo usuário

  // Objeto que representa a nova pergunta a ser cadastrada
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

  ngOnInit(): void {
    // Carrega as categorias disponíveis ao iniciar o componente
    this.categorias = this.perguntaService.obterCategorias();
  }

  /**
   * Salva a nova pergunta no Firebase.
   * Atualiza a resposta correta com base no índice selecionado.
   * Gera alerta de sucesso e limpa o formulário.
   */
  salvarPergunta(): void {
    if (!this.categoriaSelecionada) {
      alert('Selecione uma categoria para a pergunta.');
      return;
    }

    // Atualiza qual resposta é correta com base no índice
    this.novaPergunta.respostas = this.novaPergunta.respostas.map((resposta, index) => ({
      ...resposta,
      correta: index === this.novaPergunta.respostaCorretaIndex
    }));

    // Envia para o serviço
    this.perguntaService.adicionarPergunta(this.categoriaSelecionada, this.novaPergunta).then(() => {
      alert('Pergunta salva com sucesso!');
      this.resetarFormulario();
    });
  }

  /**
   * Limpa os campos do formulário para novo cadastro.
   */
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
    this.categoriaSelecionada = '';
  }
}
