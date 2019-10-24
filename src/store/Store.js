import ReduxModel from "./redux/ReduxModel";

/**
 * Application initialize state
 */
const AppInitState = {
  title: "Automation Documentation",
  leftTest: ""
};

export const GlobalStore = new ReduxModel(AppInitState);
