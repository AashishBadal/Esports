import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import Tournamentroutes from './routes/tournamentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(express.json());

// CORS config to allow cookies
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

app.use(cookieParser()); // ✅ put BEFORE routes

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tournament', Tournamentroutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
