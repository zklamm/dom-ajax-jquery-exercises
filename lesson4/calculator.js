// $(function() {
//   $('form').on('submit', function(e) {
//     e.preventDefault();

//     var left = +$('#numerator').val();
//     var right = +$('#denominator').val();
//     var operator = $('#operator').val();
//     var $result = $('h1');

//     switch (operator) {
//       case '+':
//         $result.text(left + right);
//         break;
//       case '-':
//         $result.text(left - right);
//         break;
//       case '*':
//         $result.text(left * right);
//         break;
//       case '/':
//         $result.text(left / right);
//         break;
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const left = +document.querySelector('#numerator').value;
    const right = +document.querySelector('#denominator').value;
    const operator = document.querySelector('#operator').value;
    let result = document.querySelector('h1');

    switch (operator) {
      case '+': {
        result.textContent = left + right;
        break;
      }
      case '-': {
        result.textContent = left - right;
        break;
      }
      case '*': {
        result.textContent = left * right;
        break;
      }
      case '/': {
        result.textContent = left / right;
        break;
      }
    }
  });
});