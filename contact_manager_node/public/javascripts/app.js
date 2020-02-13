$(() => {
  const templates = {};

  $('script[type="text/x-handlebars"]').each(function() {
    const $script = $(this).remove();
    templates[$script.attr('data-template')] = Handlebars.compile($script.html());
  });

  Handlebars.registerPartial('contact', templates.contact);
  Handlebars.registerPartial('noContacts', templates.noContacts);

  $('#createContact').html(templates.createContact());

  const app = {
    $requiredFields: $('#fullName, #email, #phone'),
    form: document.querySelector('form'),

    toggleForm(e) {
      e.preventDefault();
      this.removeErrors();
      this.form.reset();
      $('#featureBar, #contactsList').slideToggle();
      $('#createContact').slideToggle({
        start() {
          $(this).css('display', 'inline-block');
        }
      });
    },

    deleteContact(e) {
      if (confirm('Do you want to delete the contact ?')) {
        const id = $(e.target).closest('li').attr('data-id');
        $.ajax({
          url: `api/contacts/${id}`,
          method: 'DELETE',
        }).done(this.getContacts());
      }
    },

    editContact(e) {
      const id = $(e.target).closest('li').attr('data-id');

      this.toggleForm(e);

      $.ajax({
        url: `api/contacts/${id}`
      }).done(json => {
        // debugger
        $('#createContact').html(templates.createContact({json}))
      });
    },

    getContacts() {
      $.ajax({
        url: 'api/contacts'
      }).done(json => {
        $('#contactsList').html(templates.contacts({contacts: json}));
        $('.edit').on('click', this.editContact.bind(this));
        $('.delete').on('click', this.deleteContact.bind(this));
      });
    },

    createContact() {
      $.ajax({
        url: 'api/contacts',
        dataType: 'json',
        method: 'POST',
        data: $('form').serialize(),
      }).done(this.getContacts());
    },

    removeErrors($input) {
      $input = $input || this.$requiredFields;
      $input.removeClass('error');
      $input.prev('label').removeClass('error');
      $input.next('small').removeClass('error');
    },

    showErrors() {
      const self = this;
      this.$requiredFields.each(function() {
        const $input = $(this);
        if (!this.checkValidity()) {
          $input.addClass('error');
          $input.prev('label').addClass('error');
          $input.next('small').addClass('error');
        } else {
          self.removeErrors($input);
        }
      });
    },

    submit(e) {
      if (this.form.checkValidity()) {
        e.preventDefault();
        this.removeErrors();
        this.createContact();
        this.toggleForm(e);
        this.form.reset();
      } else {
        this.showErrors();
      }
    },

    bind() {
      $('.submit').on('click', this.submit.bind(this));
      $('.add, .cancel').on('click', this.toggleForm.bind(this));
    },

    init() {
      this.getContacts();
      this.bind();
    },
  };

  app.init();
});
