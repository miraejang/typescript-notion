import { BaseComponent } from '../components/component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class='item__image'>
            <div class="item__view-box">
              <img class="item__view image__thumbnail" />
            </div>
            <div class="item__title-box">
              <h2 class="item__title"></h2>
            </div>
          </section>`);

    const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector('.item__title')! as HTMLHeadElement;
    titleElement.textContent = title;
  }
}
