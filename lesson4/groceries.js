// $(function() {
//   $('form').on('submit', function(e) {
//     e.preventDefault();

//     var $ul = $('ul');
//     var item = $('#name').val();
//     var qty = +$('#quantity').val() || 1;
//     var li = `<li>${qty} ${item}</li>`;

//     if (item) $ul.append(li);

//     this.reset();
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const ul = document.querySelector('ul');
    const item = document.querySelector('#name').value;
    const qty = document.querySelector('#quantity').value || 1;
    let li = document.createElement('li');
    li.textContent = `${qty} ${item}`;

    if (item) ul.append(li);

    form.reset();
  });
});