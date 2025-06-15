import { Component, HostListener, AfterViewInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {
  temaAtual: 'claro' | 'escuro' = 'claro';
  hideHeader = false;
  private lastScrollTop = 0;

  constructor(private router: Router) {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
      this.temaAtual = 'escuro';
      document.body.classList.add('tema-escuro');
    }
  }

  ngAfterViewInit(): void {
    ScrollTrigger.create({
      start: 'top top',
      end: 99999,
      onUpdate: self => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const direction = scrollTop > this.lastScrollTop ? 'down' : 'up';

        if (direction === 'down' && scrollTop > 100) {
          this.hideHeader = true;
        } else if (direction === 'up') {
          this.hideHeader = false;
        }

        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      }
    });
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
