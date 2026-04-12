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
const addCardPopupForm = document.querySelector("#new-card-popup");
const openAddCardPopupBtn = document.querySelector(".profile__add-button");
const closeAddCardPopupBtn = addCardPopupForm.querySelector(".popup__close");
const addCardBtn = addCardPopupForm.querySelector(".popup__button");
const newPlaceInput = addCardPopupForm.querySelector(
  ".popup__input_type_card-name",
);
const newPlaceImg = addCardPopupForm.querySelector(".popup__input_type_url");
const popupImage = document.querySelector("#image-popup");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaptionElement = popupImage.querySelector(".popup__caption");
const closeImagePopupBtn = popupImage.querySelector(".popup__close");

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

function handleAddCardModal() {
  openModal(addCardPopupForm);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopupForm);
}

function handleLikeBtnClick(element) {
  element.classList.toggle("card__like-button_is-active");
}

function handleDeleteBtnClick(element) {
  element.closest(".card").remove();
}

function handleImageClick(link, name) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;
  openModal(popupImage);
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    handleLikeBtnClick(likeButton);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    handleDeleteBtnClick(deleteButton);
  });

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.addEventListener("click", function () {
    handleImageClick(link, name);
  });

  return cardElement;
}

function renderCard(name, link) {
  const cardElement = getCardElement(name, link);
  const cardsContainer = document.querySelector(".cards__list");
  cardsContainer.append(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = newPlaceInput.value;
  const link = newPlaceImg.value;
  renderCard(name, link);
  closeModal(addCardPopupForm);
}

initialCards.forEach(function (element) {
  renderCard(element.name, element.link);
});

editBtn.addEventListener("click", function () {
  handleOpenEditModal();
});

openAddCardPopupBtn.addEventListener("click", function () {
  handleAddCardModal();
});

closeAddCardPopupBtn.addEventListener("click", function () {
  closeModal(addCardPopupForm);
});

closeEditPopupBtn.addEventListener("click", function () {
  closeModal(editPopupForm);
});

editPopupForm.addEventListener("submit", handleProfileFormSubmit);

addCardBtn.addEventListener("click", handleCardFormSubmit);

closeImagePopupBtn.addEventListener("click", function () {
  closeModal(popupImage);
});
