import find from "lodash/find";
import sortBy from "lodash/sortBy";

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
    fontSize: 16,
    bold: true,
    color: "lightblue",
    ...tinyMarginTopBottom
  },
  h3: {
    fontSize: 14,
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

const findAnnotation = (node, name = "") => {
  if (node && node.annotations) {
    return find(node.annotations().annotation(), a => a.identifier()[0].getText() == name);
  } else {
    return undefined;
  }
};

const parseBlockFields = (block) => {
  if (block && block.element()) {

    const rows = [];
    const fieldAttrTypes = new Set();

    block.element().forEach(e => {
      const attrs = e.annotations().annotation();
      attrs.forEach(attr => {
        const t = attr.identifier()[0];
        fieldAttrTypes.add(t.getText());
      });
    });

    const header = sortBy(Array.from(fieldAttrTypes).map(t => ({ bold: true, text: t })), ["text"]);

    rows.push([{ bold: true, text: "Field Name" }, { bold: true, text: "Field Type" }].concat(header));

    block.element().forEach(e => {

      const fieldName = e.identifier().getText();
      const fieldType = e.typeDeclaration().getText();
      const row = [fieldName, fieldType];

      header.forEach(attrName => {
        const eleAttr = findAnnotation(e, attrName.text);
        if (eleAttr) {
          const eleAttrId = eleAttr.identifier()[1];
          const eleAttrLit = eleAttr.literal();
          // annotation exist on this field
          if (eleAttrId) {
            row.push(eleAttr.identifier()[1].getText());
          } else if (eleAttrLit) {
            row.push(eleAttrLit.getText());
          } else {
            row.push("Yes");
          }
        } else {
          row.push("No");
        }

      });

      rows.push(row);

    });

    return rows;

  } else {

    return [[]];

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

  let comments = "";

  if (bo1.comments()) {
    comments = bo1.comments().children.map(c => ({ text: c.getText(), style: "comments" })) || [];
  }

  const elementsTable = parseBlockFields(bo1.block().itemList());

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
        pageBreak: "before",
        tocItem: true
      },
      ...comments,
      {
        text: "Attributes",
        style: "h3",
        tocItem: true
      },
      {
        style: "table",
        table: {
          headerRows: 1,
          widths: ["auto", "*"],
          body: [
            [{ text: "Attribute Name", bold: true }, { text: "Attribute Description", bold: true }],
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
      },
      {
        text: "Elements",
        style: "h3",
        tocItem: true
      },
      {
        style: "table",
        table: {
          widths: new Array(elementsTable[0].length - 1).fill(`${Math.floor(100 / elementsTable[0].length)}%`).concat("*"),
          headerRows: 1,
          body: elementsTable
        }
      }
    ],
    styles
  };
};
