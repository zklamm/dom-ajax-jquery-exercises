<<<<<<< Updated upstream
async function getSchedules() {
  let schedules = fetch('http://localhost:3000/api/schedules')
  .then(request => request.json())
  .catch(err => console.error(err));

  let timer = new Promise(function(resolve, reject) {
    setTimeout(resolve, 5000, 'Timeout');
  });

  Promise.race([timer, schedules])
  .then(function(value) {
    if (value !== 'Timeout') {
      let schedules = getAvailableSchedules(value);
      schedules = convertStaffAndCount(schedules);
      appendParagraphs(schedules);
    } else {
      alert('We are experiencing heavy traffic. Please try again.');
    }

    return;
=======
// function retrieveSchedules() {
//   var request = new XMLHttpRequest();

//   request.open('GET', 'http://localhost:3000/api/schedules');
//   request.timeout = 5000;
//   request.responseType = 'json';

//   request.addEventListener('load', function(e) {
//     var schedules = request.response;
//     var staffs = [];
//     var tally = [];

//     if (schedules.length > 0) {
//       schedules.forEach(function(schedule) {
//         var key = "staff" + String(schedule.staff_id);
//         if (staffs.indexOf(key) === -1) {
//           staffs.push(key);
//           tally.push(1);
//         } else {
//           tally[staffs.indexOf(key)] += 1;
//         }
//       });

//       alert(tally.map(function(_, index) {
//         return staffs[index] + ": " + tally[index];
//       }).join("\n"));
//     } else {
//       alert('There are currently no schedules available for booking.');
//     }
//   });

//   request.addEventListener('timeout', function(e) {
//     alert('It is taking longer than usual. Please try again later.')
//   });

//   request.addEventListener('loadend', function() {
//     alert('The request has completed.')
//   });

//   request.send();
// }





// write a function that retrieves all available schedules
// if one or more schedules are available, alert the user with key-value pairs with staff id as key and the count of the value
// else alert the user that there are no schedules available
//the server has been known to slow down when there are more than 7 schedules to retrieve (this doesn't always happen, but be sure to handle it accordingly)
// once 5 seconds has passed, cancel the retrieval and alert the user to try again
// finally, inform the user about the completion of the request regardless of the succes or failure (timeout) of the request

const retrieveSchedules = () => {
  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/api/schedules');
  request.responseType = 'json';
  request.timeout = 5000;

  request.addEventListener('load', () => {
    let json = this.response;
    console.log(json);
>>>>>>> Stashed changes
  });
}

function getAvailableSchedules(allSchedules) {
  return allSchedules.filter((schedule) => schedule.student_email === null);
}

function convertStaffAndCount(allSchedules) {
  let staffCounts = {};

<<<<<<< Updated upstream
  allSchedules.forEach(function(schedule) {
    if (!staffCounts[schedule.staff_id]) {
      staffCounts[schedule.staff_id] = 0;
    }

    staffCounts[schedule.staff_id] += 1;
  });

  return staffCounts;
}

function appendParagraphs(schedules) {
  staffIDS = Object.keys(schedules);

  if (staffIDS.length === 0) {
    let idParagraph = document.createElement('p');
    idParagraph.textContent = 'No Staff members have spots available.';
    document.getElementById('content').appendChild(idParagraph);
  } else {
    staffIDS.forEach(function(id) {
      let idParagraph = document.createElement('p');
      idParagraph.textContent = `The Staff member with ID #${id} has ${schedules[id]} spots available.`;
      document.getElementById('content').appendChild(idParagraph);
    });    
  }

  return;
}

document.addEventListener('DOMContentLoaded', function(e) {
  getSchedules();
});
=======
  request.addEventListener('loadend', () => {
    alert('The request has completed.');
  });

  request.send();
};

retrieveSchedules();






























>>>>>>> Stashed changes
