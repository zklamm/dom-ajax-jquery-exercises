$(() => {
  const templates = {};
  let contacts;

  $('script[type="text/x-handlebars"]').each(function() {
    const $script = $(this).remove();
    templates[$script.attr('data-template')] = Handlebars.compile($script.html());
  });

  // debugger

  const app = {
    toggleForm(e) {
      e.preventDefault();

      $('#featureBar').slideToggle();
      $('#contactsList').slideToggle();
      $('#emptyContacts').slideToggle();
      $('#createContact').slideToggle({
        start() {
          $(this).css('display', 'inline-block');
        }
      });
    },

    bind() {
      $('.add, .cancel').on('click', this.toggleForm.bind(this));
    },

    init() {
      this.bind();
    },
  };

  $.ajax({
    url: 'api/contacts'
  }).done(json => {
    contacts = json;
    renderContacts();
    app.init();
  });

  function renderContacts() {
    $('#contactsList').html(templates.contacts());
  }
});
