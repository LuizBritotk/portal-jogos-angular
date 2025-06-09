import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SafeHtmlPipe } from '../../compartilhado/pipes/safe-html.pipe';

interface Jogo {
  nome: string;
  descricao: string;
  svg: string;
  rota: string;
}

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.scss']
})
export class JogosComponent {
  constructor(private router: Router) {}

  irParaJogo(rota: string) {
    this.router.navigate([rota]);
  }

  jogos: Jogo[] = [
    {
      nome: 'Jogo da Velha',
      descricao: 'Clássico jogo da velha para dois jogadores.',
      rota: 'jogos/jogo-da-velha',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <rect width="100" height="100" fill="var(--cor-fundo-secundario)" rx="12" ry="12"/>
              <line x1="33" y1="5" x2="33" y2="95" stroke="var(--cor-primaria)" stroke-width="5" stroke-linecap="round"/>
              <line x1="67" y1="5" x2="67" y2="95" stroke="var(--cor-primaria)" stroke-width="5" stroke-linecap="round"/>
              <line x1="5" y1="33" x2="95" y2="33" stroke="var(--cor-primaria)" stroke-width="5" stroke-linecap="round"/>
              <line x1="5" y1="67" x2="95" y2="67" stroke="var(--cor-primaria)" stroke-width="5" stroke-linecap="round"/>
            </svg>
            `
    },
    {
      nome: 'Jogo de Pergunta e Resposta',
      descricao: 'Teste seus conhecimentos com perguntas rápidas.',
      rota: 'jogos/pergunta-resposta',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <rect width="100" height="100" fill="var(--cor-fundo-secundario)" rx="12" ry="12"/>
              <circle cx="50" cy="40" r="25" fill="var(--cor-primaria)" />
              <text x="50" y="48" text-anchor="middle" fill="var(--cor-texto-claro)" font-size="32" font-family="Arial" font-weight="700" dominant-baseline="middle">?</text>
              <rect x="40" y="70" width="20" height="12" rx="5" ry="5" fill="var(--cor-primaria)" />
            </svg>
            `
    }
  ];
}
