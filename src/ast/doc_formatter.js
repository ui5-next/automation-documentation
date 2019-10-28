
const tinyMarginSize = 10;

const tinyMarginTopBottom = { margin: [0, tinyMarginSize, 0, tinyMarginSize] };

const tinyMarginLeft = { margin: [tinyMarginSize, 0, 0, 0] };

const tinyMargin = { margin: new Array(4).fill(tinyMarginSize) };

const styles = {
  h1: {
    fontSize: 25,
    bold: true,
    color: "lightblue",
    ...tinyMarginTopBottom
  },
  h2: {
    fontSize: 23,
    bold: true,
    color: "lightblue",
    ...tinyMarginTopBottom
  },
  header: {
    color: "grey",
    ...tinyMargin
  },
  comments: {
    color: "green",
    ...tinyMarginLeft
  },
  table: {
    ...tinyMargin
  }
};

export const documentFormatter = (source) => {

  // eslint-disable-next-line no-undef
  const program = parseBODLSource(source);

  const bo1 = program.definitions().definition()[0];

  let BOName = bo1.identifier().getText();

  let BOLabel = bo1.annotations().annotation().find(a => a.identifier()[0].getText() == "Label");

  let BOLabelName = "";

  if (BOLabel) {
    BOLabelName = BOLabel.literal().getText();
  }

  let comments = bo1.comments().getText();


  return {
    header: {
      columns: [{ text: `Generated Document - ${BOLabelName || BOName}`, style: "header" }]
    },
    info: {
      title: `Generated Document - ${BOLabelName || BOName}`
    },
    content: [
      {
        toc: {
          title: { text: "Table of contents", style: "h1" }
        }
      },
      {
        text: `Business Object ${BOLabelName || BOName}`,
        style: "h2",
        tocItem: true
      },
      {
        text: comments,
        style: "comments"
      },
      {
        text: "Attributes",
        style: "h2",
        tocItem: true

      },
      {
        style: "table",
        table: {
          headerRows: 1,
          widths: ["auto", "*"],
          body: [
            ["Attribute Name", "Attribute Description"],
            ...bo1.annotations().annotation().map(a => {
              var rt = new Array(2).fill("");
              var ids = a.identifier();
              switch (ids.length) {
              case 1:
                rt[0] = ids[0].getText();
                var lit = a.literal();
                if (lit) {
                  rt[1] = lit.getText();
                }
                break;
              case 2:
                rt[0] = ids[0].getText();
                rt[1] = ids[1].getText();
                break;
              default:
                break;
              }
              return rt;

            })
          ]
        }
      }
    ],
    styles
  };
};
