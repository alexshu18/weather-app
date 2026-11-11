import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { favoritesResolver } from './favorites-resolver';

describe('favoritesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => favoritesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
