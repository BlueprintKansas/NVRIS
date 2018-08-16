let newrelic = require('newrelic');

import express from "express";
import bodyParser from "body-parser";

import VRENroute from "./routes/VREN";
import VRESroute from "./routes/VRES";
import KSAV1route from "./routes/KSAV1";
import KSAV2route from "./routes/KSAV2";
import FLEXroute from "./routes/FLEX";

const app = express();
const jsonParser = bodyParser.json({limit: '50mb', extended: true});

app.locals.newrelic = newrelic;

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.post("/vr/en", jsonParser, VRENroute);
app.post("/vr/es", jsonParser, VRESroute);
app.post("/av/ksav1", jsonParser, KSAV1route);
app.post("/av/ksav2", jsonParser, KSAV2route);
app.post("/flex", jsonParser, FLEXroute);

export default app;
