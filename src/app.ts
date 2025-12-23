import express from 'express';
import cors from 'cors';
const authRoutes = require('./modules/auth/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

export default app;
