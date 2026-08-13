# Backend

Instagram project API.

## Current stack

- Node.js
- Express
- Mongoose
- Socket.IO
- Multer
- Sharp

## Scripts

In the `backend` directory, use:

```bash
npm install
npm run dev
```

## Local environment

The backend expects a `.env` file in `backend/` with the variables below:

```env
MONGO_URL=mongodb://localhost:27017/instagram
PORT=3333
```

### MongoDB

For local development, run MongoDB via Docker instead of depending on an Atlas cluster (Atlas free-tier clusters auto-pause after 30 days of inactivity):

```bash
docker compose up -d
```

This starts a `mongo:7` container on `localhost:27017` with data persisted in a named volume. To use Atlas instead, set `MONGO_URL` to your Atlas connection string (see `.env.example`).

## Main routes

- `GET /posts`
- `POST /posts`
- `POST /posts/:id/like`
- Uploaded files are exposed under `/files`

## Notes

- The server runs by default at `http://localhost:3333`.
- If MongoDB Atlas is not reachable, the backend exits with a connection error.
- Socket.IO is used to update the feed in real time.
