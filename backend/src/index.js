require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

if (!process.env.MONGO_URL) {
  throw new Error('Missing MONGO_URL. Set it in backend/.env');
}

mongoose.set('strictQuery', true);

app.use((req, _res, next) => {
  req.io = io;

  next();
});

app.use(cors());

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized')),
);

app.use(require('./routes'));

const port = Number(process.env.PORT) || 3333;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 10000,
    });

    server.listen(port);
    console.log(`Backend running on http://localhost:${port}`);
  } catch (error) {
    console.error('MongoDB connection failed. Check MONGO_URL, Atlas user, and Network Access IP allowlist.');
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
