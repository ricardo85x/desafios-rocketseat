import 'dotenv/config';

import express from 'express';

const app = express();

app.get('/teste', (req, res) => {
  return res.json({ hello: 'mundo' });
});

export default app;
