import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl
} from '@angular/forms';
import { PerguntaService } from '../servico/pergunta.service';
import { Pergunta } from '../modelo/pergunta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-pergunta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-pergunta.component.html',
  styleUrls: ['./cadastro-pergunta.component.scss']
})
export class CadastroPerguntaComponent implements OnInit {
  form!: FormGroup;
  categorias: string[] = [
    'Tecnologia',
    'História',
    'Geografia',
    'Ciência',
    'Esportes',
    'Entretenimento'
  ];

  constructor(
    private fb: FormBuilder,
    private perguntaService: PerguntaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      enunciado: ['', Validators.required],
      categoria: ['', Validators.required],
      respostas: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      respostaCorretaIndex: [0, Validators.required]
    });
  }

  get respostas(): FormControl[] {
    return (this.form.get('respostas') as FormArray).controls as FormControl[];
  }

  async salvar(): Promise<void> {
    if (this.form.invalid) return;

    const { enunciado, categoria, respostas, respostaCorretaIndex } = this.form.value;

    const pergunta: Pergunta = {
      enunciado,
      categoria,
      respostas: respostas.map((texto: string, index: number) => ({
        texto,
        correta: index === respostaCorretaIndex
      }))
    };

    await this.perguntaService.adicionarPergunta(pergunta);
    alert('Pergunta cadastrada com sucesso!');

    this.form.reset();
    this.form.patchValue({ respostaCorretaIndex: 0 });
    this.router.navigate(['/jogos/pergunta-resposta/inicio']);
  }

  selecionarRespostaCorreta(index: number): void {
      this.form.patchValue({ respostaCorretaIndex: index });
    }
}
