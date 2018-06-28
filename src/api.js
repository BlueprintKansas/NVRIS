import express from 'express';
import bodyParser from 'body-parser';
import { VREN, VRES } from './formDefinitions';
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
  let form = gm('https://s3.amazonaws.com/ksvotes/FEDVRENNVRIS.png');
  _.forEach(VREN, await function(value, itr) {
    switch(value.type){
      case "draw":
        let fillText = form_payload[value.name];
        if(fillText){
          form.fontSize(40);//To be set based on length(form_payload[value.name]), (x1,y1) and (x2,y2).
          form = form.drawText(value.x1, value.y2, form_payload[value.name])
        }
        break;
      case "fill":
      if(form_payload[value.name]){
        form = form.drawRectangle(value.x1, value.y1, value.x2, value.y2)
      }      
      break;
    }
  });

  form = form.toBase64('gif', await function(err, base64){
    let img_data = `data:image/gif;charset=utf-8;base64,${base64}`
    if(err) {console.log(err)};
    console.log(img_data);
    //res.json({"img_data": img_data});
    res.json({"ENG":"form Generated"})
  });

})

app.post('/vr/es', jsonParser, async (req, res) => {
  let form_payload = req.body;
  let form = gm('https://s3.amazonaws.com/ksvotes/FEDVRSPANVRIS.png');
  _.forEach(VRES, await function(value, itr) {
      let fillText = form_payload[value.name];
      if(fillText){
        form.fontSize(40);//To be set based on length(form_payload[value.name]), (x1,y1) and (x2,y2).
        form = form.drawText(value.x1, value.y2, form_payload[value.name])
      }
  });

  form = form.toBase64('gif', await function(err, base64){
    let img_data = `data:image/gif;charset=utf-8;base64,${base64}`
    if(err) {console.log(err)};
    console.log(img_data);
    //res.json({"img_data": img_data});
    res.json({"SPA":"form Generated"})
  });

})

app.post('/ab/en', jsonParser, async (req, res) => {
  //https://s3.amazonaws.com/ksvotes/AV1NVRIS.png
  res.json({message: "ok"})
})

app.post('/ab/es', jsonParser, async (req, res) => {
  //https://s3.amazonaws.com/ksvotes/AV1NVRIS.png

  res.json({message: "ok"})
})

export default app;
