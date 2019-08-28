function nodeSwap(node1Id, node2Id) {
  var node1 = document.getElementById(node1Id);
  var node2 = document.getElementById(node2Id);

  if (!isInvalidSwap(node1, node2)) {
    var node1Clone = node1.cloneNode(true);
    var node2Clone = node2.cloneNode(true);
    var node1Parent = node1.parentNode;
    var node2Parent = node2.parentNode;

    node1Parent.replaceChild(node2Clone, node1);
    node2Parent.replaceChild(node1Clone, node2);
    return true;
  }
}

function isInvalidSwap(node1, node2) {
  return ((!node1 || !node2) ||
         node1.contains(node2) || node2.contains(node1));
}