function retrieveSchedules() {
  var request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', function(e) {
    var schedules = request.response;
    var staffs = [];
    var tally = [];

    if (schedules.length > 0) {
      schedules.forEach(function(schedule) {
        var key = "staff" + String(schedule.staff_id);
        if (staffs.indexOf(key) === -1) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      });

      alert(tally.map(function(_, index) {
        return staffs[index] + ": " + tally[index];
      }).join("\n"));
    } else {
      alert('There are currently no schedules available for booking.');
    }
  });

  request.addEventListener('timeout', function(e) {
    alert('It is taking longer than usual. Please try again later.')
  });

  request.addEventListener('loadend', function() {
    alert('The request has completed.')
  });

  request.send();
}