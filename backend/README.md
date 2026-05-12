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
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
PORT=3333
```

## Main routes

- `GET /posts`
- `POST /posts`
- `POST /posts/:id/like`
- Uploaded files are exposed under `/files`

## Notes

- The server runs by default at `http://localhost:3333`.
- If MongoDB Atlas is not reachable, the backend exits with a connection error.
- Socket.IO is used to update the feed in real time.
