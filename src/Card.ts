export interface CardData {
  name: string;
  link: string;
}

export type CardClickHandler = (link: string, name: string) => void;

export class Card {
  private data: CardData;
  private cardElement: HTMLElement;
  private handleCardClick: CardClickHandler;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: CardClickHandler,
  ) {
    this.data = data;
    this.handleCardClick = handleCardClick;
    this.cardElement = this.getTemplate(templateSelector);

    const titleElement = this.getElement<HTMLHeadingElement>(".card__title");
    const imageElement = this.getElement<HTMLImageElement>(".card__image");

    titleElement.textContent = this.data.name;
    imageElement.src = this.data.link;
    imageElement.alt = this.data.name;

    this.setEventListeners();
  }

  private getTemplate(templateSelector: string): HTMLElement {
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

  private getElement<T extends Element>(selector: string): T {
    const element = this.cardElement.querySelector<T>(selector);

    if (!element) {
      throw new Error(`No se encontró "${selector}" en la plantilla de tarjeta.`);
    }

    return element;
  }

  private setEventListeners(): void {
    const imageElement = this.getElement<HTMLImageElement>(".card__image");
    const likeButton = this.getElement<HTMLButtonElement>(
      ".card__like-button",
    );
    const deleteButton = this.getElement<HTMLButtonElement>(
      ".card__delete-button",
    );

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

  public generateCard(): HTMLElement {
    return this.cardElement;
  }
}
