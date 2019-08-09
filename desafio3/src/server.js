import app from './app';

app.listen(process.env.APP_PORT, () => {
  console.log(`servidor iniciado em http://localhost:${process.env.APP_PORT}`);
});
