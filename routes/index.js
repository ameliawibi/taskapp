import express from 'express';

export const router = express.Router();

// Redirect to tasks
router.get('/', (req, res) => {
  res.redirect('/task');
});