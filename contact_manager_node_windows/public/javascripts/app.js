$(() => {
  const templates = {};
  let contacts;

  $('script[type="text/x-handlebars"]').each(function() {
    const $script = $(this).remove();
    templates[$script.attr('data-template')] = Handlebars.compile($script.html());
  });

  Handlebars.registerPartial('contact', templates.contact);
  Handlebars.registerPartial('noContacts', templates.noContacts);

  const app = {
    // toggleForm(e) {
    //   // e.preventDefault();

    //   $('#featureBar, #contactsList').slideToggle();
    //   $('#createContact').slideToggle({
    //     start() {
    //       $(this).css('display', 'inline-block');
    //     }
    //   });
    // },

    // validName() {
    //   const name = $('#fullName').val();
    //   return !!name;
    // },

    // validEmail() {
    //   const email = $('#email').val();
    //   // if (!email) return false;

    //   return !!email;
    // },

    // validPhone() {
    //   const phone = $('#phone').val();
    //   return !!phone;
    // },

    // isFormValid() {
    //   return this.validName() && this.validEmail() && this.validPhone();
    // },

    // sendData() {
    //   $.ajax({
    //     url: 'api/contacts',
    //     dataType: 'json',
    //     method: 'POST',
    //     data: $('form').serialize(),
    //   }).done(json => {
    //     $('form').trigger('reset');
    //     console.log(json);
    //   });
    // },

    // showCorrections() {
    // },

    // submit(e) {
    //   // e.preventDefault();

    //   if (this.isFormValid()) {
    //     this.sendData();
    //   } else {
    //     this.showCorrections();
    //   }
    // },

    // bind() {
    //   $('.add, .cancel, .submit').on('click', this.toggleForm.bind(this));
    //   $('.submit').on('submit', this.submit.bind(this));
    // },

    toggleForm(e) {
      e.preventDefault();

      $('#featureBar, #contactsList').slideToggle();
      $('#createContact').slideToggle({
        start() {
          $(this).css('display', 'inline-block');
        }
      });
    },

    submit(e) {
      e.preventDefault();

      $.ajax({
        url: 'api/contacts',
        dataType: 'json',
        method: 'POST',
        data: $('form').serialize(),
      }).done(json => {
        $('form').trigger('reset');
        this.toggleForm(e);
      });
    },

    bind() {
      $('.add, .cancel').on('click', this.toggleForm.bind(this));
      $('.submit').on('click', this.submit.bind(this));
    },

    init() {
      this.bind();
    },
  };

  function renderContacts() {
    $('#contactsList').html(templates.contacts({contacts: contacts}));
  }

  $.ajax({
    url: 'api/contacts'
  }).done(json => {
    contacts = json;
    renderContacts();
    app.init();
  });
});
