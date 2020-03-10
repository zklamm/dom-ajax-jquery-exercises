$(() => {
  const Templates = {
    init() {
      $('[type="text/x-handlebars"]').each(function() {
        const $script = $(this).remove();
        Templates[$script.attr('data-template')] = Handlebars.compile($script.html());
      });

      Handlebars.registerPartial('contact', this.contact);
      Handlebars.registerPartial('noContacts', this.noContacts);
    },
  };

  const UI = {
    renderContactsList(contacts, query='') {
      $('#contactsList').html(Templates.contacts({
        contacts: contacts,
        query: query,
      }));

      if (!contacts && !query) {
        $('#contactsList').append(Templates.noContacts());
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
      this.$requiredFields = $(`[required]`);
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

    renderForm(template) {
      $(`#${this.currentAction}Contact`).html(template());
    },

    init() {
      this.$requiredFields = $(`[required]`);
      this.currentAction = 'create';
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

    getTagFriendlyContacts(contacts) {
      return contacts.map(contact => {
        if (contact.tags === '') {
          contact.tags = null;
        } else {
          contact.tags = contact.tags.split(',');
        }
        return contact;
      });
    },

    getContacts() {
      $.ajax({
        url: 'api/contacts'
      }).done(json => {
        this.contacts = this.getTagFriendlyContacts(json);
        UI.renderContactsList(this.contacts);
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
        $('#editContact').html(Templates.form(json));
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
      $('.cancel').on('click', UI.toggleForm.bind(UI));
      $('.edit').on('click', this.displayEditForm.bind(this));
      $('.delete').on('click', this.deleteContact.bind(this));
      $('.submit').on('click', this.submit.bind(this));
      $('.tag').on('click', this.search.bind(this));
    },

    filterNameMatches(query) {
      return this.contacts.filter(contact => {
        const name = contact.full_name.toUpperCase();
        return !!name.match(query.toUpperCase());
      });
    },

    filterTagMatches(query) {
      return this.contacts.filter(contact => {
        return contact.tags.includes(query);
      });
    },

    filterMatches(e, query) {
      if (e.type === 'click') {
        query = $(e.target).text();
        return this.filterTagMatches(query);
      } else {
        return this.filterNameMatches(query);
      }
    },

    search(e) {
      const query = $('#search').val();
      const filtered = this.filterMatches(e, query);
      UI.renderContactsList(filtered, query);
      this.bindButtons();
    },

    bindSearch() {
      $('#search').on('input', this.search.bind(this));
    },

    initCollaborators() {
      Templates.init();
      UI.init();

      UI.renderForm(Templates.form);
    },

    init() {
      this.currentId = null;
      this.contacts = null;

      this.initCollaborators();
      this.bindSearch();
      this.getContacts();
    },
  };

  App.init();
});
