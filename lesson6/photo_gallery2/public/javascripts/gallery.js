// // without jquery

// document.addEventListener('DOMContentLoaded', () => {
//   const templates = {};
//   const scripts = document.querySelectorAll('script[type="text/x-handlebars"]');
//   const xhr = new XMLHttpRequest();

//   Array.from(scripts).forEach(script => {
//     templates[script.id] = Handlebars.compile(script.innerHTML);
//     script.remove();
//   });

//   xhr.open('GET', '/photos');
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', () => {
//     const photos = xhr.response;
//     const slides = document.querySelector('#slides');
//     const header = document.querySelector('section > header');

    // slides.innerHTML = templates.photos({ photos: photos });
//     header.innerHTML = templates.photo_information(photos[0]);
//   });

//   xhr.send();
// });

// with jquery

$(() => {
  const templates = {};

  $('script[type="text/x-handlebars"]').each(function() {
    $script = $(this);
    templates[$script.attr('id')] = Handlebars.compile($script.html());
  });

  $.ajax({
    url: '/photos'
  }).done(json => {
    $('#slides').html(templates.photos({ photos: json }));
    $('section > header').html(templates.photo_information(json[0]));
  });
});
