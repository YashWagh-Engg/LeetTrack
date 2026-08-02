# 🚀 LeetTrack

LeetTrack is a full-stack web application that helps users track their LeetCode problem-solving journey. It provides authentication, problem management, goal tracking, analytics, and a personalized dashboard to monitor coding progress over time.

## 🌐 Live Demo

- **Frontend:** [leet-track-smoky.vercel.app](https://leet-track-smoky.vercel.app)
- **Backend API:** [leettrack-backend-fpx1.onrender.com](https://leettrack-backend-fpx1.onrender.com)

---

## ✨ Features

**Authentication** — Secure signup and login backed by JWT tokens, with passwords hashed using bcrypt before they're ever stored.

**Problem Tracking** — Log solved LeetCode problems with title, topic, and difficulty. Problems can be created, edited, and deleted, giving users a running record of what they've practiced.

**Daily Goal Management** — Set a daily target for problems to solve and track progress against that goal in real time.

**Streak Tracking** — Automatically calculates a consistency streak based on daily activity, encouraging regular practice.

**Analytics Dashboard** — Aggregated stats on solving activity, including a breakdown of problems by difficulty, rendered as charts on the frontend.

**Recent Activity** — A feed of recent actions, so users can quickly see what they worked on last.

**Notifications** — In-app notifications to keep users informed of relevant updates, with the ability to mark them as read.

**Responsive Interface** — Built with Tailwind CSS so the dashboard and all views work cleanly across screen sizes.

---

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- Axios
- React Router
- Recharts
- React Hot Toast
- React Icons

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL (via `psycopg2-binary`)
- JWT Authentication (`python-jose`)
- Passlib (`bcrypt`)
- Pydantic
- Python

### Database
- PostgreSQL (Neon)

### Deployment
- Frontend deployed on Vercel
- Backend deployed on Render

---

## Project Structure

```text
LeetTrack/
│
├── frontend/
│   ├── src/
│   │   ├── components/     # AnalyticsCard, DifficultyChart, GoalModal, DeleteModal, ...
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── models/          # user, problem, goal, activity, notification, base
│   │   ├── routers/         # auth, problem, goal, dashboard, activity, notification, analytics
│   │   ├── schemas/         # user, problem, goal, analytics, dashboard
│   │   ├── utils/           # security (hashing, JWT)
│   │   ├── database.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   └── main.py
│   └── requirements.txt
│
├── docs/
│   ├── database_schema.md
│   ├── features.md
│   └── roadmap.md
│
├── NEXT_TASKS.md
└── README.md
```

---

## API Overview

All routes are served from the FastAPI backend. Key endpoint groups:

| Router | Prefix | Endpoints |
|---|---|---|
| Auth | — | `POST /signup`, `POST /login` |
| Problem | `/problem` | `GET /`, `POST /`, `PUT /{problem_id}`, `DELETE /{problem_id}`, `GET /stats`, `GET /streak` |
| Goal | `/goal` | `GET /`, `POST /`, `PUT /`, `DELETE /` |
| Dashboard | `/dashboard` | `GET /` |
| Activity | `/activity` | `GET /` |
| Notification | `/notification` | `GET /`, `PUT /{notification_id}` |
| Analytics | `/analytics` | `GET /` |

Interactive API docs (Swagger UI) are available at `/docs` on the running backend, e.g. `http://localhost:8000/docs`.

---

## Database Schema (V1)

**User**
- id, name, email, password

**Problem**
- id, user_id, title, difficulty, topic, date_solved

See [`docs/database_schema.md`](./docs/database_schema.md) for the latest version.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YashWagh-Engg/LeetTrack.git
cd LeetTrack
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

The project uses [Neon](https://neon.tech) for PostgreSQL. Get your own connection string from the Neon dashboard under your project's Connection Details — never commit this value.

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8000
```

For production:

```env
VITE_API_URL=https://leettrack-backend-fpx1.onrender.com
```

---

## License

This project is licensed under the [MIT License](./LICENSE).