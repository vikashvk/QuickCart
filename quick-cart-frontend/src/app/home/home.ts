import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit,AfterViewInit, OnDestroy {

    private readonly oidcSecurityService = inject(OidcSecurityService);
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
      ({isAuthenticated}) => {
        this.isAuthenticated = isAuthenticated;
      } 
    )
    this.oidcSecurityService.userData$.subscribe(
      ({ userData }) => {
        this.username = userData.preferred_username;
      }
    );
  }
   login(): void {
    this.oidcSecurityService.authorize();
  }
  logout(): void {
    this.oidcSecurityService
    .logoff()
    .subscribe((result)=>console.log(result))
  }
  
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