$(function() {
  var $header = $('body > header');
  var $figures = $('figure');
  var $figCaptions = $('figcaption');

  $('body').prepend($header);
  $header.prepend($('main > h1'));
  $('article').append($figures[1], $figures[0]);
  $figures[0].append($figCaptions[1]);
  $figures[1].append($figCaptions[0]);
});