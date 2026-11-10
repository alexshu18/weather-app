# Weather App

Full-stack weather app built with **Angular** and **Spring Boot**.
Users register and log in, search for any city with autocomplete, see its current weather and keep their own list of favourite cities, stored in PostgreSQL.
Each user sees only their own data.

Weather and city search come from the [Open-Meteo](https://open-meteo.com/) APIs; users, favourites and lists are managed by the app's own REST API.

## Tech stack

- **Frontend:** Angular 21 (standalone components, signals), TypeScript, RxJS, Angular Material 21, SCSS
- **Backend:** Java 21, Spring Boot 4, Spring Web MVC, Spring Security, Spring Data JPA (Hibernate), JWT (jjwt)
- **Database:** PostgreSQL 17 in Docker (Docker Compose), schema managed by Flyway migrations
- **External APIs:** Open-Meteo Forecast API and Geocoding API (no API key required)

## Project structure

```
frontend/            Angular application
backend/             Spring Boot REST API
docker-compose.yml   PostgreSQL for local development
.env.example         Template for database credentials and JWT secret
```

## How to run

Requirements: Docker Desktop, JDK 21, Node.js LTS, Angular CLI.

### 1. Environment

Create a `.env` file in the project root from the template and set your own values:

```bash
cp .env.example .env
```

`JWT_SECRET` must be a random base64 key of at least 256 bits:

```bash
openssl rand -base64 32
```

### 2. Database

```bash
docker compose up -d
```

The database is available only on this machine at `localhost:5432`.
Data is stored in a Docker volume and survives restarts.

### 3. Backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend reads credentials from `../.env`, so it must be started from the `backend` folder.
On start, Flyway applies the migrations from `backend/src/main/resources/db/migration`, then Hibernate validates the schema against the entities (`ddl-auto=validate`).

| Migration | Creates |
|---|---|
| `V1__create_favorite_city.sql` | `favorite_city` table and its id sequence |
| `V2__create_city_lists.sql` | `city_list` table, its id sequence and the `city_list_favorite_city` join table (many-to-many, `ON DELETE CASCADE`) |
| `V3__create_user.sql` | `app_user` table (unique email, BCrypt password hash) |
| `V4__add_user_to_favorites_and_lists.sql` | `user_id` foreign key and index on `favorite_city` and `city_list` |

The API runs on http://localhost:8080.

### 4. Frontend

```bash
cd frontend
npm install
ng serve
```

Open http://localhost:4200. Not logged-in users are redirected to `/login`.

### Reset the database

```bash
docker compose down -v
docker compose up -d
```

⚠️ `-v` deletes the volume with all data. Migrations are applied again on the next backend start.

## How authentication works

1. `POST /api/auth/register` saves the user with a BCrypt password hash. A duplicate email returns **409 Conflict** (checked in the service and guaranteed by a `UNIQUE` constraint).
2. `POST /api/auth/login` checks the password and returns a signed JWT access token (HS256, `sub` = user id, valid for 15 minutes).
3. The Angular `authInterceptor` adds `Authorization: Bearer <token>` to requests to the backend only (not to Open-Meteo).
4. On the backend, `JwtAuthenticationFilter` verifies the signature and expiry and puts the user id into the `SecurityContext`. Controllers read it with `@AuthenticationPrincipal`.
5. Sessions are stateless, CSRF is disabled (no cookies), requests without a valid token get **401 Unauthorized**. On 401 the frontend logs the user out.
6. Every query for favourites and lists filters by the user id from the token (`findByIdAndUserId`). Someone else's resource returns **404**, not 403, so it is not revealed that the id exists.

## REST API

All endpoints except register and login require `Authorization: Bearer <token>`.

### Auth

| Method | Endpoint | Description | Body | Success |
|---|---|---|---|---|
| POST | `/api/auth/register` | Create an account | `{"email": "user@mail.com", "password": "secret123"}` | 201 Created |
| POST | `/api/auth/login` | Get an access token | `{"email": "user@mail.com", "password": "secret123"}` | 200 OK, `{"accessToken": "..."}` |
| GET | `/api/auth/me` | Current user | — | 200 OK, `{"id": 1, "email": "...", "createdAt": "..."}` |

Wrong email or password returns **401 Unauthorized** with the same message for both cases.

### Favourite cities

| Method | Endpoint | Description | Body | Success |
|---|---|---|---|---|
| GET | `/api/favorites` | List the user's favourite cities | — | 200 OK |
| POST | `/api/favorites` | Add a city | `{"name": "Riga", "country": "Latvia", "latitude": 56.95, "longitude": 24.11}` | 201 Created |
| PATCH | `/api/favorites/{id}` | Rename a city | `{"name": "Home"}` | 200 OK |
| DELETE | `/api/favorites/{id}` | Delete a city (also removes it from all lists) | — | 204 No Content |

### City lists

| Method | Endpoint | Description | Body | Success |
|---|---|---|---|---|
| GET | `/api/lists` | The user's lists with their cities | — | 200 OK |
| POST | `/api/lists` | Create a list | `{"name": "Travel"}` | 201 Created |
| PATCH | `/api/lists/{id}` | Rename a list | `{"name": "Trips"}` | 200 OK |
| DELETE | `/api/lists/{id}` | Delete a list (cities stay in favourites) | — | 204 No Content |
| POST | `/api/lists/{listId}/cities/{cityId}` | Add a favourite city to a list | — | 200 OK |
| DELETE | `/api/lists/{listId}/cities/{cityId}` | Remove a city from a list | — | 200 OK |

A list is returned as `{"id": 1, "name": "Travel", "cities": [{"id": 1, "name": "Riga", "country": "Latvia", "latitude": 56.95, "longitude": 24.11}]}`.

An unknown id, or an id that belongs to another user, returns **404 Not Found**.
CORS is enabled for the Angular dev server (`http://localhost:4200`) on `/api/**`.

## Status

Work in progress. Features are developed in branches and merged into `main` via pull requests.

### Done

**Frontend**
- [x] Standalone components, lazy-loaded routing (`loadChildren`, `loadComponent`)
- [x] Login and registration pages with reactive forms and validation (registration logs the user in right away with `switchMap`)
- [x] Functional `authInterceptor` (adds the token, logs out on 401) and `authGuard` for protected routes
- [x] Token storage in a separate service, login state as a signal (`computed` `isLoggedIn`)
- [x] Header with the current user's email and logout, shown only when logged in
- [x] City search with autocomplete: `debounceTime`, `distinctUntilChanged`, `switchMap` (cancels outdated requests), `catchError` inside `switchMap` so one failed request does not stop the search
- [x] Favourites: add from the weather card, delete, click to show weather; list state shared between components through a service with a read-only signal
- [x] Selected city kept in URL query params (survives reload, works with the browser Back button)
- [x] Angular Material UI (cards, form fields, autocomplete, list, toolbar, spinners) with a custom theme
- [x] Loading and error states, shared helper for error messages based on HTTP status

**Backend**
- [x] Entities, JPA repositories, service layer, REST controllers, DTOs (Java records)
- [x] CRUD API for favourite cities and city lists (many-to-many with a join table)
- [x] PostgreSQL in Docker, Flyway migrations, Hibernate schema validation, secrets in `.env`
- [x] `@Transactional` services (dirty checking, read-only transactions), `open-in-view` disabled
- [x] Registration and login: BCrypt password hashing, email normalisation, 409 on duplicate email (including the race condition, caught via the `UNIQUE` constraint)
- [x] Spring Security: stateless JWT authentication with a custom `OncePerRequestFilter`, 401 entry point
- [x] Favourites and lists belong to a user (`@ManyToOne` + foreign key), ownership checks on every query

### Planned next
- [ ] City lists in the UI (separate page with routing)
- [ ] Refresh tokens (now the user logs in again after 15 minutes)
- [ ] Prevent duplicate favourites on the server (`UNIQUE` constraint), now only checked in the UI
- [ ] Request validation (400 Bad Request) and centralized error handling with `@RestControllerAdvice`
- [ ] Load weather through `switchMap` on the URL params to cancel outdated requests when switching cities fast
- [ ] Multi-day forecast
- [ ] Unit tests (`HttpTestingController` on the frontend, service and controller tests on the backend)
- [ ] CI with GitHub Actions

## Data source

Weather and geocoding data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0).