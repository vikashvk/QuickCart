import { Component, signal,inject,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Header } from './pages/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('quick-cart-frontend');
    private readonly oidcSecurityService = inject(OidcSecurityService);

    ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({isAuthenticated}) => {
        console.log('app authenticated', isAuthenticated);
      })
  }
}
