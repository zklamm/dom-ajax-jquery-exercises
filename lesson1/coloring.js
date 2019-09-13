function colorGeneration(targetGeneration) {
  var generation = 0;
  var parents = [document.body];
  var elements;

  while (generation < targetGeneration) {
    generation += 1;
    elements = getAllChildrenOf(parents);
    parents = elements;
  }

  if (elements) color(elements);
}

function color(elements) {
  elements.forEach(function(element) {
    element.classList.add('generation-color');
  });
}

function getAllChildrenOf(parents) {
  return parents.map(function(element) {
    return [].slice.call(element.children);
  }).reduce(function(collection, children) {
    return collection.concat(children);
  }, []);
}
