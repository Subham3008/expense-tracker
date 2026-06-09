import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';


const app = express();

app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json());


export default app;