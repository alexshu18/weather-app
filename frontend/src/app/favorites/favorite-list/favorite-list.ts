import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { FavoriteCity } from '../../services/favorite-city';
import { CityModel, FavoriteCityModel } from '../../models/favorite-city.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { getHttpError } from '../../shared/http-error';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-list',
  imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss',
})
export class FavoriteList {
  protected readonly favoriteCityService = inject(FavoriteCity);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly errorMessage = signal<string | null>(null);
  private readonly router = inject(Router);

  protected openCity(city: FavoriteCityModel) {
    this.router.navigate(['/weather'], {
      queryParams: {
        name: city.name,
        country: city.country,
        lat: city.latitude,
        lon: city.longitude,
      },
    });
  }

  deleteCity(id: number, event: Event) {
    event.stopPropagation();
    this.favoriteCityService
      .deleteCity(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.errorMessage.set(null),
        error: (err: HttpErrorResponse) => this.errorMessage.set(getHttpError(err.status)),
      });
  }
}
