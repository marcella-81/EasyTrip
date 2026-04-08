import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import destinationRoutes from './routes/destination.js';
import errorHandler from './middleware/errorHandler.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express(); 

app.use(express.json());
app.use(express.static(join(__dirname, '../public'))); // index.html

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

app.use('/api/destination', destinationRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌍 Servidor rodando em http://localhost:${PORT}`));