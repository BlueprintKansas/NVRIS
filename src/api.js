import express from 'express';
import bodyParser from 'body-parser';
const form = require('./imageManipulation').form

const app = express();
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.post('/vr/en', jsonParser, async (req, res) => {
  
  res.send(form);
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

app.use(express.static('staticForms'));

export default app;
