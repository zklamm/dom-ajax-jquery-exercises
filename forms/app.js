document.addEventListener('DOMContentLoaded', () => {
  const app = {
    dds: Array.from(document.querySelectorAll('dd')),
    form: document.querySelector('form'),
    submissionError: document.querySelector('#submissionError'),
    alphas: document.querySelectorAll('#firstName, #lastName'),
    numerics: document.querySelectorAll('#phone, .creditCard'),

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
      this.setNewClass(e.currentTarget, e.target);

      if (this.form.checkValidity()) {
        this.submissionError.className = '';
      }
    },

    renderFormInvalid() {
      for (let i = 0; i < this.dds.length; i += 1) {
        const dd = this.dds[i];
        if (dd.className !== 'focused') {
          this.setNewClass(dd, dd.firstElementChild);
        }
      }

      this.submissionError.className = 'invalid';
    },

    filterKeys(e, regex) {
      const key = e.key;
      if (regex.test(key) && key !== 'Tab' && key !== 'Backspace') {
        e.preventDefault();
      }
    },

    onlyAlpha(e) {
      this.filterKeys(e, /[^a-zA-Z'\s]/);
    },

    onlyNumeric(e) {
      this.filterKeys(e, /[^\-\d]/);
    },

    signUp(e) {
      e.preventDefault();

      if (this.form.checkValidity()) {
        this.form.submit();
      } else {
        this.renderFormInvalid();
      }
    },

    init() {
      this.dds.forEach(dd => {
        dd.addEventListener('focusin', this.focused.bind(this));
        dd.addEventListener('focusout', this.blurred.bind(this));
      });

      this.alphas.forEach(alpha => {
        alpha.addEventListener('keydown', this.onlyAlpha.bind(this));
      });

      this.numerics.forEach(numeric => {
        numeric.addEventListener('keydown', this.onlyNumeric.bind(this));
      });

      this.form.addEventListener('submit', this.signUp.bind(this));
    },
  };

  app.init();
});