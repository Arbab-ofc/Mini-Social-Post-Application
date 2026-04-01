# Mini Social Post Application

A full-stack internship assignment project inspired by the social-feed feel of the provided TaskPlanet references (original implementation, not copied UI).

## Live Assignment Scope

This app implements:
- Signup/Login authentication (JWT)
- Public social feed (all posts, newest first)
- Post creation:
  - text-only
  - image-only
  - text + image
- Like and comment actions
- Instant UI updates for create/like/comment
- MongoDB with only **2 collections**: `users`, `posts`
- Mobile-friendly MUI design system

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Material UI (MUI) only
- React Context (Auth state)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- multer
- cors
- dotenv

## Folder Structure

```text
Mini-Social-Post-Application/
  frontend/
    src/
      api/
        axios.js
      components/
        AppHeader.jsx
        BottomNavBar.jsx
        AuthForm.jsx
        PostComposer.jsx
        PostCard.jsx
        CommentSection.jsx
        ProtectedRoute.jsx
        Loader.jsx
        EmptyState.jsx
      context/
        AuthContext.jsx
      pages/
        LoginPage.jsx
        SignupPage.jsx
        FeedPage.jsx
        ProfilePage.jsx
      theme/
        theme.js
      utils/
        formatDate.js
      App.jsx
      main.jsx
    .env.example
    package.json

  backend/
    src/
      config/
        db.js
      controllers/
        authController.js
        postController.js
      middleware/
        authMiddleware.js
        errorMiddleware.js
        uploadMiddleware.js
      models/
        User.js
        Post.js
      routes/
        authRoutes.js
        postRoutes.js
      utils/
        generateToken.js
      app.js
      server.js
    uploads/
      .gitkeep
    .env.example
    package.json

  README.md
```

## MongoDB Collections (Strict Rule)

Only these collections are used:
1. `users`
2. `posts`

## Backend API

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)

### Posts
- `GET /api/posts` (public, newest first, supports `page` and `limit`)
- `POST /api/posts` (protected, multipart form: `text`, `image`)
- `POST /api/posts/:id/like` (protected, toggle like)
- `POST /api/posts/:id/comment` (protected)

## Validation Rules Implemented

### Signup
- `username` required
- `email` required
- `password` minimum 6 chars
- duplicate email rejected

### Login
- valid email + password required
- invalid credentials rejected

### Create Post
- `text` and `image` can be individually optional
- both cannot be empty

### Comment
- empty comment rejected

### IDs/Auth
- invalid JWT rejected
- invalid post ID rejected
- unauthorized protected actions rejected

## Instant UI Updates

The feed updates immediately without full refresh for:
- Post creation (optimistic prepend)
- Like toggle (optimistic count/state)
- Comment creation (optimistic append/count)

Then UI reconciles with backend response.

## Environment Variables

### `backend/.env.example`

```env
PORT=5001
MONGODB_URI=mongodb+srv://arbab2201156ec_db_user:j9V1Wwq5kV2Zbnlb@minisocialpostapplicati.g24i2ps.mongodb.net/?appName=MiniSocialPostApplication
JWT_SECRET=change_this_to_a_secure_secret
CLIENT_URL=http://localhost:5173
```

### `frontend/.env.example`

```env
VITE_API_BASE_URL=http://localhost:5001
```

## Local Setup

## 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Runs on: `http://localhost:5001`

## 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on: `http://localhost:5173`

## Optional Root Shortcuts

```bash
npm run install:all
npm run dev:backend
npm run dev:frontend
```

## Main Test Flow

1. Sign up with username/email/password.
2. Login.
3. Create:
   - text-only post
   - image-only post
   - text + image post
4. Open public feed and verify newest-first ordering.
5. Login as another user.
6. Like first user post.
7. Comment on first user post.
8. Verify like/comment counts update instantly.
9. Confirm `likes` and `comments` arrays store user IDs + usernames.

## Deployment Guide

## A) Backend on Render

1. Push repo to GitHub.
2. Create Render Web Service from `backend` directory.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env vars:
   - `PORT=5001`
   - `MONGODB_URI=<your-atlas-uri>`
   - `JWT_SECRET=<strong-random-secret>`
   - `CLIENT_URL=<frontend-domain>`
6. Deploy.

## B) Database on MongoDB Atlas

1. Create Atlas cluster.
2. Create DB user and whitelist IPs.
3. Copy connection string into Render `MONGODB_URI`.
4. Ensure database is reachable from Render.

## C) Frontend on Vercel or Netlify

1. Deploy `frontend` folder.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set env:
   - `VITE_API_BASE_URL=https://<your-render-backend-domain>`
5. Redeploy frontend.

## CORS Notes

Backend allows origin using:
- `CLIENT_URL` from backend environment

Set it to your frontend deployment domain to avoid CORS issues.

## Assumptions

- Local file uploads are stored in `backend/uploads`.
- For production, persistent disk/object storage can be added later if needed.
- Public feed is readable without auth; interactions require auth.

## Bonus Features Included

- Optional pagination params on feed API (`page`, `limit`)
- Relative timestamps in UI
- Expand/collapse comments per post
- Mobile app-like sticky bottom navigation

## Future Improvements

- Add image compression/resizing pipeline
- Add delete/edit post APIs
- Add profile avatar upload
- Add server-side rate limiting
- Add tests (API + component tests)

## Screenshots

Add screenshots here after local/deployed testing.
