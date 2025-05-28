import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {
  titulo = 'Portal de Jogos';

  constructor(private router: Router) {}

  isHomeRoute(): boolean {
    return this.router.url === '/inicio' || this.router.url === '/';

  }
}
