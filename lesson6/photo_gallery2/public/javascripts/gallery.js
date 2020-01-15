document.addEventListener('DOMContentLoaded', () => {
  const templates = {};
  const scripts = document.querySelectorAll('script[type="text/x-handlebars"]');
  const xhr = new XMLHttpRequest();
  let photos;

  Array.from(scripts).forEach(script => {
    templates[script.id] = Handlebars.compile(script.innerHTML);
    script.remove();
  });

  Handlebars.registerPartial('comment', templates.photo_comment);

  const slideshow = {
    buttons: document.querySelector('#slideshow ul'),

    getCurrentSlide(figs) {
      return figs.filter(fig => {
        return getComputedStyle(fig).getPropertyValue('display') === 'block';
      })[0];
    },

    updateDisplay(currentSlide, newSlide) {
      currentSlide.style.display = 'none';
      newSlide.style.display = 'block';
    },

    getNewSlide(figs, currentSlide, previousWasClicked) {
      if (previousWasClicked) {
        return currentSlide.previousElementSibling || figs[figs.length - 1];
      } else {
        return currentSlide.nextElementSibling || figs[0];
      }
    },

    changeSlide(e) {
      e.preventDefault();
      const figs = Array.from(document.querySelectorAll('#slides figure'));
      const currentSlide = this.getCurrentSlide(figs);
      let newSlide = this.getNewSlide(figs, currentSlide, e.target.className === 'prev')
      this.updateDisplay(currentSlide, newSlide);
    },

    bind() {
      this.buttons.addEventListener('click', this.changeSlide.bind(this));
    },

    init() {
      this.bind();
    },
  };

  xhr.open('GET', '/photos');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    photos = xhr.response;
    renderPhotos();
    renderPhotoInformation(0);
    slideshow.init();
    getCommentsFor(photos[0].id);
  });

  xhr.send();

  function renderPhotos() {
    const slides = document.querySelector('#slides');
    slides.innerHTML = templates.photos({ photos: photos });
  }

  function renderPhotoInformation(idx) {
    const header = document.querySelector('section > header');
    header.innerHTML = templates.photo_information(photos[idx]);
  }

  function getCommentsFor(idx) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `/comments?photo_id=${idx}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      const comments = document.querySelector('#comments > ul');
      comments.innerHTML = templates.photo_comments({ comments: xhr.response });
    });

    xhr.send();
  }
});

// with jquery

// $(() => {
//   const templates = {};
//   let photos;

//   $('script[type="text/x-handlebars"]').each(function() {
//     $script = $(this).remove();
//     templates[$script.attr('id')] = Handlebars.compile($script.html());
//   });

//   Handlebars.registerPartial('comment', templates.photo_comment);

//   $.ajax({
//     url: '/photos'
//   }).done(json => {
//     photos = json;
//     renderPhotos();
//     renderPhotoInformation(0);
//     getCommentsFor(photos[0].id);
//   });


//   function renderPhotos() {
//     $('#slides').html(templates.photos({ photos: photos }));
//   }

//   function renderPhotoInformation(idx) {
//     $('section > header').html(templates.photo_information(photos[idx]));
//   }

//   function getCommentsFor(idx) {
//     $.ajax({
//       url: '/comments',
//       data: `photo_id=${idx}`
//     }).done(json => {
//       $('#comments > ul').html(templates.photo_comments({ comments: json }));
//     });
//   }
// });
