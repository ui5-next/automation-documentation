import Core from "sap/ui/core/Core";
import App from "sap/m/App";
import Page from "sap/m/Page";
import ResponsiveSplitter from "sap/ui/layout/ResponsiveSplitter";
import PaneContainer from "sap/ui/layout/PaneContainer";
import SplitPane from "sap/ui/layout/SplitPane";
import { GlobalStore } from "./store/Store";
import MonacoEditor from "./control/monaco/MonacoEditor";
import Tree from "sap/m/Tree";
import FlexBox from "sap/m/FlexBox";
import CustomTreeItem from "sap/m/CustomTreeItem";
import includeScript from "sap/ui/dom/includeScript";
import GenericTag from "sap/m/GenericTag";
import FlexDirection from "sap/m/FlexDirection";
import Text from "sap/m/Text";
import InfoLabel from "sap/tnt/InfoLabel";

Core.attachInit(() => {

  // load grammar parser
  includeScript("https://unpkg.com/grammar-pdi@1.0.5/dist/grammar-pdi-umd.js", "grammar-pdi", () => {

    // after init, dom UIArea is available

    const app: App = <App pages={
      <Page title="{/title}">
        <ResponsiveSplitter
          rootPaneContainer={[
            <PaneContainer
              panes={[
                <SplitPane>
                  <MonacoEditor value="{/source}" type="bodl" />
                </SplitPane>,
                <SplitPane>
                  <Tree
                    items={{
                      path: "/ast",
                      template: (
                        <CustomTreeItem>
                          <FlexBox
                            direction={FlexDirection.Column}
                            items={[
                              <InfoLabel class="sapUiTinyMargin" text="{nodeType}" visible={{ path: "nodeType", formatter: v => Boolean(v) }} />,
                              <Text class="sapUiTinyMargin" text="{comment}" visible={{ path: "comment", formatter: v => Boolean(v) }} />,
                              <FlexBox direction={FlexDirection.Row}
                                items={[
                                  <GenericTag
                                    class="sapUiTinyMarginBeginEnd"
                                    visible={{ path: "type", formatter: v => Boolean(v) }}
                                    text="{type}"
                                  />,
                                  <GenericTag
                                    class="sapUiTinyMarginBeginEnd"
                                    visible={{ path: "description", formatter: v => Boolean(v) }}
                                    text="{description}"
                                  />
                                ]}
                              />
                            ]}
                          />

                        </CustomTreeItem>
                      )
                    }}
                  />
                </SplitPane>
              ]}
            />
          ]}
        />
      </Page>
    } />;

    app.setModel(GlobalStore).placeAt("content");
  });



});
