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
    toggleForm(e) {
      e.preventDefault();

      $('#featureBar').slideToggle();
      $('#contactsList').slideToggle();
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
        console.log(json);
      });
    },

    bind() {
      $('.add, .cancel, .submit').on('click', this.toggleForm.bind(this));
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
