import request from "request";

// import KSAV1 from "../formDefinitions/KSAV1";
import fillForm from "./fillForm";
import renderImage from "./renderImage";
import base64RenderToFile from "./base64RenderToFile";
import getFormElementDimensions from "./getFormElementDimensions";
import resizeImage from "./resizeImage";
import overlayImagesThenRender from "./overlayImagesThenRender";
import imageToBase64 from "./imageToBase64";
import deleteTmpFiles from "./deleteTmpFiles";

const gm = require("gm").subClass({ imageMagick: true });
require("gm-base64");

export default async (formDefinition, formData) => {
  const base = gm(request(formDefinition.baseImg));
  // fill form
  const filledForm = await fillForm(base, formDefinition.fields, formData);
  // write filled form to tmp
  await renderImage(filledForm, "/tmp/filled_form.gif");

  let hasSignature = false;
  let imgPath = "/tmp/filled_form.gif";
  if ("signature" in formData) {
    hasSignature = true;
    imgPath = "/tmp/signed_form.gif";
    // render signature to file
    await base64RenderToFile(formData.signature, "/tmp/signature.png");

    const sigDimensions = getFormElementDimensions(
      formDefinition.fields,
      "signature"
    );
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
  console.log(formData["uuid"]+": imgPath="+imgPath+" hasSignature:"+hasSignature+" img:"+imgB64.length+" bytes");

  let response = {
    "msg": "form generated from " + formDefinition.baseImg,
    "img": imgB64
  };

  // delete tmp files
  await deleteTmpFiles("/tmp");

  return response;
};
