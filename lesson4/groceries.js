$(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();

    var $ul = $('ul');
    var item = $('#name').val();
    var qty = +$('#quantity').val() || 1;
    var li = `<li>${qty} ${item}</li>`;

    if (item) $ul.append(li);

    this.reset();
  });
});