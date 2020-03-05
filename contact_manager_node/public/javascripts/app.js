$(() => {
  const templates = {};

  $('script[type="text/x-handlebars"]').each(function() {
    const $script = $(this).remove();
    templates[$script.attr('data-template')] = Handlebars.compile($script.html());
  });

  Handlebars.registerPartial('contact', templates.contact);
  Handlebars.registerPartial('noContacts', templates.noContacts);

  const UI = {
    getTagFriendlyContacts(contacts) {
      return contacts.map(contact => {
        contact.tags = contact.tags.split(',');
        return contact;
      });
    },

    renderContactsList(contacts, query='') {
      const tagFriendly = this.getTagFriendlyContacts(contacts);

      $('#contactsList').html(templates.contacts({
        contacts: tagFriendly,
        query: query,
      }));

      if (!query && !contacts) {
        $('#contactsList').append(templates.noContacts());
      }
    },

    addErrors($input) {
      $input.addClass('error');
      $input.prev('label').addClass('error');
      $input.next('small').addClass('error');
    },

    removeErrors($input) {
      $input = $input || this.$requiredFields;
      $input.removeClass('error');
      $input.prev('label').removeClass('error');
      $input.next('small').removeClass('error');
    },

    showErrors() {
      this.setRequiredFields();
      const self = this;

      self.$requiredFields.each(function() {
        if (!this.checkValidity()) {
          self.addErrors($(this));
        } else {
          self.removeErrors($(this));
        }
      });
    },

    toggleForm(e) {
      e.preventDefault();
      this.removeErrors();
      $('#featureBar, #contactsList').slideToggle();
      $(`#${this.currentAction}Contact`).slideToggle({
        start() {
          $(this).css('display', 'inline-block');
        }
      });
    },

    setRequiredFields() {
      this.$requiredFields = $(`
        [name="full_name"],
        [name="email"],
        [name="phone_number"]
      `);
    },

    init() {
      this.$requiredFields = null;
      this.currentAction = 'create';

      this.setRequiredFields();
    },
  };

  const App = {
    updateContact() {
      $.ajax({
        url: `api/contacts/${this.currentId}`,
        method: 'PUT',
        data: $('#editContact form').serialize(),
      }).done(this.getContacts());
    },

    saveContact() {
      $.ajax({
        url: 'api/contacts',
        method: 'POST',
        data: $('#createContact form').serialize(),
      }).done(this.getContacts());
    },

    submit(e) {
      e.preventDefault();
      const action = UI.currentAction;
      const form = document.querySelector(`#${action}Contact form`);

      if (form.checkValidity()) {
        UI.removeErrors();
        UI.toggleForm(e);
        action === 'create' ? this.saveContact() : this.updateContact();
      } else {
        UI.showErrors();
      }
    },

    getContacts() {
      $.ajax({
        url: 'api/contacts'
      }).done(json => {
        UI.renderContactsList(json);
        this.bindButtons();
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

    getSingleContact() {
      $.ajax({
        url: `api/contacts/${this.currentId}`
      }).done(json => {
        $('#editContact').html(templates.form(json));
        this.bindButtons();
      });
    },

    displayEditForm(e) {
      this.currentId = $(e.target).closest('li').attr('data-id');
      UI.currentAction = 'edit';
      UI.toggleForm(e);
      this.getSingleContact();
    },

    displayCreateForm(e) {
      document.querySelector('#createContact form').reset();
      UI.currentAction = 'create';
      UI.toggleForm(e);
      this.bindButtons();
    },

    bindButtons() {
      $('.add, .cancel, .delete, .edit, .submit, .tag').off();
      $('.add').on('click', this.displayCreateForm.bind(this));
      $('.edit').on('click', this.displayEditForm.bind(this));
      $('.delete').on('click', this.deleteContact.bind(this));
      $('.submit').on('click', this.submit.bind(this));
      $('.cancel').on('click', UI.toggleForm.bind(UI));
      $('.tag').on('click', this.search.bind(this));
    },

    filterNameMatches(contacts, query) {
      return contacts.filter(contact => {
        const name = contact.full_name.toUpperCase();
        return !!name.match(query.toUpperCase());
      });
    },

    filterTagMatches(contacts, query) {
      return contacts.filter(contact => {
        return contact.tags.split(',').includes(query);

        // return contact.tags.includes(tag);
        // return !!contact.tags.split(',').filter(tag => {
        //   return tag === query;
        // });
      });
    },

    filterMatches(e, contacts, query) {
      if (e.type === 'click') {
        query = $(e.target).text();
        return this.filterTagMatches(contacts, query);
      } else {
        return this.filterNameMatches(contacts, query);
      }
    },

    search(e) {
      $.ajax({
        url: 'api/contacts'
      }).done(json => {
        const query = $('#search').val();
        const filtered = this.filterMatches(e, json, query);

        UI.renderContactsList(filtered, query);
        this.bindButtons();
      });
    },

    init() {
      this.currentId = null;

      UI.init();
      $('#createContact').html(templates.form());
      $('#search').on('input', this.search.bind(this));
      this.getContacts();
    },
  };

  App.init();
});
