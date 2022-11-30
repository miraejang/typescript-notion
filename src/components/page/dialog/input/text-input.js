import { BaseComponent } from '../../../component.js';
export class TextSectionInput extends BaseComponent {
    constructor() {
        super(`<div class="form__container">
            <div class="input-box">
              <label for="title">Title</label>
              <input type="text" id="title" />
            </div>
            <div class="input-box">
              <label for="content">Content</label>
              <input type="text" id="content" />
            </div>
          </div>`);
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get content() {
        const element = this.element.querySelector('#content');
        return element.value;
    }
}
