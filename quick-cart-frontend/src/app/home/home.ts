import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router=inject(Router);

  isAuthenticated = false;
  username = "";

  categories = [
    { name: 'Doomscrolling', tag: 'Classic' },
    { name: "Nap o'clock", tag: 'Cozy' },
    { name: 'Old sitcoms', tag: 'Rewatch' },
    { name: 'Wiki rabbit hole', tag: 'Deep dive' }
  ];

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;

        if (isAuthenticated) {
          this.router.navigateByUrl('/products');
        }
      }
    );
    this.oidcSecurityService.userData$.subscribe(
      ({ userData }) => {
        this.username = userData?.preferred_username ?? '';
      }
    );
  }
  goToProducts(): void {
    this.router.navigateByUrl('/products');
  }
  login(): void {
    this.oidcSecurityService.authorize();
  }
  logout(): void {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result))
  }



}