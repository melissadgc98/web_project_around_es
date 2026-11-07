export class Popup {
    constructor(selector) {
        const popup = document.querySelector(selector);
        if (!popup) {
            throw new Error(`No se encontró el popup "${selector}".`);
        }
        this.popup = popup;
    }
    open() {
        this.popup.classList.add("popup_is-opened");
    }
    close() {
        this.popup.classList.remove("popup_is-opened");
    }
    handleEscClose(event) {
        if (event.key === "Escape" &&
            this.popup.classList.contains("popup_is-opened")) {
            this.close();
        }
    }
    setEventListeners() {
        const closeButton = this.popup.querySelector(".popup__close");
        if (!closeButton) {
            throw new Error("No se encontró el botón para cerrar el popup.");
        }
        closeButton.addEventListener("click", () => this.close());
        this.popup.addEventListener("click", (event) => {
            if (event.target === this.popup) {
                this.close();
            }
        });
        document.addEventListener("keydown", (event) => {
            this.handleEscClose(event);
        });
    }
}
