class FormValidator {
    constructor(config:unknown, formElement:HTMLElement) {
        this._config = config;
        //this._formElement = formElement;
        //this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        //this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

private showInputError(inputElement, errorMessage) {
  const form = inputElement.closest("form");
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

private hideInputError(inputElement) {
  const form = inputElement.closest("form");
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
};

private checkInputValidity(inputList) {
  return Array.from(inputList).some(function (input) {
    return !input.validity.valid;
  });
}

private toggleButtonState(inputList, buttonElement) {
  if (checkInputValidity(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }

public enableValidation(){

}

public resetValidation(){

}

-----------------------------


    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(inputElement);
        }
    }

    showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorMsgClass);
    }

    hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorMsgClass);
        errorElement.textContent = '';
    }

    hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this
}