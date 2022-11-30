import { BaseComponent } from './../../component.js';
export class InputDialog extends BaseComponent {
    constructor() {
        super(`<section class="dialog">
            <div class="dialog__container">
              <button class="close-button">&times;</button>
              <div class="dialog__body">
                <form class="dialog__form">
                  <div class="dialog__submit">
                    <button class="submit-button">ADD</button>
                  </div>
                </form>
              </div>
            </div>
          </section>`);
        const clsoeBtn = this.element.querySelector('.close-button');
        clsoeBtn.addEventListener('click', () => {
            this.closeListener && this.closeListener();
        });
        const submitBtn = this.element.querySelector('.submit-button');
        submitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.submitListener && this.submitListener();
        });
    }
    addChild(child) {
        const form = this.element.querySelector('.dialog__form');
        child.attachTo(form);
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener) {
        this.submitListener = listener;
    }
}
