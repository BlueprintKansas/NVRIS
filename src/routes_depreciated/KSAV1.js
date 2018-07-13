// import request from "request";

import KSAV1 from "../formDefinitions/KSAV1";
// import fillForm from "../helpers/fillForm";
// import renderImage from "../helpers/renderImage";
// import base64RenderToFile from "../helpers/base64RenderToFile";
// import getFormElementDimensions from "../helpers/getFormElementDimensions";
// import resizeImage from "../helpers/resizeImage";
// import overlayImagesThenRender from "../helpers/overlayImagesThenRender";
// import imageToBase64 from "../helpers/imageToBase64";
// import deleteTmpFiles from "../helpers/deleteTmpFiles";
import routeLogic from "../helpers/routeLogic";

// const path = require("path");

// const Promise = require("bluebird");
// // const fs = require('fs');
// const gm = require("gm").subClass({ imageMagick: true });
// require("gm-base64");

// Promise.promisifyAll(gm.prototype);

export default async (req, res) => {
  const formPayload = req.body;
  // const response = await routeLogic(KSAV1, formPayload);
  // console.log("!!! response", response);
  res.json(await routeLogic(KSAV1, formPayload));

  // const base = gm(request("https://s3.amazonaws.com/ksvotes/AV1NVRIS.png"));
  // // fill form
  // const filledForm = await fillForm(base, KSAV1, formPayload);
  // // write filled form to tmp
  // await renderImage(filledForm, "/tmp/filled_form.gif");

  // let hasSignature = false;
  // if ("signature" in formPayload) {
  //   hasSignature = true;
  //   // render signature to file
  //   await base64RenderToFile(formPayload.signature, "/tmp/signature.png");

  //   const sigDimensions = getFormElementDimensions(KSAV1, "signature");
  //   await resizeImage(
  //     "/tmp/signature.png",
  //     sigDimensions.width,
  //     sigDimensions.height
  //   );

  //   // overlay signature on filled form
  //   await overlayImagesThenRender(
  //     "/tmp/signature.png",
  //     "/tmp/filled_form.gif",
  //     sigDimensions.x1,
  //     sigDimensions.y1,
  //     "/tmp/signed_form.gif"
  //   );
  // }

  // // now we are ready to send response
  // let response;
  // if (hasSignature) {
  //   response = {
  //     KSAV1: "form Generated",
  //     img: await imageToBase64("/tmp/signed_form.gif", "png")
  //   };
  // } else {
  //   response = {
  //     KSAV1: "form Generated",
  //     img: await imageToBase64("/tmp/filled_form.gif", "png")
  //   };
  // }

  // // delete tmp files
  // await deleteTmpFiles("/tmp");

  // res.json(response);
};
