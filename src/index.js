import Core from "sap/ui/core/Core";
import App from "sap/m/App";
import Page from "sap/m/Page";
import ResponsiveSplitter from "sap/ui/layout/ResponsiveSplitter";
import PaneContainer from "sap/ui/layout/PaneContainer";
import SplitPane from "sap/ui/layout/SplitPane";
import MonacoEditor from "./control/MonacoEditor";
import { GlobalStore } from "./store/Store";
import MarkdownEditor from "./control/MarkdownEditor";
import { parseBODLMetaData } from "./ast/index";

Core.attachInit(() => {

  // after init, dom UIArea is available

  const app: App = <App pages={
    <Page title="{/title}">
      <ResponsiveSplitter
        rootPaneContainer={[
          <PaneContainer
            panes={[
              <SplitPane><MonacoEditor value="{/leftText}" type="text" /></SplitPane>,
              <SplitPane><MarkdownEditor value={{ path: "/leftText", formatter: parseBODLMetaData }} /></SplitPane>
            ]}
          />
        ]}
      />
    </Page>
  } />;

  app.setModel(GlobalStore).placeAt("content");

});
