import { BaseComponent } from '../components/component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class='item__image'>
            <div class="item__view-box">
              <img src=${url} alt="title" class="item__view" />
            </div>
            <div class="item__title-box">
              <h2 class="item__title">${title}</h2>
            </div>
          </section>`);
  }
}
