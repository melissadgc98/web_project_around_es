import { Popup } from "./Popup.js";

export interface ImagePopupData {
  name: string;
  link: string;
}

export class PopupWithImage extends Popup {
  private imageElement: HTMLImageElement;
  private captionElement: HTMLElement;

  constructor(selector: string) {
    super(selector);

    const imageElement =
      this.popup.querySelector<HTMLImageElement>(".popup__image");
    const captionElement =
      this.popup.querySelector<HTMLElement>(".popup__caption");

    if (!imageElement || !captionElement) {
      throw new Error("El popup de imagen requiere una imagen y una leyenda.");
    }

    this.imageElement = imageElement;
    this.captionElement = captionElement;
  }

  public override open(data?: ImagePopupData): void {
    if (!data) {
      throw new Error("Se requieren los datos de imagen para abrir el popup.");
    }

    this.imageElement.src = data.link;
    this.imageElement.alt = data.name;
    this.captionElement.textContent = data.name;
    super.open();
  }
}
