const showInputError = (inputElement, errorMessage) => {
  const form = inputElement.closest("form");
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (inputElement) => {
  const form = inputElement.closest("form");
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
};

function checkInputValidity(inputList) {
  return Array.from(inputList).some(function (input) {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (checkInputValidity(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputs = formElement.querySelectorAll("input");
  const submitBtn = formElement.querySelector(".popup__button");
  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
      } else {
        hideInputError(input);
      }

      toggleButtonState(inputs, submitBtn);
    });
  });
}

export { setEventListeners, toggleButtonState };
