# LeetTrack

LeetTrack is a full-stack DSA progress tracking platform for developers who want to stay consistent with coding practice. It helps users log solved problems, set daily goals, track streaks, review analytics, and monitor their recent activity from a focused dashboard.

## Features

- User signup and login with JWT-based authentication
- Protected dashboard, problem, goal, and analytics pages
- Problem tracking with title, difficulty, topic, time taken, and solved date
- Daily goal creation, update, and deletion
- Dashboard summary for solved problems, goal progress, difficulty counts, average solve time, recent activity, and notifications
- Analytics for difficulty distribution, topic distribution, monthly progress, average time, and current streak
- Activity history generated when problems are solved
- Notification listing and mark-as-read support
- Responsive React frontend built with reusable components and chart views

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Recharts
- Tailwind CSS
- React Hot Toast
- React Icons

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT authentication with `python-jose`
- Password hashing with Passlib and bcrypt
- Uvicorn

## Project Structure

```text
LeetTrack/
|-- backend/
|   |-- app/
|   |   |-- models/          # SQLAlchemy database models
|   |   |-- routers/         # FastAPI route handlers
|   |   |-- schemas/         # Pydantic request/response schemas
|   |   |-- services/        # Business logic helpers
|   |   |-- utils/           # Security and utility functions
|   |   |-- database.py      # Database connection/session setup
|   |   |-- dependencies.py  # Auth dependency helpers
|   |   `-- main.py          # FastAPI app entry point
|   `-- requirements.txt
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/      # Shared UI components
|   |   |-- context/         # Auth context
|   |   |-- hooks/           # Custom hooks
|   |   |-- pages/           # App pages
|   |   |-- services/        # Axios API client
|   |   `-- utils/           # Frontend helpers
|   |-- package.json
|   `-- vite.config.js
|-- docs/
|   |-- database_schema.md
|   |-- features.md
|   |-- roadmap.md
|   `-- wireframe.png
|-- requirements.txt
`-- README.md
```

## Getting Started

### Prerequisites

Make sure you have these installed:

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Git

## Backend Setup

1. Go to the backend folder:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

On macOS/Linux:

```bash
python -m venv .venv
source .venv/bin/activate
```

3. Install backend dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file inside `backend/`:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/leettrack
SECRET_KEY=replace_with_a_strong_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

5. Create a PostgreSQL database named `leettrack`.

6. Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://localhost:8000
```

FastAPI API documentation is available at:

```text
http://localhost:8000/docs
```

Note: database tables are created automatically when the FastAPI app starts through `Base.metadata.create_all(bind=engine)`.

## Frontend Setup

1. Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

4. Start the Vite development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## Available Scripts

Run these from the `frontend/` directory:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Run this from the `backend/` directory:

```bash
uvicorn app.main:app --reload
```

## API Overview

### Public Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Backend health message |
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Login and receive a bearer token |

### Protected Routes

These routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/dashboard/` | Get user dashboard data |
| `POST` | `/problem/` | Add a solved problem |
| `GET` | `/problem/` | Get all solved problems for the current user |
| `PUT` | `/problem/{problem_id}` | Update a problem |
| `DELETE` | `/problem/{problem_id}` | Delete a problem |
| `GET` | `/problem/stats` | Get problem difficulty and time stats |
| `GET` | `/problem/streak` | Get problem-solving streak data |
| `POST` | `/goal/` | Create or replace a daily goal |
| `GET` | `/goal/` | Get the current daily goal |
| `PUT` | `/goal/` | Update the daily goal |
| `DELETE` | `/goal/` | Delete the daily goal |
| `GET` | `/analytics/` | Get analytics data |
| `GET` | `/activity/` | Get recent activity |
| `GET` | `/notification/` | Get notifications |
| `PUT` | `/notification/{notification_id}` | Mark a notification as read |

## Frontend Pages

| Route | Page |
| --- | --- |
| `/` | Login |
| `/signup` | Signup |
| `/dashboard` | Dashboard |
| `/problems` | Problem tracker |
| `/analytics` | Analytics |
| `/goals` | Daily goals |

## Environment Variables

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SECRET_KEY` | Yes | Secret key used to sign JWT tokens |
| `ALGORITHM` | No | JWT algorithm, defaults to `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | Token expiry duration, defaults to `30` |

### Frontend

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Base URL of the FastAPI backend |

## Data Model Summary

- `User`: stores name, email, hashed password, and relationships
- `Problem`: stores solved problem details, topic, difficulty, time taken, and solve timestamp
- `Goal`: stores each user's daily problem-solving target
- `Activity`: stores recent user activity messages
- `Notification`: stores user notifications and read status

## Current Status

The core application structure is in place, including authentication, protected routes, problem tracking, goals, dashboard data, analytics, activities, and notifications.

Planned improvements include broader authentication testing, logout polish, responsive UI refinements, stronger error handling, and final deployment testing.

## Documentation

Additional project notes are available in the `docs/` folder:

- `docs/features.md`
- `docs/database_schema.md`
- `docs/roadmap.md`
- `docs/wireframe.png`

## License

No license has been added yet. Add one before publishing or accepting external contributions.
