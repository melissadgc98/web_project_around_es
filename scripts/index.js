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

initialCards.forEach(function (element) {
  console.log(element.name);
});

const editBtn = document.querySelector(".profile__edit-button");
const editPopupForm = document.querySelector("#edit-popup");
const closeEditPopupBtn = editPopupForm.querySelector(".popup__close");
const nameInput = editPopupForm.querySelector(".popup__input_type_name");
const jobInput = editPopupForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

editBtn.addEventListener("click", function () {
  editPopupForm.classList.add("popup_is-opened");
| //nameInput.value = profileName.textContent;
| //jobInput.value = profileJob.textContent;
});

closeEditPopupBtn.addEventListener("click", function () {
  editPopupForm.classList.remove("popup_is-opened");
});
