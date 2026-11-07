export class Popup {
  protected popup: HTMLElement;

  constructor(selector: string) {
    const popup = document.querySelector<HTMLElement>(selector);
    if (!popup) {
      throw new Error(`No se encontró el popup "${selector}".`);
    }

    this.popup = popup;
  }

  public open(): void {
    this.popup.classList.add("popup_is-opened");
  }

  public close(): void {
    this.popup.classList.remove("popup_is-opened");
  }

  private handleEscClose(event: KeyboardEvent): void {
    if (
      event.key === "Escape" &&
      this.popup.classList.contains("popup_is-opened")
    ) {
      this.close();
    }
  }

  public setEventListeners(): void {
    const closeButton =
      this.popup.querySelector<HTMLButtonElement>(".popup__close");
    if (!closeButton) {
      throw new Error("No se encontró el botón para cerrar el popup.");
    }

    closeButton.addEventListener("click", () => this.close());
    this.popup.addEventListener("click", (event: MouseEvent) => {
      if (event.target === this.popup) {
        this.close();
      }
    });
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      this.handleEscClose(event);
    });
  }
}
