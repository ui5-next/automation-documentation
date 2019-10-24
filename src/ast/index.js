import includeJavaScript from "sap/ui/dom/includeScript";

// load grammar parser
includeJavaScript("https://unpkg.com/grammar-pdi@1.0.4/dist/grammar-pdi-umd.js");

export const parseBODLMetaData = (source = "") => {
  // eslint-disable-next-line no-undef
  const program = parseBODLSource(source);
  const definition = program.definitions().children[0];
  const id = definition.identifier().getText();
  return `# ${id}`;
};
