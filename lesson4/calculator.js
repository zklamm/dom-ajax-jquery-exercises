$(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();

    var left = +$('#numerator').val();
    var right = +$('#denominator').val();
    var operator = $('#operator').val();
    var $result = $('h1');

    switch (operator) {
      case '+':
        $result.text(left + right);
        break;
      case '-':
        $result.text(left - right);
        break;
      case '*':
        $result.text(left * right);
        break;
      case '/':
        $result.text(left / right);
        break;
    }
  });
});