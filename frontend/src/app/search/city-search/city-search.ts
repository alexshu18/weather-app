import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { Geocoding } from '../../services/geocoding';
import { GeocodingResult } from '../../models/geocoding.model';
import { CityModel } from '../../models/favorite-city.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getHttpError } from '../../shared/http-error';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-city-search',
  imports: [],
  templateUrl: './city-search.html',
  styleUrl: './city-search.scss',
})
export class CitySearch {
  private readonly citySearchService = inject(Geocoding);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly cityResults = signal<GeocodingResult[] | undefined>(undefined);
  protected readonly errorMessage = signal<string | null>(null);
  readonly citySelected = output<CityModel>();

  search(name: string) {
    if (name.trim() === '') {
      return;
    }
    this.citySearchService
      .searchCity(name.trim())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.errorMessage.set(null);
          this.cityResults.set(response.results ?? []);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(getHttpError(err.status));
          console.error(err);
        },
      });
  }

  selectCity(city: GeocodingResult) {
    this.citySelected.emit(city);
    this.cityResults.set(undefined);
  }

  protected readonly name = name;
}
