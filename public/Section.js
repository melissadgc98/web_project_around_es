export class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        const containerElement = document.querySelector(containerSelector);
        if (!containerElement) {
            throw new Error(`No se encontró el contenedor "${containerSelector}".`);
        }
        this.container = containerElement;
    }
    renderItems() {
        this.items.forEach((item) => {
            this.addItem(this.renderer(item));
        });
    }
    addItem(element) {
        this.container.append(element);
    }
}
