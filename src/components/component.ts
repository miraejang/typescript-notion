export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  attach(component: Component, position?: InsertPosition): void;
  removeForm(parent: HTMLElement): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;
  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
  attach(component: Component, position?: InsertPosition) {
    component.attachTo(this.element, position);
  }
  removeForm(parent: HTMLElement) {
    parent.removeChild(this.element);
  }
}
