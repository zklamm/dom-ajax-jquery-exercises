// var App = {
//   startTimer: function(e) {
//     this.timer = setTimeout(function() {
//       this.showToolTip(e);
//     }.bind(this), 2000);
//   },

//   showToolTip: function(e) {
//     $figcap = $(e.target).next('figcaption').fadeIn(300);
//     $figcap.css('position', 'absolute');
//   },

//   handleMouseLeave: function() {
//     if (this.timer) {
//       clearTimeout(this.timer);
//     }

//     $('figcaption').fadeOut(300);
//   },

//   init: function() {
//     $('#exotic_animals').on('mouseenter', 'img', this.startTimer.bind(this));
//     $('#exotic_animals').on('mouseleave', 'img', this.handleMouseLeave.bind(this));
//   }
// };


// App.init();


$(() => {
  const App = {
    mouseIn(e) {
      this.$caption = $(e.target).find('figcaption');
      this.timer = setTimeout(() => {
        this.$caption.fadeIn();
        this.$caption.css('position', 'absolute');
      }, 2000);
    },

    mouseOut(e) {
      this.$caption.fadeOut();
      clearTimeout(this.timer);
    },

    init() {
      $('figure').hover(this.mouseIn.bind(this), this.mouseOut.bind(this));
    }
  };

  App.init();
});