import { Card, type CardData } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { configObject } from "./scripts/utils/constants.js";

function getRequiredElement<T extends Element>(
  selector: string,
  root: ParentNode = document,
): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`No se encontró el elemento "${selector}".`);
  }

  return element;
}

const initialCards: CardData[] = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const cardSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) =>
      new Card(item, "#card-template", (link, name) => {
        imagePopup.open({ link, name });
      }).generateCard(),
  },
  ".cards__list",
);
cardSection.renderItems();

const editFormElement = getRequiredElement<HTMLFormElement>(
  "#edit-profile-form",
);
const editNameInput = getRequiredElement<HTMLInputElement>(
  '[name="name"]',
  editFormElement,
);
const editJobInput = getRequiredElement<HTMLInputElement>(
  '[name="description"]',
  editFormElement,
);

let editPopup: PopupWithForm;
editPopup = new PopupWithForm("#edit-popup", (values) => {
  userInfo.setUserInfo({
    name: values.name,
    job: values.description,
  });
  editPopup.close();
});
editPopup.setEventListeners();

const editValidator = new FormValidator(configObject, editFormElement);
editValidator.enableValidation();

getRequiredElement<HTMLButtonElement>(".profile__edit-button").addEventListener(
  "click",
  () => {
    const currentUserInfo = userInfo.getUserInfo();
    editNameInput.value = currentUserInfo.name;
    editJobInput.value = currentUserInfo.job;
    editValidator.resetValidation();
    editPopup.open();
  },
);

const addCardFormElement = getRequiredElement<HTMLFormElement>("#new-card-form");
let addCardPopup: PopupWithForm;
addCardPopup = new PopupWithForm("#new-card-popup", (values) => {
  const cardData: CardData = {
    name: values["place-name"],
    link: values.link,
  };
  const cardElement = new Card(
    cardData,
    "#card-template",
    (link, name) => imagePopup.open({ link, name }),
  ).generateCard();

  cardSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const addCardValidator = new FormValidator(configObject, addCardFormElement);
addCardValidator.enableValidation();

getRequiredElement<HTMLButtonElement>(".profile__add-button").addEventListener(
  "click",
  () => {
    addCardValidator.resetValidation();
    addCardPopup.open();
  },
);
