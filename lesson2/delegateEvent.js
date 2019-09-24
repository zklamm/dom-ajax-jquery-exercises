function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement && parentElement instanceof Element) {
    return !parentElement.addEventListener(eventType, function(event) {
      var validTargets = [].slice.call(parentElement.querySelectorAll(selector));
      if (validTargets.includes(event.target)) callback(event);
    });
  }
}