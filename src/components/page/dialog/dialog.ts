import { Composable } from '../../page.js';
import { BaseComponent, Component } from './../../component.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  private closeListener?: OnCloseListener;
  private submitListener?: OnSubmitListener;
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

  addChild(child: Component) {
    const form = this.element.querySelector('.dialog__form')! as HTMLElement;
    child.attachTo(form);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnCloseListener) {
    this.submitListener = listener;
  }
}
