import { BaseComponent, Component } from './component.js';

interface Composable {
  addChild(child: Component): void;
}
export class PageItemComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    super(`<li class="item">
            <div class="item__wrap">
              <div class="item__body"></div>
              <div class="item__controls">
                <button class="close-button">&times;</button>
              </div>
            </div>
          </li>`);
  }

  addChild(child: Component): void {
    const body = this.element.querySelector('.item__body')! as HTMLElement;
    child.attachTo(body);
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    super('<ul class="items"></ul>');
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
  }
}
