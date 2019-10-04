$(function() {
  var $buttons = $('main > p').eq(0).children();

  $("nav a").on("mouseenter", function() {
    $(this).next("ul").css({
      display: "block"
    });
  });

  $("nav").on("mouseleave", function() {
    $(this).find("ul ul").css({
      display: "none"
    });
  });

  $buttons.on('click', function(e) {
    e.preventDefault();

    $(this).addClass('clicked');
  });

  $(".toggle").on("click", function(e) {
    e.preventDefault();

    $(this).next(".accordion").toggleClass('opened');
  });

  $("form").on("submit", function(e) {
    e.preventDefault();
    var cc_number = $(this).find("[type=text]").val(),
        odd_total = 0,
        even_total = 0;

    cc_number = cc_number.split("").reverse();
    for (var i = 0, len = cc_number.length; i < len; i++) {
      if (i % 2 == 1) {
        cc_number[i] = (+cc_number[i] * 2) + "";
        if (cc_number[i].length > 1) {
          cc_number[i] = +cc_number[i][0] + +cc_number[i][1];
        }
        else {
          cc_number[i] = +cc_number[i];
        }
        odd_total += cc_number[i];
      }
      else {
        even_total += +cc_number[i];
      }
    }
    if ((odd_total + even_total) % 10 == 0) {
      $(this).find(".success").show();
      $(this).find(".error").hide();
    }
    else {
      $(this).find(".error").show();
      $(this).find(".success").hide();
    }
  });

  $("ul a").on("click", function(e) {
    e.preventDefault();

    var month = $(this).text();
    var stones = {
      January: 'garnet',
      February: 'amethyst',
      March: 'aquamarine or bloodstone',
      April: 'diamond',
      May: 'emerald',
      June: 'pearl, moonstone, or alexandrite',
      July: 'ruby',
      August: 'peridot',
      September: 'sapphire',
      October: 'opal or tourmaline',
      November: 'topaz or citrine',
      December: 'turquoise, zircon, or tanzanite',
    }

    $('#birthstone').text(`Your birthstone is ${stones[month]}`);
  });
});
