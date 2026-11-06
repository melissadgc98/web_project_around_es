export interface SectionRenderer<T> {
  items: T[];
  renderer: (item: T) => HTMLElement;
}

export class Section<T> {
  private items: T[];
  private renderer: (item: T) => HTMLElement;
  private container: HTMLElement;

  constructor(
    { items, renderer }: SectionRenderer<T>,
    containerSelector: string,
  ) {
    this.items = items;
    this.renderer = renderer;

    const containerElement =
      document.querySelector<HTMLElement>(containerSelector);
    if (!containerElement) {
      throw new Error(`No se encontró el contenedor "${containerSelector}".`);
    }

    this.container = containerElement;
  }

  public renderItems(): void {
    this.items.forEach((item) => {
      this.addItem(this.renderer(item));
    });
  }

  public addItem(element: HTMLElement): void {
    this.container.append(element);
  }
}
