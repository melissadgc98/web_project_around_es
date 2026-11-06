import type { ValidationConfig } from "./scripts/utils/constants";


class FormValidator {
    constructor(config:ValidationConfig, formElement:HTMLFormElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
    }

private showInputError(inputElement, errorMessage) {
  const errorElement = this.formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add(this.config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this.config.errorMsgClass);
};

private hideInputError(inputElement) {
  const errorElement = this.formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove(this.config.inputErrorClass);
  errorElement.classList.remove(this.config.errorMsgClass);
  errorElement.textContent = "";
};

private checkInputValidity(inputList) {
  return Array.from(inputList).some(function (input) {
    return !input.validity.valid;
  });
}

private toggleButtonState(inputList, buttonElement) {
  if (checkInputValidity(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(this.config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this.config.inactiveButtonClass);
  }

public enableValidation(){

}

public resetValidation(){

}