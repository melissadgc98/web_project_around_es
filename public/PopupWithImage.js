import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        const imageElement = this.popup.querySelector(".popup__image");
        const captionElement = this.popup.querySelector(".popup__caption");
        if (!imageElement || !captionElement) {
            throw new Error("El popup de imagen requiere una imagen y una leyenda.");
        }
        this.imageElement = imageElement;
        this.captionElement = captionElement;
    }
    open(data) {
        if (!data) {
            throw new Error("Se requieren los datos de imagen para abrir el popup.");
        }
        this.imageElement.src = data.link;
        this.imageElement.alt = data.name;
        this.captionElement.textContent = data.name;
        super.open();
    }
}
