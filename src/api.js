require('dotenv').config()

let newrelic = require('newrelic');

import express from "express";
import bodyParser from "body-parser";

import routeLogic from "./helpers/routeLogic";
import KSAV1 from "./formDefinitions/KSAV1";
import KSAV2 from "./formDefinitions/KSAV2";
import VRES from "./formDefinitions/VRES";
import VREN from "./formDefinitions/VREN";

const app = express();
const jsonParser = bodyParser.json({ limit: "50mb", extended: true });

app.locals.newrelic = newrelic;

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.post("/vr/en", jsonParser, async (req, res) => {
  res.json(await routeLogic(VREN, req.body));
});

app.post("/vr/es", jsonParser, async (req, res) => {
  res.json(await routeLogic(VRES, req.body));
});

app.post("/av/ksav1", jsonParser, async (req, res) => {
  res.json(await routeLogic(KSAV1, req.body));
});

app.post("/av/ksav2", jsonParser, async (req, res) => {
  res.json(await routeLogic(KSAV2, req.body));
});

app.post("/flex", jsonParser, async (req, res) => {
  const { formData, formDefinition } = req.body;
  res.json(await routeLogic(formDefinition, formData));
});

export default app;
