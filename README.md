

---

```markdown
# 🟢 DataHub Personal – Portfolio + AI Knowledge Platform

<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white" alt="Next.js" height="30"/>
  </a>
  <a href="https://nestjs.com/">
    <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white" alt="NestJS" height="30"/>
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript&logoColor=white" alt="TypeScript" height="30"/>
  </a>
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/Docker-20-blue?logo=docker&logoColor=white" alt="Docker" height="30"/>
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql&logoColor=white" alt="PostgreSQL" height="30"/>
  </a>
  <a href="https://redis.io/">
    <img src="https://img.shields.io/badge/Redis-7-red?logo=redis&logoColor=white" alt="Redis" height="30"/>
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" height="30"/>
  </a>
  <a href="https://www.framer.com/motion/">
    <img src="https://img.shields.io/badge/FramerMotion-6-purple?logo=framer&logoColor=white" alt="Framer Motion" height="30"/>
  </a>
</p>

---

## 📌 Overview

**DataHub** is a full-stack platform combining a **personal portfolio** with an **AI knowledge system**.  
It demonstrates:

* Functional authentication (login/logout, JWT)
* Session handling and protected routes
* Responsive UI with **dark mode**
* Smooth animations with **Framer Motion**
* Fully functional backend + frontend integration  

> ⚠️ Note: Advanced security features like full RBAC, 2FA, and httpOnly cookies are **not implemented**.

---

## 🗂️ Project Structure

```

datahub-platform/
├── backend/                     # NestJS + TypeORM API
│   ├── src/
│   │   ├── auth/                # Login, logout, refresh token
│   │   ├── common/              # Guards, filters, interceptors
│   │   ├── config/              # CORS, JWT, other configs
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/                    # Next.js 14 + Tailwind
│   ├── src/
│   │   ├── hooks/               # useAuth, useTheme
│   │   ├── lib/                 # api.ts, csrf.ts, seo.ts
│   │   ├── pages/               # login, register, dashboard
│   │   └── components/          # Navbar, Footer, Guard
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md

````

---

## ⚙️ Features

### Backend (NestJS)

* JWT login/logout
* Refresh token endpoint (`/auth/refresh`)
* Protected routes with Guards
* Validation using `ValidationPipe`
* Structured JSON logging

### Frontend (Next.js + Tailwind + Framer Motion)

* Functional login/logout
* Dark mode via `useTheme` hook
* Session state via `useAuth`
* Protected pages and navigation
* API wrapper with automatic refresh token handling
* Responsive UI + smooth animations

---

## 💻 Run the Project

### Requirements

* Docker 20+ / Docker Compose 2+
* Node.js 18+
* PostgreSQL 15 (Docker)
* Redis 7 (Docker)

### Start Services

```bash
docker compose up -d
````

### Quick Check

* Backend: [http://localhost:3001](http://localhost:3001)
* Frontend: [http://localhost:3000](http://localhost:3000)
* Database: localhost:5432
* Redis: localhost:6379

---

## 🔑 Notes

* Fully functional as-is
* Dark mode, login/logout, and protected routes work
* Advanced security (RBAC, httpOnly cookies, 2FA) **not implemented**
* README reflects the **current project state**

---

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" width="120"/></a>
  <a href="https://nestjs.com/"><img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs" width="120"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-20-blue?logo=docker" width="120"/></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql" width="120"/></a>
  <a href="https://redis.io/"><img src="https://img.shields.io/badge/Redis-7-red?logo=redis" width="120"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwind-css" width="120"/></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/FramerMotion-6-purple?logo=framer&logoColor=white" width="120"/></a>
</p>
```

---

Si quieres, puedo hacer **una versión aún más profesional**, con:

* **Sección de badges por columnas** para que no se vean amontonados
* **Capturas de pantalla del frontend**
* **Sección “Tech Stack” con logos grandes y bien organizados**

Esto daría un README que parece un proyecto de empresa.

¿Quieres que haga esa versión final?
