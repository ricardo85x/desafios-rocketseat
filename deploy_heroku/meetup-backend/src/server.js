import app from './app';

app.listen(process.env.PORT || 5000, () => {
  console.log(`servidor iniciado em http://localhost:${process.env.PORT}`);
});
