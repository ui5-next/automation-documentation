import ReduxModel from "./redux/ReduxModel";

/**
 * Application initialize state
 */
const AppInitState = {
  title: "Automation Documentation",
  source: "",
  ast: [
    {
      "text": "Node1",
      "ref": "sap-icon://attachment-audio"
    },
    {
      "text": "Node2",
      "ref": "sap-icon://customer-financial-fact-sheet"
    }
  ]
};

export const GlobalStore = new ReduxModel(AppInitState);
