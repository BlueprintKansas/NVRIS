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
  // console.log("!! form def", formDefinition);
  console.log("!!!", formDefinition.baseImg);
  const base = gm(request(formDefinition.baseImg));
  // fill form
  const filledForm = await fillForm(base, formDefinition.fields, formData);
  // write filled form to tmp
  await renderImage(filledForm, "/tmp/filled_form.gif");

  let hasSignature = false;
  if ("signature" in formData) {
    hasSignature = true;
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
  let response;
  if (hasSignature) {
    response = {
      message: "form Generated",
      img: await imageToBase64("/tmp/signed_form.gif", "png")
    };
  } else {
    response = {
      message: "form Generated",
      img: await imageToBase64("/tmp/filled_form.gif", "png")
    };
  }
  // console.log(response);
  // delete tmp files
  await deleteTmpFiles("/tmp");

  return response;
};
