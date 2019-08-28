function arrayToNodes(nodes) {
  var parent = document.createElement(nodes[0]);
  var children = [].slice.call(nodes[1]);

  if (children.length > 0) {
    children.forEach(function(child) {
      parent.appendChild(arrayToNodes(child));
    });
  }

  return parent;
}