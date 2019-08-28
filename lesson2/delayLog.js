var counterId;

function startCounting() {
  var count = 1;

  counterId = setInterval(function() {
    console.log(count);
    count++;
  }, 1000);
}

function stopCounting() {
  clearInterval(counterId);
}