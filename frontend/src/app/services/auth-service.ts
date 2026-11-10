import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest, UserResponse } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { TokenStorage } from './token-storage';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = `${environment.backendApiUrl}/auth`;
  private readonly tokenStorage = inject(TokenStorage);
  private readonly token = signal<string | null>(this.tokenStorage.get());
  readonly isLoggedIn = computed(() => this.token() !== null);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, request)
      .pipe(tap((response) => this.saveToken(response.accessToken)));
  }

  register(request: RegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/register`, request);
  }

  getToken(): string | null {
    return this.token();
  }

  logout() {
    this.tokenStorage.clear();
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  me(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/me`);
  }

  private saveToken(accessToken: string) {
    this.tokenStorage.set(accessToken);
    this.token.set(accessToken);
  }
}
