import { BaseComponent } from '../../../component.js';

interface MediaData {
  readonly title: string;
  readonly url: string;
}

export class MediaSectionInput extends BaseComponent<HTMLElement> implements MediaData {
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

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }
  get url(): string {
    const element = this.element.querySelector('#url')! as HTMLInputElement;
    return element.value;
  }
}
