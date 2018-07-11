import express from "express";
import bodyParser from "body-parser";

import VRENroute from "./routes/VREN";
import VRESroute from "./routes/VRES";
import KSAV1route from "./routes/KSAV1";
import KSAV2route from "./routes/KSAV2";

const app = express();
const jsonParser = bodyParser.json();

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.post("/vr/en", jsonParser, VRENroute);
app.post("/vr/es", jsonParser, VRESroute);
app.post("/av/ksav1", jsonParser, KSAV1route);
app.post("/av/ksav2", jsonParser, KSAV2route);

export default app;
