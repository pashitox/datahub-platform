

---

# 🟢 DataHub Personal – Portfolio + AI Knowledge Platform

<p align="left">
  <a href="https://nextjs.org/">
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
  </a>
  <a href="https://nestjs.com/">
    <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  </a>
  <a href="https://tailwindcss.com/">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white">
  </a>
  <a href="https://www.postgresql.org/">
    <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  </a>
  <a href="https://redis.io/">
    <img alt="Redis" src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
  </a>
  <a href="https://www.docker.com/">
    <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  </a>
</p>

---

## 📌 Description

DataHub is a **full-stack portfolio + AI knowledge platform** that demonstrates:

* Functional login/logout with JWT & refresh tokens
* Protected frontend routes
* Responsive UI with **dark mode toggle**
* Session management via `useAuth` hook
* API wrapper (`api.ts`) handling refresh tokens

> ⚠️ Advanced security (roles, httpOnly cookies, 2FA) is **not yet implemented**, but this is the **final functional version**.

---

## 🗂️ Project Structure

```text
datahub-platform/
├── backend/
│   ├── src/
│   │   ├── auth/                # Login/Logout, refresh token, JWT
│   │   ├── common/              # Guards, filters, interceptors
│   │   ├── config/              # JWT, CORS
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # Navbar, Footer, Guard
│   │   ├── hooks/               # useAuth, useTheme
│   │   ├── lib/                 # api.ts, csrf.ts, seo.ts
│   │   └── pages/               # login, register, dashboard
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ⚙️ Implemented Features

### Backend (NestJS + TypeORM)

* ✅ Login & logout endpoints
* ✅ Refresh token endpoint (`/auth/refresh`)
* ✅ JWT-based route protection
* ✅ Basic validation with `ValidationPipe`
* ✅ JSON structured logs

### Frontend (Next.js 14 + Tailwind CSS)

* ✅ Login/logout functionality
* ✅ Session state management with `useAuth`
* ✅ Protected routes using `Guard`
* ✅ Dark mode toggle with `useTheme`
* ✅ API wrapper handling token refresh
* ✅ Responsive pages

---

## 🔄 User Flow Diagram

```mermaid
flowchart TD
    A[User] -->|Login/Register| B[Frontend - Next.js]
    B -->|POST /auth/login| C[Backend - NestJS]
    C -->|Return JWT + Refresh Token| B
    B -->|Store tokens| D[useAuth Hook]
    B -->|Protected Route| E[Guard Component]
    E -->|Access Granted| F[Dashboard / Protected Pages]
    C --> G[PostgreSQL / Redis]
    G --> C
    B -->|API Request| C
```

---

## 🏗️ Architecture Diagram

```mermaid
graph TD
    subgraph Frontend
        A[Next.js 14] -->|API calls| B[API Client]
        B --> C[Guard + Pages]
        A --> D[Hooks: useAuth / useTheme]
    end

    subgraph Backend
        E[NestJS + TypeORM]
        F[Auth Module] -->|JWT & Refresh| E
        G[Common Module] -->|Guards/Interceptors| E
        H[Config Module] -->|CORS/JWT| E
    end

    subgraph Database
        I[PostgreSQL 15] 
        J[Redis 7]
    end

    Frontend -->|Requests| Backend
    Backend -->|Reads/Writes| Database
```

> This diagram shows **frontend, backend, database, Redis, and internal modules**, illustrating the full architecture.

---

## 💻 How to Run

### Requirements

* Docker 20+ / Docker Compose 2+
* Node.js 18+

### Start Services

```bash
docker compose up -d
```

### Quick Access

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:3001](http://localhost:3001)
* PostgreSQL: port `5432`
* Redis: port `6379`

---

## 🔧 Technologies Used

| Frontend     | Backend          | Database      | DevOps                  |
| ------------ | ---------------- | ------------- | ----------------------- |
| Next.js 14   | NestJS           | PostgreSQL 15 | Docker + Docker Compose |
| TypeScript   | TypeORM          | Redis 7       | ESLint + Prettier       |
| Tailwind CSS | JWT              |               | GitHub Actions          |
| React Hooks  | Class Validators |               |                         |

---

## 🔑 Notes

* Project is **final as-is**, ready for deployment.
* Core features: login/logout, protected pages, dark mode ✅
* Advanced security features not included ⚠️

---

## 📸 Visual Preview

<img width="1918" height="750" alt="Captura desde 2025-09-21 09-23-49" src="https://github.com/user-attachments/assets/7eba3c9c-8168-4911-b8d5-e44f2cedf21d" />

---

