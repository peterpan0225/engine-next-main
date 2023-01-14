export default function getAttributes(node) {
  if (node?.hasAttributes()) {
    var attrs = node.attributes;
    var output = {};
    for (var i = attrs?.length - 1; i >= 0; i--) {
      output[attrs[i].name] = attrs[i].value;
    }
    return output;
  } else {
    return {};
  }
}
