# instagram

Instagram-inspired social app with a feed of posts, likes, image uploads, and live updates.

## Deploy on GitHub Pages

This repository is configured to deploy the frontend to GitHub Pages through GitHub Actions.

Important notes:

- GitHub Pages hosts only the frontend build.
- The backend must be deployed separately and exposed through a public URL.
- Set the `VITE_API_URL` secret in the repository with the backend URL before enabling the workflow.

### GitHub setup

1. In the repository settings, enable GitHub Pages with the source set to GitHub Actions.
2. Add a repository secret named `VITE_API_URL` with the public backend URL, for example `https://your-backend.example.com`.
3. Push to the `main` branch or run the workflow manually from the Actions tab.

### Local frontend

```bash
cd frontend
npm install
npm run dev
```
