import { Popup } from "./Popup.js";

export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void;

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private handleFormSubmit: FormSubmitHandler;

  constructor(selector: string, handleFormSubmit: FormSubmitHandler) {
    super(selector);
    this.handleFormSubmit = handleFormSubmit;

    const formElement =
      this.popup.querySelector<HTMLFormElement>(".popup__form");
    if (!formElement) {
      throw new Error("No se encontró el formulario dentro del popup.");
    }

    this.formElement = formElement;
  }

  private getInputValues(): FormValues {
    const values: FormValues = {};
    const inputElements =
      this.formElement.querySelectorAll<HTMLInputElement>("input");

    inputElements.forEach((inputElement) => {
      values[inputElement.name] = inputElement.value;
    });

    return values;
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      this.handleFormSubmit(this.getInputValues());
    });
  }

  public override close(): void {
    this.formElement.reset();
    super.close();
  }
}
