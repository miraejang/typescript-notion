import { BaseComponent } from '../components/component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<li class="item">
            <div class="item__wrap">
              <div class="item__body"></div>
              <div class="item__controls">
                <button class="close-button">&times;</button>
              </div>
            </div>
          </li>`);

    const imageWrap = this.element.querySelector('.item__wrap')! as HTMLElement;
    imageWrap.classList.add('item__preview', 'item__image');
    const imagebody = this.element.querySelector('.item__body')! as HTMLElement;

    const imageBodyTemp = document.createElement('template');
    imageBodyTemp.innerHTML = `<div class='item__container'>
                                <div class="item__view-box">
                                  <img
                                    src=${url}
                                    alt="title"
                                    class="item__view"
                                  />
                                </div>
                                <div class="item__title-box">
                                  <h2 class="item__title">${title}</h2>
                                </div>
                              </div>`;
    const image = imageBodyTemp.content.firstElementChild! as HTMLLIElement;
    imagebody.insertAdjacentElement('afterbegin', image);
  }
}
