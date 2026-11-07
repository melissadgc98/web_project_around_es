export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.handleCardClick = handleCardClick;
        this.cardElement = this.getTemplate(templateSelector);
        const titleElement = this.getElement(".card__title");
        const imageElement = this.getElement(".card__image");
        titleElement.textContent = this.data.name;
        imageElement.src = this.data.link;
        imageElement.alt = this.data.name;
        this.setEventListeners();
    }
    getTemplate(templateSelector) {
        const templateElement = document.querySelector(templateSelector);
        if (!templateElement) {
            throw new Error(`No se encontró la plantilla "${templateSelector}".`);
        }
        const cardElement = templateElement.content.querySelector(".card");
        if (!cardElement) {
            throw new Error(`La plantilla "${templateSelector}" no contiene .card.`);
        }
        return cardElement.cloneNode(true);
    }
    getElement(selector) {
        const element = this.cardElement.querySelector(selector);
        if (!element) {
            throw new Error(`No se encontró "${selector}" en la plantilla de tarjeta.`);
        }
        return element;
    }
    setEventListeners() {
        const imageElement = this.getElement(".card__image");
        const likeButton = this.getElement(".card__like-button");
        const deleteButton = this.getElement(".card__delete-button");
        imageElement.addEventListener("click", () => {
            this.handleCardClick(this.data.link, this.data.name);
        });
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        deleteButton.addEventListener("click", () => {
            this.cardElement.remove();
        });
    }
    generateCard() {
        return this.cardElement;
    }
}
