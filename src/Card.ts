export interface CardData {
  name: string;
  link: string;
}

export type CardClickHandler = (link: string, name: string) => void;

export class Card {
  private _data: CardData;
  private _cardElement: HTMLElement;
  private _handleCardClick: CardClickHandler;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: CardClickHandler,
  ) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._getTemplate(templateSelector);

    const titleElement = this._getElement<HTMLHeadingElement>(".card__title");
    const imageElement = this._getElement<HTMLImageElement>(".card__image");

    titleElement.textContent = this._data.name;
    imageElement.src = this._data.link;
    imageElement.alt = this._data.name;

    this._setEventListeners();
  }

  private _getTemplate(templateSelector: string): HTMLElement {
    const templateElement =
      document.querySelector<HTMLTemplateElement>(templateSelector);

    if (!templateElement) {
      throw new Error(`No se encontró la plantilla "${templateSelector}".`);
    }

    const cardElement =
      templateElement.content.querySelector<HTMLElement>(".card");

    if (!cardElement) {
      throw new Error(`La plantilla "${templateSelector}" no contiene .card.`);
    }

    return cardElement.cloneNode(true) as HTMLElement;
  }

  private _getElement<T extends Element>(selector: string): T {
    const element = this._cardElement.querySelector<T>(selector);

    if (!element) {
      throw new Error(`No se encontró "${selector}" en la plantilla de tarjeta.`);
    }

    return element;
  }

  private _setEventListeners(): void {
    const imageElement = this._getElement<HTMLImageElement>(".card__image");
    const likeButton = this._getElement<HTMLButtonElement>(
      ".card__like-button",
    );
    const deleteButton = this._getElement<HTMLButtonElement>(
      ".card__delete-button",
    );

    imageElement.addEventListener("click", () => {
      this._handleCardClick(this._data.link, this._data.name);
    });

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
    });

    deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }

  public generateCard(): HTMLElement {
    return this._cardElement;
  }
}
