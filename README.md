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
- [Live Links](#live-links)
- [Test Credentials](#test-credentials)
- [One-Click Deploy](#one-click-deploy)
- [Feature Set](#feature-set)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Diagrams](#diagrams)
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

## Live Links

<p>
  <a href="https://mini-social-post-application-phi.vercel.app" target="_blank">
    <img alt="Live Frontend" src="https://img.shields.io/badge/Live_Frontend-mini--social--post--application--phi.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  <a href="https://mini-social-post-application-alpvrofri-arbab-arshads-projects.vercel.app" target="_blank">
    <img alt="Vercel Deployment URL" src="https://img.shields.io/badge/Vercel_Deployment-Open-111111?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
</p>

<p>
  <a href="https://mini-social-post-application-d98n.onrender.com" target="_blank">
    <img alt="Live Backend API" src="https://img.shields.io/badge/Live_Backend-mini--social--post--application--d98n.onrender.com-46E3B7?style=for-the-badge&logo=render&logoColor=111" />
  </a>
  <a href="https://mini-social-post-application-d98n.onrender.com/api/health" target="_blank">
    <img alt="API Health Endpoint" src="https://img.shields.io/badge/API_Health-/api/health-1B5E20?style=for-the-badge" />
  </a>
</p>

- Frontend (Primary): `https://mini-social-post-application-phi.vercel.app`
- Frontend (Deployment URL): `https://mini-social-post-application-alpvrofri-arbab-arshads-projects.vercel.app`
- Backend API: `https://mini-social-post-application-d98n.onrender.com`
- Backend Health: `https://mini-social-post-application-d98n.onrender.com/api/health`

## Test Credentials

Use this account to test login and social actions on the live app:

- Email: `demo.mini.social@example.com`
- Username: `testuser`
- Password: `Test@12345`

Sample seeded post from this account:
- `Demo post for assignment testing.`

Note:
- These are public demo credentials for assignment review only.
- Change or remove them for production use.

## One-Click Deploy

### Backend (Render Blueprint)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Arbab-ofc/Mini-Social-Post-Application)

Uses `backend/render.yaml` and creates the backend service in one flow.

### Frontend (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Arbab-ofc/Mini-Social-Post-Application&project-name=mini-social-post-frontend&root-directory=frontend&env=VITE_API_BASE_URL)

Creates a Vercel project from `frontend/` directly.

### One-Click Order

1. Click Render deploy first and finish backend setup.
2. Copy the Render backend URL.
3. Click Vercel deploy and set `VITE_API_BASE_URL` to your Render URL.
4. Copy the Vercel frontend URL.
5. In Render service env, set `CLIENT_URL` to your Vercel URL, then redeploy backend.

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
| Share | Native share + clipboard fallback with deep-link URL |
| Uploads | Multer + Cloudinary hosted image upload with type/size validation |
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
  -> Cloudinary hosted media storage
```

## Diagrams

### System Map

```mermaid
graph LR
  U[User Browser] --> F[React + MUI Frontend]
  F --> A[Axios Client]
  A --> B[Express API Backend]
  B --> M[(MongoDB Atlas)]
  B --> C[(Cloudinary Media Storage)]
  B --> J[JWT Auth Layer]
  B --> H[/api/health/]
  F --> D[/post/:id deep-link route/]
```

### App Flow

```mermaid
flowchart TD
  A[Signup] --> B[Login]
  B --> C[Load Feed]
  C --> D[Create Post]
  C --> E[Like]
  C --> F[Comment]
  C --> G[Share]
  D --> H[Optimistic UI Update]
  E --> H
  F --> H
  G --> I[Create /post/:id URL]
  I --> J[Native Share or Copy Link]
  J --> K[Open Shared Link]
  K --> L[Load Single Post]
  H --> M[Persist to MongoDB]
  L --> M
```

### Data Model Map

```mermaid
erDiagram
  USERS ||--o{ POSTS : authors
  POSTS {
    objectId _id
    objectId user
    string username
    string text
    string image
    array likes
    array comments
    date createdAt
    date updatedAt
  }
  USERS {
    objectId _id
    string username
    string email
    string password
    date createdAt
    date updatedAt
  }
```

### Request Lifecycle

```mermaid
sequenceDiagram
  participant UI as Frontend (React)
  participant API as Backend (Express)
  participant DB as MongoDB
  participant CDN as Cloudinary

  UI->>API: POST /api/posts (multipart text+image)
  API->>CDN: Upload image
  CDN-->>API: Hosted image URL
  API->>DB: Save post (with URL)
  DB-->>API: Created post
  API-->>UI: Post payload
  UI-->>UI: Instant feed update
```

### Deployment Flow

```mermaid
flowchart LR
  GH[GitHub Repo] --> R[Render Backend]
  GH --> V[Vercel Frontend]
  R --> A[(MongoDB Atlas)]
  R --> C[(Cloudinary)]
  V --> U[Users]
  U --> V
  V --> R
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
- `GET /api/posts/:id`
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
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
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
   - `CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>`
   - `CLOUDINARY_API_KEY=<cloudinary-api-key>`
   - `CLOUDINARY_API_SECRET=<cloudinary-api-secret>`

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
5. SPA routing support for deep links is included:
   - `frontend/vercel.json` for Vercel rewrites
   - `frontend/public/_redirects` for Netlify redirects

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
- Share button with Web Share API and clipboard fallback
- Deep-link page route for shared posts (`/post/:id`)
