# Weather App

Full-stack weather app built with **Angular** and **Spring Boot**.
Search for any city, see its current weather and keep a list of favourite cities stored in PostgreSQL.

Weather and city search come from the [Open-Meteo](https://open-meteo.com/) APIs; favourites are managed by the app's own REST API.

## Tech stack

- **Frontend:** Angular (standalone components), TypeScript, RxJS, signals, SCSS
- **Backend:** Java 21, Spring Boot 4, Spring Web MVC, Spring Data JPA (Hibernate)
- **Database:** PostgreSQL 17 in Docker (Docker Compose), schema managed by Flyway migrations
- **External APIs:** Open-Meteo Forecast API and Geocoding API (no API key required)

## Project structure

```
frontend/            Angular application
backend/             Spring Boot REST API
docker-compose.yml   PostgreSQL for local development
.env.example         Template for database credentials
```

## How to run

Requirements: Docker Desktop, JDK 21, Node.js LTS, Angular CLI.

### 1. Database

Create a `.env` file in the project root from the template and set your own values:

```bash
cp .env.example .env
```

Start PostgreSQL:

```bash
docker compose up -d
```

The database is available only on this machine at `localhost:5432`.
Data is stored in a Docker volume and survives restarts.

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend reads database credentials from `../.env`, so it must be started from the `backend` folder.
On start, Flyway applies the migrations from `backend/src/main/resources/db/migration`, then Hibernate validates the schema against the entities (`ddl-auto=validate`).

The API runs on http://localhost:8080.

### 3. Frontend

```bash
cd frontend
npm install
ng serve
```

Open http://localhost:4200, the app redirects to `/weather`.

### Reset the database

```bash
docker compose down -v
docker compose up -d
```

⚠️ `-v` deletes the volume with all data. Migrations are applied again on the next backend start.

## REST API

| Method | Endpoint | Description | Body | Success |
|---|---|---|---|---|
| GET | `/api/favorites` | List all favourite cities | — | 200 OK |
| POST | `/api/favorites` | Add a city | `{"name": "Riga", "country": "Latvia", "latitude": 56.95, "longitude": 24.11}` | 201 Created |
| PATCH | `/api/favorites/{id}` | Rename a city | `{"name": "Home"}` | 200 OK |
| DELETE | `/api/favorites/{id}` | Delete a city | — | 204 No Content |

Unknown `id` returns **404 Not Found**.
CORS is enabled for the Angular dev server (`http://localhost:4200`) on `/api/**`.

## Status

Work in progress. Features are developed in branches and merged into `main` via pull requests.

### Done

**Frontend**
- [x] Standalone components, lazy-loaded routing (`loadChildren`) with redirect from `/`
- [x] Services with `HttpClient`, typed response models, query params, API URLs in environment configs
- [x] Signals for UI state, `subscribe` with `takeUntilDestroyed`
- [x] Loading and error states, shared helper for error messages based on HTTP status
- [x] City search via Open-Meteo Geocoding API (search by Enter or button, region shown to tell cities apart)
- [x] Selecting a city in search loads its weather (child → parent communication with `output()`)
- [x] Favourites list loaded from the backend, delete without page reload (`@for` with `track`, immutable signal updates)

**Backend**
- [x] Entity, JPA repository, service layer, REST controller
- [x] CRUD API for favourite cities with proper status codes (201, 204, 404)
- [x] Custom exception mapped to 404 for unknown ids
- [x] Global CORS configuration for the Angular dev server
- [x] PostgreSQL in Docker instead of in-memory H2
- [x] Database credentials in `.env`, not in Git
- [x] Flyway migrations, Hibernate schema validation

### Next
- [ ] Show the selected city name above the weather
- [ ] Add a city to favourites from the UI
- [ ] Refresh the favourites list after adding
- [ ] Click on a favourite city to show its weather

### Planned
- [ ] User entity and relations between entities (user ↔ favourite cities and more), new Flyway migrations
- [ ] Authentication with JWT (access + refresh tokens), Angular `authGuard` and HTTP interceptor
- [ ] Angular Material with own wrapper components (buttons, inputs, forms)
- [ ] Request validation (400 Bad Request) and `NOT NULL` constraints in the database
- [ ] Centralized error handling with `@RestControllerAdvice`
- [ ] Search with autocomplete (`debounceTime`, `switchMap`)
- [ ] Multi-day forecast
- [ ] Unit tests without real HTTP calls (`HttpTestingController`), backend tests
- [ ] CI with GitHub Actions

## Data source

Weather and geocoding data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0).
