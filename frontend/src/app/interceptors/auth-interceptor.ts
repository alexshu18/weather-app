import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const isBackendRequest = req.url.startsWith(environment.backendApiUrl);

  if (token && isBackendRequest) {
    return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          authService.logout();
        }
        return throwError(() => err);
      }),
    );
  }
  return next(req);
};
