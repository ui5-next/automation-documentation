import ReduxModel from "./redux/ReduxModel";
import { parseBODLMetaData } from "../ast/parser";
import { documentFormatter } from "../ast/doc_formatter";

import { complexBOSource } from "./examples/BODLExample";

/**
 * Application initialize state
 */
const AppInitState = {

  title: "Automation Documentation Demo Kit",
  source: complexBOSource,

  // calculated fields
  ast: oState => parseBODLMetaData(oState.source),
  doc: oState => documentFormatter(oState.source)

};

export const GlobalStore = new ReduxModel(AppInitState);
