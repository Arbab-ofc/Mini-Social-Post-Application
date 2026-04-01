<div align="center">

<h1>Mini Social Post Application</h1>

<p>
  Full-stack social feed application built for the 3W Full Stack Internship Assignment.<br/>
  Original UI inspired by the social-feed rhythm of TaskPlanet references.
</p>

<p>
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img alt="MUI" src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p>
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img alt="Multer" src="https://img.shields.io/badge/Multer-FFB300?style=for-the-badge" />
  <img alt="Render" src="https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=111" />
  <img alt="Vercel" src="https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

</div>

## Quick Navigation

- [Project Overview](#project-overview)
- [Feature Set](#feature-set)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Main Test Flow](#main-test-flow)
- [Deployment Guide](#deployment-guide)
- [Validation and Error Handling](#validation-and-error-handling)
- [Bonus Implemented](#bonus-implemented)

## Project Overview

Mini Social is a production-style, internship-ready full-stack social posting app with JWT authentication, image uploads, and a public feed. It is optimized for mobile-first interaction while staying responsive on tablet and desktop.

### Assignment Scope Covered

- Signup with username, email, password
- Login with email or username plus password
- Public feed of all users posts
- Create post as text-only, image-only, or text plus image
- Like and comment actions for authenticated users
- Instant UI updates without page refresh
- Strict MongoDB two-collection design: `users`, `posts`

## Feature Set

| Area | Implemented |
|---|---|
| Authentication | JWT auth, protected routes, session restore |
| Social Feed | Public timeline, newest-first, author + timestamps |
| Post Creation | Text, image, or mixed post with validation |
| Likes | Toggle like with persistent state and user metadata |
| Comments | Comment create + count updates + structured data |
| Uploads | Multer local uploads, static serving, preview, type/size validation |
| UI System | MUI-only design, custom theme, rounded modern layout |
| Loading UX | MUI skeleton placeholders for composer and feed cards |
| Ops | Health endpoint for deployment monitoring |
| Responsiveness | Mobile, tablet, and desktop optimized |

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Material UI (MUI)
- React Context API

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- multer
- cors
- dotenv

## Architecture

```text
Frontend (React + MUI)
  -> Axios API Client
  -> Express REST API (JWT Protected Routes)
  -> MongoDB Atlas (users, posts)
  -> Local uploads/ served by backend
```

## System Map

```mermaid
graph LR
  U[User Browser] --> F[React + MUI Frontend]
  F --> A[Axios Client]
  A --> B[Express API Backend]
  B --> M[(MongoDB Atlas)]
  B --> S[/uploads static files/]
  B --> J[JWT Auth Layer]
```

## App Flow

```mermaid
flowchart TD
  A[Signup] --> B[Login]
  B --> C[Fetch Public Feed]
  C --> D[Create Post: Text/Image/Both]
  D --> E[Feed Updates Instantly]
  C --> F[Like Post]
  C --> G[Comment on Post]
  F --> E
  G --> E
  E --> H[Persist to MongoDB posts/users]
```

## Folder Structure

```text
Mini-Social-Post-Application/
  backend/
    src/
      config/db.js
      controllers/
      middleware/
      models/
      routes/
      utils/generateToken.js
      app.js
      server.js
    uploads/.gitkeep
    .env.example
    package.json

  frontend/
    src/
      api/axios.js
      components/
      context/AuthContext.jsx
      pages/
      theme/theme.js
      utils/formatDate.js
      App.jsx
      main.jsx
    .env.example
    package.json

  README.md
```

## API Reference

### Auth Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)

### Post Routes

- `GET /api/posts`
- `POST /api/posts` (protected, multipart: `text`, `image`)
- `POST /api/posts/:id/like` (protected)
- `POST /api/posts/:id/comment` (protected)

### System Route

- `GET /api/health` (status, timestamp, uptime)

## Environment Variables

### Backend: `backend/.env.example`

```env
PORT=5001
MONGODB_URI=mongodb+srv://arbab2201156ec_db_user:j9V1Wwq5kV2Zbnlb@minisocialpostapplicati.g24i2ps.mongodb.net/?appName=MiniSocialPostApplication
JWT_SECRET=change_this_to_a_secure_secret
CLIENT_URL=http://localhost:5173
```

### Frontend: `frontend/.env.example`

```env
VITE_API_BASE_URL=http://localhost:5001
```

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/Arbab-ofc/Mini-Social-Post-Application.git
cd Mini-Social-Post-Application
```

### 2. Start Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend URL: `http://localhost:5001`

### 3. Start Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend URL: `http://localhost:5173`

### Optional Root Commands

```bash
npm run install:all
npm run dev:backend
npm run dev:frontend
```

## Main Test Flow

1. Signup user A
2. Login user A
3. Create three posts: text-only, image-only, text+image
4. Open public feed and verify ordering/content
5. Signup/login user B
6. Like user A post
7. Comment on user A post
8. Verify live count and UI update without refresh
9. Confirm `posts` stores like/comment user metadata

## Deployment Guide

### Backend Deployment (Render)

1. Create a Render Web Service from `backend`
2. Build command: `npm install`
3. Start command: `npm start`
4. Set environment variables:
   - `PORT=5001`
   - `MONGODB_URI=<atlas-uri>`
   - `JWT_SECRET=<strong-secret>`
   - `CLIENT_URL=<frontend-domain>`

### Database Deployment (MongoDB Atlas)

1. Create cluster and user
2. Allow network access from Render
3. Add Atlas URI to backend `MONGODB_URI`

### Frontend Deployment (Vercel or Netlify)

1. Deploy `frontend` directory
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add env variable:
   - `VITE_API_BASE_URL=https://<render-backend-domain>`

### CORS Note

Set backend `CLIENT_URL` exactly to the deployed frontend domain.

## Validation and Error Handling

Handled across frontend and backend:

- duplicate signup email
- invalid credentials
- unauthorized protected actions
- invalid/expired JWT
- empty post submission
- empty comment submission
- invalid post ID
- upload and server/network failures
- invalid image MIME type rejection
- image size rejection above 5MB

## Bonus Implemented

- Login by email or username
- Like toggle with persistent liked state
- Relative date formatting
- Feed filters (newest, oldest, random, my posts)
- Styled responsive experience across breakpoints
- Skeleton loading UI for feed and composer
- Health check endpoint (`/api/health`)
