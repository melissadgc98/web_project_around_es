import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this.handleFormSubmit = handleFormSubmit;
        const formElement = this.popup.querySelector(".popup__form");
        if (!formElement) {
            throw new Error("No se encontró el formulario dentro del popup.");
        }
        this.formElement = formElement;
    }
    getInputValues() {
        const values = {};
        const inputElements = this.formElement.querySelectorAll("input");
        inputElements.forEach((inputElement) => {
            values[inputElement.name] = inputElement.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        this.formElement.reset();
        super.close();
    }
}
