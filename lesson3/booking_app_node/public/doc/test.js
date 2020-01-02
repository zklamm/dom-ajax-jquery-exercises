// write a function that retrieves all available schedules
// if one or more schedules are available, alert the user with key-value pairs with staff id as key and the count of the value
// else alert the user that there are no schedules available
//the server has been known to slow down when there are more than 7 schedules to retrieve (this doesn't always happen, but be sure to handle it accordingly)
// once 5 seconds has passed, cancel the retrieval and alert the user to try again
// finally, inform the user about the completion of the request regardless of the succes or failure (timeout) of the request

function getAvailableSchedules() {
  const url = '/api/schedules';
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.timeout = 5000;

  xhr.addEventListener('load', () => {
    const available = xhr.response.filter(sched => !sched.student_email);
    const staffIds = [];
    const tally = {};
    const message = [];

    available.forEach(sched => {
      if (staffIds.includes(sched.staff_id)) return;
      staffIds.push(sched.staff_id);
    });

    (function() {
      staffIds.forEach(id => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `${url}/${id}`);
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
          tally[id] = xhr.response.length;
        });

        xhr.send();
      });
    })();

    Object.keys(tally).forEach(key => {
      message.push(`staff ${key}: ${tally[key]}`);
    });

    alert(message);
  });

  xhr.addEventListener('timeout', () => alert('Try again later.'));
  xhr.addEventListener('loadend', () => alert('Request completed.'));
  xhr.send();
}
