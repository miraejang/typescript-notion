import { BaseComponent, Component } from './component.js';

export interface Composable {
  addChild(child: Component): void;
}
type OnCloseLisetener = () => void;
interface SectionContainer extends Component, Composable {
  setOncloseLisetener(lisetener: OnCloseLisetener): void;
}
type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent extends BaseComponent<HTMLUListElement> implements SectionContainer {
  private closeListener?: OnCloseLisetener;
  constructor() {
    super(`<li class="item">
            <div class="item__wrap">
              <div class="item__body"></div>
              <div class="item__controls">
                <button class="close-button">&times;</button>
              </div>
            </div>
          </li>`);
    const cloaseBtn = this.element.querySelector('.close-button')! as HTMLButtonElement;
    cloaseBtn.addEventListener('click', () => {
      this.closeListener && this.closeListener();
    });
  }

  addChild(child: Component): void {
    const body = this.element.querySelector('.item__body')! as HTMLElement;
    child.attachTo(body);
  }
  setOncloseLisetener(lisetener: OnCloseLisetener) {
    this.closeListener = lisetener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private PageItemComponent: SectionContainerConstructor) {
    super('<ul class="items"></ul>');
  }

  addChild(section: Component) {
    const item = new this.PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOncloseLisetener(() => {
      item.removeForm(this.element);
    });
  }
}
