import md5 from "blueimp-md5";
import trimStart from "lodash/trimStart";
import trimEnd from "lodash/trimEnd";


const normalizeComment = (s = "") => {
  return trimEnd(trimStart(s.trim(), "/*"), "*/").split("\n").map(l => trimStart(l.trim(), "*")).filter(v => v)
    .join("\n");
};

const parseComment = n => {
  if (n.comments && n.comments()) {
    return (n.comments().children || []).map(c => normalizeComment(c.getText())).join("\n");
  } else {
    return "";
  }
};

const parseAnnotation = a => {
  var rt = {};
  var ids = a.identifier();
  if (ids) {
    switch (ids.length) {
    case 1:
      rt.type = ids[0].getText();
      break;
    case 2:
      rt.type = ids[0].getText();
      rt.description = ids[1].getText();
      break;
    default:
      break;
    }

  }
  rt.nodeType = "attribute";

  var lit = a.literal();
  if (lit) {
    rt.description = lit.getText();
  }
  return rt;
};

const parseAttributes = o => {
  return {
    type: "Attributes",
    nodes: o.annotations().annotation().map(parseAnnotation)
  };
};

const parseElements = n => {
  return {
    type: "Elements",
    nodes: n.block().itemList().element().map(e => ({
      type: e.identifier().getText(),
      nodeType: "element (field)",
      comment: parseComment(e),
      description: e.typeDeclaration().getText(),
      nodes: [parseAttributes(e)]
    }))
  };
};

const parseActions = n => ({
  type: "Actions",
  nodes: n.block().itemList().boAction().map(a => ({
    nodeType: "Action",
    type: a.identifier().getText(),
    nodes: parseAttributes(a)
  }))
});

const parseAssociations = n => ({
  type: "Associations",
  nodes: n.block().itemList().association().map(a => ({
    nodeType: "Association",
    type: a.identifier().getText()
  }))
});

const parseMessages = n => ({
  type: "Messages",
  nodes: n.block().itemList().message().map(m => ({
    nodeType: "Message",
    type: m.identifier().getText(),
    // eslint-disable-next-line new-cap
    description: m.StringLiteral().getText()

  }))
});

const parseNode = n => {
  const id = n.identifier().getText();

  return {
    description: id,
    nodeType: "Node",
    comment: parseComment(n),
    nodes: n.block() ? [
      parseAttributes(n),
      parseMessages(n),
      parseElements(n),
      {
        type: "Nodes",
        nodes: n.block().itemList().node().map(parseNode)
      },
      parseActions(n),
      parseAssociations(n)
    ] : []
  };
};

const cache = new Map();

export const parseBODLMetaData = (source = "") => {

  const hash = md5(source);

  if (cache.has(hash)) {
    return cache.get(hash);
  }

  // eslint-disable-next-line no-undef
  const program = parseBODLSource(source);

  const rt = program.definitions().definition().map(parseNode);

  cache.set(hash, rt);

  return rt;

};
