import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.post('/vr/en', jsonParser, async (req, res) => {

  res.json({message: "ok"})
})

app.post('/vr/es', jsonParser, async (req, res) => {

  res.json({message: "ok"})
})

app.post('/ab/en', jsonParser, async (req, res) => {

  res.json({message: "ok"})
})

app.post('/ab/es', jsonParser, async (req, res) => {

  res.json({message: "ok"})
})

export default app;
