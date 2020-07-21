import request from "request";

import KSAV1 from "../formDefinitions/KSAV1";
import fillForm from "../helpers/fillForm";
import renderImage from "../helpers/renderImage";
import base64RenderToFile from "../helpers/base64RenderToFile";
import getFormElementDimensions from "../helpers/getFormElementDimensions";
import resizeImage from "../helpers/resizeImage";
import overlayImagesThenRender from "../helpers/overlayImagesThenRender";
import imageToBase64 from "../helpers/imageToBase64";
import deleteTmpFiles from "../helpers/deleteTmpFiles";


const Promise = require("bluebird");
const gm = require("gm").subClass({ imageMagick: true });
require("gm-base64");
const fs = require("fs");

Promise.promisifyAll(gm.prototype);

export default async (req, res) => {
  const formPayload = req.body;

  const fontFile = '/tmp/helvetica.ttf';
  request('https://ksvotes-v2.s3.amazonaws.com/helvetica.ttf').pipe(fs.createWriteStream(fontFile));

  const base = gm(request("https://s3.amazonaws.com/ksvotes/AV1NVRIS.png")).font(fontFile);
  // fill form
  const filledForm = await fillForm(base, KSAV1, formPayload);
  // write filled form to tmp
  await renderImage(filledForm, "/tmp/filled_form.gif");

  let hasSignature = false;
  let imgPath = "/tmp/filled_form.gif";
  if ("signature" in formPayload) {
    hasSignature = true;
    imgPath = "/tmp/signed_form.gif";
    // render signature to file
    await base64RenderToFile(formPayload.signature, "/tmp/signature.png");

    const sigDimensions = getFormElementDimensions(KSAV1, "signature");
    await resizeImage(
      "/tmp/signature.png",
      sigDimensions.width,
      sigDimensions.height
    );

    // overlay signature on filled form
    await overlayImagesThenRender(
      "/tmp/signature.png",
      "/tmp/filled_form.gif",
      sigDimensions.x1,
      sigDimensions.y1,
      "/tmp/signed_form.gif"
    );
  }

  // now we are ready to send response
  let imgB64 = await imageToBase64(imgPath, "png");
  console.log(formPayload["uuid"] + ": imgPath=" + imgPath + " hasSignature:" + hasSignature + " img:" + imgB64.length + " bytes");
  let response = {
    KSAV1: "form Generated",
    img: imgB64
  };

  // delete tmp files
  await deleteTmpFiles("/tmp");

  res.json(response);
};
