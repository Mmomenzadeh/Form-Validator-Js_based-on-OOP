class Validator {
  hasError = false;
  invalidInputs = [];
  definedRules = {
    required: (input) => {
      if (input.value.trim() !== "") {
        return true;
      }
      this.hasError = true;
      this.invalidInputs.push({
        input,
        message: "This input can not be empty ",
      });
    },
  };

  constructor(form) {
    form = document.querySelector(form);
     //For the availability of the form in the whole class
    this.form = form;
    //manage submit event for form
    form.onsubmit = (e) => {
      e.preventDefault();
      // reset error
      this.hasError = false;
      this.invalidInputs = [];
      this.removeErrors()
      //Determine each rule for each input
      const inputs = form.querySelectorAll("[data-rules]");
      for (const input of inputs) {
        const rules = input.getAttribute("data-rules").split("|");

        for (const rule of rules) {
          if (this.definedRules.hasOwnProperty(rule)) {
            this.definedRules[rule](input);
          }
        }
      }
      /// show errors :
      if (this.hasError) {
        for (const error of this.invalidInputs) {
          const errorMessage = document.createElement("p");
          errorMessage.className = "validator-err ";
          errorMessage.innerHTML = error.message;

          const input = error.input;
          input.parentNode.insertBefore(errorMessage, input.nextSibling);
        }
      }
    };
  }
  /// Remove errors on the page so that the error only appears once
  removeErrors() {
    const errors = this.form.querySelectorAll("p.validator-err");
    errors.forEach((error) => {
      error.remove();
    });
  }
}

new Validator("#my-form");
