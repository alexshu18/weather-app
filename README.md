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

Requirements: JDK 21.

```bash
cd backend
./mvnw spring-boot:run
```

API runs on http://localhost:8080/api/favorites.
Data is stored in an in-memory H2 database and is reset on restart.

## Status

Work in progress. Features are developed in branches and merged via pull requests with code review.

### Done
- [x] Angular app with standalone components
- [x] Weather service with HttpClient, typed response models, query params
- [x] API URL in environment configs (dev / prod)
- [x] Lazy-loaded routing (`loadChildren`) with redirect from `/`
- [x] Data loading via RxJS `subscribe` with `takeUntilDestroyed`, signals for UI state
- [x] Loading and error states, error messages based on HTTP status
- [x] Spring Boot backend: `FavoriteCity` entity, JPA repository, service layer
- [x] REST API: `GET /api/favorites`, `POST /api/favorites`

### In progress
- [ ] REST API: `DELETE /api/favorites/{id}`, `PATCH /api/favorites/{id}` (rename)
- [ ] Error handling in the API (404 for unknown id)
- [ ] CORS setup and Angular service for favourites

### Planned
- [ ] PostgreSQL instead of in-memory H2, running in Docker
- [ ] City search with autocomplete (debounceTime, switchMap)
- [ ] Multi-day forecast
- [ ] Unit tests
- [ ] CI with GitHub Actions

## Data source

Weather data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0).
