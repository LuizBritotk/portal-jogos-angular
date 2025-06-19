import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-pergunta-resposta',
  standalone: true,
  templateUrl: './inicio-pergunta-resposta.component.html',
  styleUrls: ['./inicio-pergunta-resposta.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class InicioPerguntaRespostaComponent implements OnInit {
  form!: FormGroup;

  categorias: string[] = [
    'Tecnologia',
    'História',
    'Geografia',
    'Ciência',
    'Esportes',
    'Entretenimento'
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  iniciarJogo(): void {
    if (this.form.valid) {
      const nome = this.form.value.nome.trim();
      const categoria = this.form.value.categoria;

      localStorage.setItem('quiz_nome', nome);
      localStorage.setItem('quiz_categoria', categoria);

      this.router.navigate(['/jogos/pergunta-resposta/iniciar']);
    }
  }
}
