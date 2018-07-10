import { find } from "lodash";

export default (formDefinition, fieldName) => {
  const definition = find(formDefinition, { name: fieldName });

  return {
    x1: definition.x1,
    x2: definition.x2,
    y1: definition.y1,
    y2: definition.y2,
    width: definition.x2 - definition.x1,
    height: definition.y2 - definition.y1
  };
};
