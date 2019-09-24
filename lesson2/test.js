var divRed = document.querySelector('#red');
var divBlue = document.querySelector('#blue');
var divOrange = document.querySelector('#orange');
var divGreen = document.querySelector('#green');

var tracker = (function() {
  var events = [];
  return {
    list: function() {
      return events.slice();
    },
    elements: function() {
      return this.list().map(function(event) {
        return event.target;
      });
    },
    add: function(event) {
      events.push(event);
    },
    clear: function() {
      events.length = 0;
      return events.length;
    },
  };
})();

function track(callback) {
  function isEventTracked(events, event) {
    return events.indexOf(event) !== -1;
  }

  return function(event) {
    if (!isEventTracked(tracker.list(), event)) {
      tracker.add(event);
      event.tracked = true;
    }

    callback(event);
  };
}

divRed.addEventListener('click', track(function(event) {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(function(event) {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(function(event) {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(function(event) {
  document.body.style.background = 'green';
}));