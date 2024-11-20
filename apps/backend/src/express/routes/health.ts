// ---Dependencies
import express, { Request, Response } from 'express';
// ---Custom

// ---------------- CONFIG
const router = express.Router();

// ---------------- MAIN MODULE
router.get('/', (_: Request, res: Response) => {
  res.send({ err: false, data: 'Hello world' });
});

export const healthRoutes = router;
