import { BaseComponent } from '../../../component.js';
export class MediaSectionInput extends BaseComponent {
    constructor() {
        super(`<div class="form__container">
            <div class="input-box">
              <label for="title">Title</label>
              <input type="text" id="title" />
            </div>
            <div class="input-box">
              <label for="url">URL</label>
              <input type="text" id="url" />
            </div>
          </div>`);
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get url() {
        const element = this.element.querySelector('#url');
        return element.value;
    }
}
