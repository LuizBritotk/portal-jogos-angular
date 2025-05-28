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
        loadChildren: () =>
          import('./funcionalidades/jogos/jogos.component').then(m => m.JogosComponent)
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
