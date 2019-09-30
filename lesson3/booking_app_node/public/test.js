function retrieveSchedules() {
  var request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', function(e) {

  });

  request.addEventListener('timeout', function(e) {

  });

  request.addEventListener('loadend', function(e) {

  });

  request.send():
}