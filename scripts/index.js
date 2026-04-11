const initialCards = [
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

const editBtn = document.querySelector(".profile__edit-button");
const editPopupForm = document.querySelector("#edit-popup");
const closeEditPopupBtn = editPopupForm.querySelector(".popup__close");
const nameInput = editPopupForm.querySelector(".popup__input_type_name");
const descriptionInput = editPopupForm.querySelector(
  ".popup__input_type_description",
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function openModal(element) {
  element.classList.add("popup_is-opened");
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopupForm);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopupForm);
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  return cardElement;
}

function renderCard(name, link) {
  const cardElement = getCardElement(name, link);
  const cardsContainer = document.querySelector(".cards__list");
  cardsContainer.append(cardElement);
}

initialCards.forEach(function (element) {
  renderCard(element.name, element.link);
});

editBtn.addEventListener("click", function () {
  handleOpenEditModal();
});

closeEditPopupBtn.addEventListener("click", function () {
  closeModal(editPopupForm);
});

editPopupForm.addEventListener("submit", handleProfileFormSubmit);
