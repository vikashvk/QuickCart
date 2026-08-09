import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { TimeCredit } from '../../core/models/models';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, AfterViewInit, OnDestroy {

  @Input() credit: TimeCredit | null = null;
  @Input() cartCount = 0;
  @Input() userName = 'Guest';
  @Output() cartClick = new EventEmitter<void>();

  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  isAuthenticated = false;
  username = '';

  ngOnInit(): void {

    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {

        this.isAuthenticated = isAuthenticated;

        console.log('Authenticated:', isAuthenticated);

        if (isAuthenticated) {
          this.router.navigateByUrl('/products');
        }

      }
    );
    this.oidcSecurityService.userData$.subscribe(
      ({ userData }) => {

        this.username =
          userData?.preferred_username ??
          userData?.name ??
          '';
      }
    );
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {

    this.oidcSecurityService
      .logoff()
      .subscribe(() => {

        this.isAuthenticated = false;
        this.username = '';

        this.router.navigateByUrl('/');

      });
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  goToProducts(): void {
    this.router.navigateByUrl('/products');
  }

  goToAddProduct(): void {
    this.router.navigateByUrl('/add-product');
  }

  //flip clock UI
  hours = signal('00');
  minutes = signal('00');
  seconds = signal('00');
  currentDay = signal('');

  private timerId: any;

  @ViewChild('hEl') hEl!: ElementRef<HTMLElement>;
  @ViewChild('mEl') mEl!: ElementRef<HTMLElement>;
  @ViewChild('sEl') sEl!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  private tick(): void {
    const now = new Date();
    this.currentDay.set(now.toLocaleDateString('en-US', { weekday: 'long' }));

    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const diff = midnight.getTime() - now.getTime();

    const h = this.pad(Math.floor(diff / 3600000));
    const m = this.pad(Math.floor((diff % 3600000) / 60000));
    const s = this.pad(Math.floor((diff % 60000) / 1000));

    this.flap(this.hEl, this.hours, h);
    this.flap(this.mEl, this.minutes, m);
    this.flap(this.sEl, this.seconds, s);
  }

  private flap(ref: ElementRef<HTMLElement>, sig: ReturnType<typeof signal<string>>, next: string): void {
    if (sig() === next || !ref) return;
    const el = ref.nativeElement;
    el.style.transform = 'rotateX(90deg)';
    setTimeout(() => {
      sig.set(next);
      el.style.transform = 'rotateX(0deg)';
    }, 150);
  }

  private pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

}
