import { BaseComponent } from '../components/component.js';
export class TodoComponent extends BaseComponent {
    constructor(title, todo) {
        super(`<div class="item__todo">
            <div class="item__title-box">
              <h2 class="item__title"></h2>
            </div>
            <div class="item__content-box">
              <input type="checkbox" name="title" id="id" class="item__input" />
              <label for="id" class="todo-label"></label>
            </div>
          </div>`);
        const titleElement = this.element.querySelector('.item__title');
        titleElement.textContent = title;
        const todoElement = this.element.querySelector('.todo-label');
        todoElement.textContent = todo;
    }
}
