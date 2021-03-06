import { forEach } from "lodash";

export default (base, formDefinition, bodyPayload) =>
  new Promise(resolve => {
    let iBase = base;
    forEach(formDefinition, value => {
      switch (value.type) {
        case "draw":
          if (bodyPayload[value.name]) {
            // Size to be reset based on length(form_payload[value.name]), (x1,y1) and (x2,y2).
            iBase.fill("blue").fontSize(24);
            iBase = iBase.drawText(value.x1, value.y2, bodyPayload[value.name]);
          }
          break;
        case "fill":
          if (bodyPayload[value.name]) {
            iBase.fill("blue");
            iBase = iBase.drawRectangle(value.x1, value.y1, value.x2, value.y2);
          }
          break;
        case "circle":
          if (bodyPayload[value.name]) {
            // iBase = iBase.drawRectangle(value.x1, value.y1, value.x2, value.y2);
            iBase = iBase
              .stroke("blue", 0)
              .fill("rgba( 255, 255, 255 , 0 )")
              .drawRectangle(value.x1, value.y1, value.x2, value.y2);
          }
          break;
        default:
          break;
      }
    });
    resolve(iBase);
  });
