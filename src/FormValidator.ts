import type { ValidationConfig } from "./scripts/utils/constants";


export class FormValidator {
private config: ValidationConfig;
private formElement: HTMLFormElement;
private inputList: HTMLInputElement[];
private buttonElement: HTMLButtonElement | null;

    constructor(config:ValidationConfig, formElement:HTMLFormElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll<HTMLInputElement>(config.inputSelector));
        this.buttonElement = formElement.querySelector<HTMLButtonElement>(config.submitButtonSelector);
    }

private getErrorElement(inputElement: HTMLInputElement): HTMLElement {
  const errorElement = this.formElement.querySelector<HTMLElement>(
    `.${inputElement.name}-input-error`,
  );

  if (!errorElement) {
    throw new Error(`No se encontró el mensaje de error para "${inputElement.name}".`);
  }

  return errorElement;
}

private showInputError(inputElement:HTMLInputElement, errorMessage:string) {
  const errorElement = this.getErrorElement(inputElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this.config.errorMsgClass);
};

private hideInputError(inputElement:HTMLInputElement) {
  const errorElement = this.getErrorElement(inputElement);
  errorElement.classList.remove(this.config.errorMsgClass);
  errorElement.textContent = "";
};

private checkInputValidity(input: HTMLInputElement): boolean {
  return !input.validity.valid;
}

private toggleButtonState(): void {
  if (!this.buttonElement) {
    throw new Error("No se encontró el botón de envío del formulario.");
  }

  const hasInvalidInput = this.inputList.some((input) =>
    this.checkInputValidity(input),
  );

  this.buttonElement.disabled = hasInvalidInput;
}

private setEventListeners(): void {
  this.inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (event: Event) => {
      const input = event.currentTarget as HTMLInputElement;

      if (input.validity.valid) {
        this.hideInputError(input);
      } else {
        this.showInputError(input, input.validationMessage);
      }

      this.toggleButtonState();
    });
  });

  this.toggleButtonState();
}

public enableValidation(): void {
  this.setEventListeners();
}

public resetValidation(): void {
  this.inputList.forEach((inputElement) => {
    this.hideInputError(inputElement);
  });

  this.toggleButtonState();
}
}