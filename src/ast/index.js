import { parseBODL } from "grammar-pdi";

export const parseBODLMetaData = (source = "") => {
  const program = parseBODL(source);
  const definition = program.definitions().children[0];
  const id = definition.identifier().getText();
  return `# ${id}`;
};
