$(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    var char = $('input').val();

    $(document).off('keypress').on('keypress', function(e) {
      if (e.key !== char) return;
      $('a').trigger('click');
    });
  });

  $('a').on('click', function(e) {
    e.preventDefault();
    $('#accordion').slideToggle();
  });
});
