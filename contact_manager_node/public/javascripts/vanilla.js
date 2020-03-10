document.addEventListener('DOMContentLoaded', () => {
  const Templates = {
    init() {
      const selector = '[type="text/x-handlebars"]';
      const scripts = Array.from(document.querySelectorAll(selector));

      scripts.forEach(script => {
        const templateName = script.getAttribute('data-template');
        this[templateName] = Handlebars.compile(script.innerHTML);
        script.remove();
      });

      Handlebars.registerPartial('contact', this.contact);
      Handlebars.registerPartial('noContacts', this.noContacts);
    },
  };

  const UI = {
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

    renderContactsList(contacts, query='') {
      const contactsList = document.querySelector('#contactsList');

      contactsList.innerHTML = Templates.contacts({
        contacts: contacts,
        query: query,
      });

      if (!contacts && !query) {
        contactsList.append(Templates.noContacts());
      }
    },

    addErrors(field) {
      field.classList.add('error');
      field.nextElementSibling.classList.add('error');
      field.previousElementSibling.classList.add('error');
    },

    removeErrors(field) {
      const inputs = field ? [field] : this.requiredFields;

      Array.from(inputs).forEach(input => {
        input.classList.remove('error');
        input.nextElementSibling.classList.remove('error');
        input.previousElementSibling.classList.remove('error');
      });
    },

    showErrors() {
      this.requiredFields = document.querySelectorAll('[required]');

      this.requiredFields.forEach(field => {
        if (!field.checkValidity()) {
          this.addErrors(field);
        } else {
          this.removeErrors(field);
        }
      });
    },

    toggleForm(e) {
      e.preventDefault();
      const selectors = [
        '#featureBar',
        '#contactsList',
        `${this.currentAction}Contact`
      ];

      this.removeErrors();

      selectors.forEach(selector => {
        selector.classList.toggle('hidden');
      });
    },

    renderForm(template) {
      const form = document.querySelector(`#${this.currentAction}Contact`);
      form.innerHTML = template();
    },

    init() {
      this.requiredFields = document.querySelectorAll('[required]');
      this.currentAction = 'create';
    },
  };

  const API = {
    url: 'api',

    createContact() {

    },

    getContacts() {
      return fetch(`${this.url}/contacts`);
    },

    getContact(id) {
      return fetch(`${this.url}/contact/${id}`);
    },

    updateContact(id) {

    },

    deleteContact(id) {

    },
  };

  const App = {
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
        query = e.target.innerText;
        return this.filterTagMatches(query);
      } else {
        return this.filterNameMatches(query);
      }
    },

    search(e) {
      const query = document.querySelector('#search').innerText;
      const filtered = this.filterMatches(e, query);

      UI.renderContactsList(filtered, query);
      this.bindBtns();
    },

    bindSearch() {
      const searchBar = document.querySelector('#search');
      searchBar.addEventListener('input', this.search.bind(this));
    },

    getBtns() {
      const selector = '.add, .cancel, .delete, .edit, .submit, .tag';
      return Array.from(document.querySelectorAll(selector));
    },

    bindBtns() {
      const btns = this.getBtns();

      btns.forEach(btn => btn.removeEventListener('click', ));
    },

    initContactsList() {
      API.getContacts()
        .then(response => response.json())
        .then(json => {
          this.contacts = this.getTagFriendlyContacts(json);
          UI.renderContactsList(this.contacts);
          this.bindBtns();
        })
        .catch(error => console.log(error));
    },

    initCollaborators() {
      Templates.init();
      UI.init();
      API.init();

      UI.renderForm(Templates.form);
    },

    init() {
      this.currentId = null;
      this.contacts = null;

      this.initCollaborators();
      this.initContactsList();
      this.bindSearch();
    },
  };

  App.init();
});