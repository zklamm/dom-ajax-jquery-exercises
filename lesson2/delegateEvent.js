function delegateEvent(parentElement, selector, eventType, callback) {
  var child = parentElement.querySelector(selector);

  if (child) {
    child.addEventListener(eventType, callback);
    return true;
  }

  return undefined;
}
