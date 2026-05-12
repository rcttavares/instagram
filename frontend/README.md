# Frontend

Instagram frontend application, migrated to Vite.

## Current stack

- React 17
- Vite 8
- React Router DOM 5
- Socket.IO Client 4

## Scripts

In the `frontend` directory, use:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Local environment

By default, the frontend consumes the API at `http://localhost:3333`.

If you need to point to another backend, create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:3333
```

## Development

- Vite runs at `http://localhost:3000`.
- If the port is already in use, it can fall back to another free port when configured to do so.
- The project uses the automatic JSX runtime, so you do not need to import `React` in every component.
