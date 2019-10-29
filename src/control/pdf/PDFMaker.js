/* eslint-disable no-undef */
import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";

interface Props {
  value?: any;
}

export default class PDFMaker extends Control<Props> {

  metadata = {
    properties: {
      value: {
        type: "object",
        group: "Misc",
        defaultValue: ""
      }
    }
  }

  init() {

    super.init();

    this._pdfRef = document.createElement("iframe");
    this._pdfRef.type = "application/pdf";
    this._pdfRef.style.height = "100%";
    this._pdfRef.style.width = "100%";
    this._pdfRef.src = "about:blank";

    this.setBusyIndicatorDelay(0);

  }

  onAfterRendering() {

    var oDomRef = this.getDomRef();

    oDomRef.appendChild(this._pdfRef);

  }

  setValue(value) {

    if(this._pdfRef){
      pdfMake.createPdf(value).getDataUrl(data => {
        this._pdfRef.src = data;
      });
    }

    return this;
  }

  renderer(oRm: RenderManager, oControl) {
    oRm.openStart("div");
    oRm.writeControlData(oControl);
    oRm.addStyle("width", "100%");
    oRm.addStyle("height", "100%");
    oRm.writeStyles();
    oRm.writeClasses();
    oRm.openEnd();
    oRm.close("div");
  }


}
