# Weather App

Full-stack weather app built with **Angular** and **Spring Boot**.
The frontend shows current weather from the [Open-Meteo](https://open-meteo.com/) API; the backend (in progress) stores favourite cities.

## Tech stack

- **Frontend:** Angular (standalone components), TypeScript, RxJS, signals, SCSS
- **Backend:** Java, Spring Boot, Spring Data JPA, H2 *(in progress)*
- **Data:** Open-Meteo Forecast API (no API key required)

## Project structure

```
frontend/   Angular application
backend/    Spring Boot REST API (in progress)
```

## How to run

### Frontend

Requirements: Node.js LTS, Angular CLI.

```bash
cd frontend
npm install
ng serve
```

Open http://localhost:4200, the app redirects to `/weather`.

### Backend

Coming soon.

## Status

Work in progress. Features are developed in branches and merged via pull requests with code review.

### Done
- [x] Angular app with standalone components
- [x] Weather service with HttpClient, typed response models, query params
- [x] API URL in environment configs (dev / prod)
- [x] Lazy-loaded routing (`loadChildren`) with redirect from `/`
- [x] Data loading via RxJS `subscribe` with `takeUntilDestroyed`, signals for UI state
- [x] Loading and error states, error messages based on HTTP status

### In progress
- [ ] Spring Boot REST API for favourite cities (Spring Data JPA, H2)
- [ ] CORS setup and Angular service for favourites

### Planned
- [ ] City search with autocomplete (debounceTime, switchMap)
- [ ] Multi-day forecast
- [ ] Unit tests
- [ ] CI with GitHub Actions

## Data source

Weather data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0).
