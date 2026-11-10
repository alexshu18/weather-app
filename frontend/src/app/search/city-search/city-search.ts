import { Component, inject, output, signal } from '@angular/core';
import { Geocoding } from '../../services/geocoding';
import { GeocodingResult } from '../../models/geocoding.model';
import { CityModel } from '../../models/favorite-city.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getHttpError } from '../../shared/http-error';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, map, of, Subject, switchMap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-city-search',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './city-search.html',
  styleUrl: './city-search.scss',
})
export class CitySearch {
  private readonly citySearchService = inject(Geocoding);
  protected readonly cityResults = signal<GeocodingResult[] | undefined>(undefined);
  protected readonly errorMessage = signal<string | null>(null);
  readonly citySelected = output<CityModel>();
  private readonly searchTerms = new Subject<string>();

  constructor() {
    this.searchTerms
      .pipe(
        map((name) => name.trim()),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((name) => {
          this.errorMessage.set(null);
          if (name.length < 2) {
            return of(undefined);
          }
          return this.citySearchService.searchCity(name).pipe(
            map((response) => response.results ?? []),
            catchError((err: HttpErrorResponse) => {
              this.errorMessage.set(getHttpError(err.status));
              return of(undefined);
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((results) => {
        this.cityResults.set(results);
      });
  }

  search(name: string) {
    this.searchTerms.next(name);
  }

  selectCity(city: GeocodingResult) {
    this.citySelected.emit(city);
    this.cityResults.set(undefined);
  }
}
