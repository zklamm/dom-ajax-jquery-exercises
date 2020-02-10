document.addEventListener('DOMContentLoaded', () => {
  const app = {
    form: document.querySelector('form'),
    submissionError: document.querySelector('#submissionError'),
    dds: Array.from(document.querySelectorAll('dd')),
    inputs: Array.from(document.querySelectorAll('input')),
    alphas: Array.from(document.querySelectorAll('#firstName, #lastName')),
    numerics: Array.from(document.querySelectorAll('#phone, .creditCard')),
    autotabs: Array.from(document.querySelectorAll('.autotab')),

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

    nextTab(e) {
      const numDigits = e.target.value.length;
      if (numDigits === 4) {
        e.target.nextElementSibling.focus();
      }
    },

    getUrlString() {
      const fields = this.inputs.slice(0, this.inputs.length - 1);
      const keys = [];
      const values = [];

      fields.forEach(field => {
        keys.push(field.name);
        values.push(field.value);
      });

      console.log(keys, values);
    },

    signUp(e) {
      e.preventDefault();

      if (this.form.checkValidity()) {
        this.getUrlString();
        let p = document.createElement('p');
        // p.innerText = 
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

      this.autotabs.forEach(autotab => {
        autotab.addEventListener('input', this.nextTab.bind(this));
      })

      this.form.addEventListener('submit', this.signUp.bind(this));
    },
  };

  app.init();
});