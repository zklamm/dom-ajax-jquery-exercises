function nodeToArray() {
  return (function organize(element) {
    var children = [].slice.call(element.children);

    if (children.length === 0) {
      return [element.tagName, []];
    } else {
      return [element.tagName, children.map(function(child) {
        return organize(child);
      })];
    }
  })(document.body);
}
