import express from 'express';
import bodyParser from 'body-parser';
const form = require('./imageManipulation').form
import { VR } from './formDefinitions';
import { _ } from 'lodash';
const app = express();
const jsonParser = bodyParser.json();

var gm = require('gm').subClass({ imageMagick: true });
require('gm-base64');

app.get('/', (req, res) => {

  res.json({ message: 'ok' });
});

app.post('/vr/en', jsonParser, async (req, res) => {
  let form_payload = req.body;
  //Kunal I think we can break out the form stuff into its own generator function?  maybe takes an form definition with url and the form payload?  that way we can reuse it on every endpoint?
  let form = gm('https://s3.amazonaws.com/ksvotes/FEDVRENNVRIS.png').fontSize(40);
  _.forEach(VR, await function(value, itr) {
    switch(value.type){
      case "draw":
        let fillText = form_payload[value.name];
        if(fillText){
          form = form.drawText(value.x, value.y, form_payload[value.name])
        }
        break;
      case "fill":
        //needs rectangle boxes
        break;
    }
  });

  form = form.toBase64('gif', await function(err, base64){
    let img_data = `data:image/gif;charset=utf-8;base64,${base64}`
    if(err) {console.log(err)};
    console.log(img_data);
    // res.json({"img_data": img_data});
    res.json({"hi":"WORLD"})
  });

})

app.post('/vr/es', jsonParser, async (req, res) => {
  //https://s3.amazonaws.com/ksvotes/FEDVRSPANVRIS.png
  res.json({message: "ok"})
})

app.post('/ab/en', jsonParser, async (req, res) => {
  //https://s3.amazonaws.com/ksvotes/AV1NVRIS.png
  res.json({message: "ok"})
})

app.post('/ab/es', jsonParser, async (req, res) => {
  //https://s3.amazonaws.com/ksvotes/AV1NVRIS.png

  res.json({message: "ok"})
})

app.use(express.static('staticForms'));

export default app;
