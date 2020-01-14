// document.addEventListener('DOMContentLoaded', () => {
//   const figcaption = document.querySelector('figcaption');
//   const img = document.querySelector('img');
//   let duration;

//   img.addEventListener('mouseover', () => {
//     duration = setTimeout(() => figcaption.removeAttribute('hidden'), 2000);
//   });

//   img.addEventListener('mouseout', () => {
//     figcaption.setAttribute('hidden', true);
//     clearTimeout(duration);
//   });
// });

$(() => {
  const App = {
    figcap: $('figcaption'),

    mouseIn() {
      this.timer = setTimeout(() => this.figcap.fadeIn(), 2000);
    },

    mouseOut() {
      this.figcap.fadeOut();
      clearTimeout(this.timer);
    },

    init() {
      $('img').hover(() => this.mouseIn(), () => this.mouseOut());
    }
  };

  App.init();
});