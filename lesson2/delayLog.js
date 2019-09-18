function makeBold(elem, callback) {
  elem.style.fontWeight = 'bold';
  if (callback && typeof callback === 'function') {
    callback(elem);
  }
}