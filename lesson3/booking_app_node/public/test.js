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
  });
}

function getAvailableSchedules(allSchedules) {
  return allSchedules.filter((schedule) => schedule.student_email === null);
}

function convertStaffAndCount(allSchedules) {
  let staffCounts = {};

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