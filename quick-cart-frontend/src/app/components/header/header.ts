import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { TimeCredit } from '../../core/models/models';
import { CreditRing } from '../credit-ring/credit-ring';
import { CountdownComponent } from '../countdown/countdown';

@Component({
  selector: 'app-header',
  imports: [CommonModule,CreditRing,CountdownComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  @Input() credit: TimeCredit | null = null;
  @Input() cartCount = 0;
  @Input() userName = 'Guest';
  @Output() cartClick = new EventEmitter<void>();
}
  // private readonly oidcSecurityService = inject(OidcSecurityService);
  // private readonly router = inject(Router);

  // isAuthenticated = false;
  // username = '';

  // ngOnInit(): void {

  //   this.oidcSecurityService.isAuthenticated$.subscribe(
  //     ({ isAuthenticated }) => {

  //       this.isAuthenticated = isAuthenticated;

  //       console.log('Authenticated:', isAuthenticated);

  //       if (isAuthenticated) {
  //         this.router.navigateByUrl('/products');
  //       }

  //     }
  //   );
  //   this.oidcSecurityService.userData$.subscribe(
  //     ({ userData }) => {

  //       this.username =
  //         userData?.preferred_username ??
  //         userData?.name ??
  //         '';
  //     }
  //   );
  // }

  // login(): void {
  //   this.oidcSecurityService.authorize();
  // }

  // logout(): void {

  //   this.oidcSecurityService
  //     .logoff()
  //     .subscribe(() => {

  //       this.isAuthenticated = false;
  //       this.username = '';

  //       this.router.navigateByUrl('/');

  //     });
  // }

  // goHome(): void {
  //   this.router.navigateByUrl('/');
  // }

  // goToProducts(): void {
  //   this.router.navigateByUrl('/products');
  // }

  // goToAddProduct(): void {
  //   this.router.navigateByUrl('/add-product');
  // }
