# Weather App

Full-stack weather app built with **Angular** and **Spring Boot**.
The frontend shows current weather from the [Open-Meteo](https://open-meteo.com/) API; the backend provides a REST API for saving favourite cities.

## Tech stack

- **Frontend:** Angular (standalone components), TypeScript, RxJS, signals, SCSS
- **Backend:** Java 21, Spring Boot, Spring Web, Spring Data JPA, H2
- **Data:** Open-Meteo Forecast API (no API key required)

## Project structure

```
frontend/   Angular application
backend/    Spring Boot REST API
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

The API runs on http://localhost:8080.
Data is stored in an in-memory H2 database and is reset on every restart.

## REST API

| Method | Endpoint | Description | Body |
|---|---|---|---|
| GET | `/api/favorites` | List all favourite cities | — |
| POST | `/api/favorites` | Add a city | `{"name": "Riga", "country": "Latvia", "latitude": 56.95, "longitude": 24.11}` |
| PATCH | `/api/favorites/{id}` | Rename a city | `{"name": "Home"}` |
| DELETE | `/api/favorites/{id}` | Delete a city | — |

Unknown `id` returns **404 Not Found**.

## Status

Work in progress. Features are developed in branches and merged via pull requests with code review.

### Done
- [x] Angular app with standalone components
- [x] Weather service with HttpClient, typed response models, query params
- [x] API URL in environment configs (dev / prod)
- [x] Lazy-loaded routing (`loadChildren`) with redirect from `/`
- [x] Data loading via RxJS `subscribe` with `takeUntilDestroyed`, signals for UI state
- [x] Loading and error states, error messages based on HTTP status
- [x] Spring Boot backend: entity, JPA repository, service layer, REST controller
- [x] CRUD API for favourite cities (GET, POST, PATCH, DELETE)
- [x] Custom exception mapped to 404 for unknown ids

### In progress
- [ ] CORS setup and Angular service for favourites
- [ ] Favourites list in the UI

### Planned
- [ ] PostgreSQL instead of in-memory H2, running in Docker
- [ ] Centralized error handling with `@RestControllerAdvice`
- [ ] City search with autocomplete (debounceTime, switchMap)
- [ ] Multi-day forecast
- [ ] Unit tests
- [ ] CI with GitHub Actions

## Data source

Weather data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0).
