import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import SimpleMDE from "simplemde";
import includeStylesheet from "sap/ui/dom/includeStylesheet";


interface Props {
  /**
   * markdown text value
   */
  value: any
}

export default class MarkdownEditor extends Control<Props> {

  metadata = {
    properties: {
      value: {
        type: "string",
        defaultValue: ""
      }
    }
  }

  init() {

    super.init();

    includeStylesheet("https://cdn.bootcss.com/simplemde/1.11.2/simplemde.min.css");

    this._oEditorDomRef = document.createElement("textarea");
    this._oEditorDomRef.style.height = "100%";
    this._oEditorDomRef.style.width = "100%";

    this.setBusyIndicatorDelay(0);

  }

  setValue(sValue) {
    if (this._oEditor) {
      this._oEditor.value(`${sValue}`);
    }
    this.setProperty("value", sValue, true);
    return this;
  }

  onAfterRendering() {

    var oDomRef = this.getDomRef();

    oDomRef.appendChild(this._oEditorDomRef);

    this._oEditor = new SimpleMDE({ element: this._oEditorDomRef, initialValue: "# title" });

  }


  renderer(oRm: RenderManager, oControl) {
    oRm.openStart("div");
    oRm.writeControlData(oControl);
    oRm.addStyle("width", "100%");
    oRm.addStyle("height", "100%");
    oRm.writeStyles();
    oRm.writeClasses();
    oRm.openEnd("div");
    oRm.close("div");
  }


}
