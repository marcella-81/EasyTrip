import express from 'express';
import { getDestination } from '../controllers/destinationController.js';

const router = express.Router();
router.get('/:name', getDestination);

export default router;

