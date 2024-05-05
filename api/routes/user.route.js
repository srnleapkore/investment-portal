import express from 'express';
import { sample } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/sample', sample);

export default router;