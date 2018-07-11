import express from "express";
import bodyParser from "body-parser";

import VRENroute from "./routes/VREN";
import VRESroute from "./routes/VRES";

const app = express();
const jsonParser = bodyParser.json();

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.post("/vr/en", jsonParser, VRENroute);
app.post("/vr/es", jsonParser, VRESroute);

export default app;
