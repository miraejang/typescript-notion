import { BaseComponent } from './../../component.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog extends BaseComponent<HTMLElement> {
  private closeListener?: OnCloseListener;
  private submitListener?: OnSubmitListener;
  constructor() {
    super(`<section class="dialog">
            <div class="dialog__container">
              <button class="close-button">&times;</button>
              <div class="dialog__body">
                <form>
                  <div class="form__container">
                    <div class="input-box">
                      <label for="title">Title</label>
                      <input type="text" id="title" />
                    </div>
                    <div class="input-box">
                      <label for="url">URL</label>
                      <input type="text" id="url" />
                    </div>
                  </div>
                  <div class="dialog__submit">
                    <button class="submit-button">ADD</button>
                  </div>
                </form>
              </div>
            </div>
          </section>`);

    const clsoeBtn = this.element.querySelector('.close-button')! as HTMLButtonElement;
    clsoeBtn.addEventListener('click', () => {
      this.closeListener && this.closeListener();
    });

    const submitBtn = this.element.querySelector('.submit-button')! as HTMLButtonElement;
    submitBtn.addEventListener('click', e => {
      e.preventDefault();
      this.submitListener && this.submitListener();
    });
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnCloseListener) {
    this.submitListener = listener;
  }

  get title(): string {
    const element = document.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }
  get url(): string {
    const element = document.querySelector('#url')! as HTMLInputElement;
    return element.value;
  }
}
