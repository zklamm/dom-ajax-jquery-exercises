function domTreeTracer(id) {
  var generations = [];

  (function trace(id) {
    var parent = document.getElementById(id).parentNode;
    var children = [].slice.call(parent.children);

    var childrenNames = children.map(function(child) {
      return child.tagName;
    });

    generations.push(childrenNames);
    if (!parent.id) return;
    trace(parent.id);
  })(id);

  return generations;
}
