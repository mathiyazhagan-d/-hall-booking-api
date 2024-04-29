import express from 'express';
import roomRoutes from './room.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the main route!');
});

router.use('/rooms', roomRoutes);

export default router;
