export class BaseComponent {
  element;
  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as HTMLUListElement;
  }

  attachTo(
    parent: HTMLElement,
    position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
  ) {
    parent.insertAdjacentElement(position, this.element);
  }
}
