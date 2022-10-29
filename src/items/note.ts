import { BaseComponent } from '../components/component.js';

export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, text: string) {
    super(`<div class="item__note">
            <div class="item__title-box">
              <h2 class="item__title"></h2>
            </div>
            <div class="item__content-box">
              <p class="item__text"></p>
            </div>
          </div>`);

    const titleElement = this.element.querySelector('.item__title')! as HTMLHeadElement;
    titleElement.textContent = title;

    const textElement = this.element.querySelector('.item__text')! as HTMLParagraphElement;
    textElement.textContent = text;
  }
}
