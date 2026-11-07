export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        this.buttonElement = formElement.querySelector(config.submitButtonSelector);
    }
    getErrorElement(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.name}-input-error`);
        if (!errorElement) {
            throw new Error(`No se encontró el mensaje de error para "${inputElement.name}".`);
        }
        return errorElement;
    }
    showInputError(inputElement, errorMessage) {
        const errorElement = this.getErrorElement(inputElement);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorMsgClass);
    }
    ;
    hideInputError(inputElement) {
        const errorElement = this.getErrorElement(inputElement);
        errorElement.classList.remove(this.config.errorMsgClass);
        errorElement.textContent = "";
    }
    ;
    checkInputValidity(input) {
        return !input.validity.valid;
    }
    toggleButtonState() {
        if (!this.buttonElement) {
            throw new Error("No se encontró el botón de envío del formulario.");
        }
        const hasInvalidInput = this.inputList.some((input) => this.checkInputValidity(input));
        this.buttonElement.disabled = hasInvalidInput;
    }
    setEventListeners() {
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (event) => {
                const input = event.currentTarget;
                if (input.validity.valid) {
                    this.hideInputError(input);
                }
                else {
                    this.showInputError(input, input.validationMessage);
                }
                this.toggleButtonState();
            });
        });
        this.toggleButtonState();
    }
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        this.inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}
