import ReduxModel from "./redux/ReduxModel";
import { parseBODLMetaData } from "../ast/parser";
import { complexBOSource } from "./examples/BODLExample";

/**
 * Application initialize state
 */
const AppInitState = {
  title: "Automation Documentation",
  source: complexBOSource,
  // calculated field
  ast: oState => parseBODLMetaData(oState.source)
};

export const GlobalStore = new ReduxModel(AppInitState);
