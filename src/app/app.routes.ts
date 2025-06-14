import { Routes } from '@angular/router';
import { LayoutComponent } from './estrutura/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadComponent: () =>
          import('./funcionalidades/inicio/paginas/inicio/inicio.component').then(m => m.InicioComponent)
      },
      {
        path: 'jogos',
        loadComponent: () =>
          import('./funcionalidades/jogos/jogos.component').then(m => m.JogosComponent)
      },
      {
        path: 'jogos/jogo-da-velha',
        loadComponent: () =>
          import('./funcionalidades/jogos/jogo-da-velha/jogo-da-velha.component').then(m => m.JogoDaVelhaComponent)
      },
      {
        path: 'jogos/pergunta-resposta',
        loadComponent: () =>
          import('./funcionalidades/jogos/pergunta-resposta/pergunta-resposta.component').then(m => m.PerguntaRespostaComponent)
      },
      {
        path: 'jogos/pergunta-resposta/cadastro',
        loadComponent: () =>
          import('./funcionalidades/jogos/pergunta-resposta/cadastro-pergunta-resposta/cadastro-pergunta.component').then(m => m.CadastroPerguntaComponent)
      },
      {
        path: 'quem-sou-eu',
        loadComponent: () =>
          import('./funcionalidades/quem-sou-eu/quem-sou-eu.component').then(m => m.QuemSouEuComponent)
      },
      {
        path: 'demo',
        loadComponent: () =>
          import('./funcionalidades/demo/demo.component').then(m => m.DemoComponent)
      }
    ]
  }
];
