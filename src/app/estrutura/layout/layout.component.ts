import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  temaAtual: 'claro' | 'escuro' = 'claro';

  constructor(private router: Router) {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
      this.temaAtual = 'escuro';
      document.body.classList.add('tema-escuro');
    }
  }

  isHomeRoute(): boolean {
    return this.router.url === '/inicio' || this.router.url === '/';
  }

  toggleTema() {
    this.temaAtual = this.temaAtual === 'claro' ? 'escuro' : 'claro';
    document.body.classList.remove('tema-claro', 'tema-escuro');
    document.body.classList.add(`tema-${this.temaAtual}`);
  }
}
