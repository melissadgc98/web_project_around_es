export type ValidationConfig = {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  errorMsgClass: string;
};

export const configObject: ValidationConfig = {
  inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: ".popup__button:disabled",
    //inputErrorClass: "",
    errorMsgClass: "form__input-error_active",
};
