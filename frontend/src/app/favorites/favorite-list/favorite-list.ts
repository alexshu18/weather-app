import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FavoriteCity } from '../../services/favorite-city';
import { FavoriteCityModel } from '../../models/favorite-city.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { getHttpError } from '../../shared/http-error';

@Component({
  selector: 'app-favorite-list',
  imports: [],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss',
})
export class FavoriteList implements OnInit {
  private readonly favoriteCityService = inject(FavoriteCity);
  protected readonly favoriteCities = signal<FavoriteCityModel[]>([]);
  protected readonly errorMessage = signal<string | null>(null);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.favoriteCityService
      .getAllCities()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.favoriteCities.set(data);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(getHttpError(err.status));
          console.error(err);
        },
      });
  }

  deleteCity(id: number) {
    this.favoriteCityService
      .deleteCity(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.errorMessage.set(null);
          this.favoriteCities.update((cities) => cities.filter((city) => city.id !== id));
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(getHttpError(err.status));
          console.error(err);
        },
      });
  }
}
