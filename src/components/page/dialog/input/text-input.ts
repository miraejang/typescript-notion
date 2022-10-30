import { BaseComponent } from '../../../component.js';

interface TextData {
  readonly title: string;
  readonly content: string;
}

export class TextSectionInput extends BaseComponent<HTMLElement> implements TextData {
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

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }
  get content(): string {
    const element = this.element.querySelector('#content')! as HTMLInputElement;
    return element.value;
  }
}
