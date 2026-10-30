import { TestBed } from '@angular/core/testing';

import { FavoriteCity } from './favorite-city';

describe('FavoriteCity', () => {
  let service: FavoriteCity;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteCity);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
