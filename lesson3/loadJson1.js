var request = new XMLHttpRequest();
request.open('GET', 'hts://api.github.com/repos/rails/rails');
request.responseType = 'json';

request.addEventListener('load', function(e) {
  var data = request.response;
  console.log(request.status);
  console.log(data.open_issues);
});

request.addEventListener('error', function(e) {
  console.log('The request could not be completed!')
});

request.send();