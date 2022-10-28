import { BaseComponent } from '../components/component.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, text: string) {
    super(`<div class="item__todo">
            <div class="item__title-box">
              <h2 class="item__title">${title}</h2>
            </div>
            <div class="item__content-box">
              <input type="checkbox" name="title" id="id" class="item__input" />
              <label for="id">${text}</label>
            </div>
          </div>`);
  }
}
