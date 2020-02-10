document.addEventListener('DOMContentLoaded', () => {
  const app = {
    dds: Array.from(document.querySelectorAll('dd')),
    form: document.querySelector('form'),
    submissionError: document.querySelector('#submissionError'),
    names: document.querySelectorAll('#firstName, #lastName'),

    focused(e) {
      e.currentTarget.className = 'focused';
    },

    isRequiredButEmpty(input) {
      return !input.value &&
             input.id !== 'phone' &&
             input.className !== 'creditCard';
    },

    isMismatched(input) {
      return input.value && !input.checkValidity();
    },

    setNewClass(dd, input) {
      if (this.isRequiredButEmpty(input)) {
        dd.className = 'empty';
      } else if (this.isMismatched(input)) {
        dd.className = 'mismatch';
      } else {
        dd.className = '';
      }
    },

    blurred(e) {
      const input = e.target;
      const dd = e.currentTarget;

      this.setNewClass(dd, input);

      if (this.form.checkValidity()) {
        this.submissionError.className = '';
      }
    },

    renderFormInvalid() {
      for (let i = 0; i < this.dds.length; i += 1) {
        const dd = this.dds[i];
        this.setNewClass(dd, dd.firstElementChild);
      }

      this.submissionError.className = 'invalid';
    },

    onlyAlpha(e) {
      const regex = /[a-zA-Z'\s]/;

      if (!regex.test(e.key)) {
        e.preventDefault();
      }
    },

    signUp(e) {
      e.preventDefault();

      if (this.form.checkValidity()) {
        this.form.submit();
      } else {
        this.renderFormInvalid();
      }
    },

    bind() {
      this.dds.forEach(dd => {
        dd.addEventListener('focusin', this.focused.bind(this));
        dd.addEventListener('focusout', this.blurred.bind(this));
      });

      this.names.forEach(name => {
        name.addEventListener('keypress', this.onlyAlpha.bind(this));
      });

      this.form.addEventListener('submit', this.signUp.bind(this));
    },

    init() {
      this.bind();
    },
  };

  app.init();
});