export type ValidationConfig = {
  inputSelector: string;
  submitButtonSelector: string;
  errorMsgClass: string;
};

export const configObject: ValidationConfig = {
  inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    errorMsgClass: "form__input-error_active",
};
