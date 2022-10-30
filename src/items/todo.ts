import { BaseComponent } from '../components/component.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`<div class="item__todo">
            <div class="item__title-box">
              <h2 class="item__title"></h2>
            </div>
            <div class="item__content-box">
              <input type="checkbox" name="title" id="id" class="item__input" />
              <label for="id" class="todo-label"></label>
            </div>
          </div>`);

    const titleElement = this.element.querySelector('.item__title')! as HTMLHeadElement;
    titleElement.textContent = title;

    const todoElement = this.element.querySelector('.todo-label')! as HTMLLabelElement;
    todoElement.textContent = todo;
  }
}
