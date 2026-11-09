import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private readonly authService = inject(AuthService);
  protected readonly email = signal<string | null>(null);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.authService.me()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.email.set(user.email);
        }
      });
  }

  protected logout() {
    this.authService.logout();
  }
}
