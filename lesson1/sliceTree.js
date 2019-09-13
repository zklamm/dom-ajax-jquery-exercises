function sliceTree(start, end) {
  var slice = [];

  function populateSlice(child) {
    slice.unshift(child.tagName);

    while (child.id !== String(start)) {
      child = child.parentNode;
      slice.unshift(child.tagName);
    }
  }

  (function search(id) {
    var element = document.getElementById(id);
    var children = element.children;

    if (children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        child.id === String(end) ? populateSlice(child) : search(child.id);
      }
    }
  })(start);

  return slice.length > 0 ? slice : undefined;
}
