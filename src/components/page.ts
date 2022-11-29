import { BaseComponent, Component } from './component.js';

export interface Composable {
  addChild(child: Component): void;
}
type OnCloseListener = () => void;
type DragState = 'start' | 'end' | 'enter' | 'leave';
type OnDragListener<T extends Component> = (target: T, state: DragState) => void;
interface SectionContainer extends Component, Composable {
  setOnCloseLisetener(listener: OnCloseListener): void;
  setOnDragListener(listener: OnDragListener<SectionContainer>): void;
  onDropped(): void;
  getBoundRect(): DOMRect;
  muteChildren(state: 'mute' | 'unmute'): void;
}
type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;
  private dragListener?: OnDragListener<PageItemComponent>;
  constructor() {
    super(`<li class="item" draggable="true">
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

    this.element.addEventListener('dragstart', (e: DragEvent) => {
      this.notifyDragObservers('start');
      this.element.classList.add('lifted');
    });
    this.element.addEventListener('dragend', (e: DragEvent) => {
      this.notifyDragObservers('end');
      this.element.classList.remove('lifted');
    });
    this.element.addEventListener('dragenter', (e: DragEvent) => {
      this.notifyDragObservers('enter');
      this.element.classList.add('drop-area');
    });
    this.element.addEventListener('dragleave', (e: DragEvent) => {
      this.notifyDragObservers('leave');
      this.element.classList.remove('drop-area');
    });
  }

  addChild(child: Component): void {
    const body = this.element.querySelector('.item__body')! as HTMLElement;
    child.attachTo(body);
  }
  setOnCloseLisetener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnDragListener(listener: OnDragListener<PageItemComponent>) {
    this.dragListener = listener;
  }
  notifyDragObservers(state: DragState) {
    this.dragListener && this.dragListener(this, state);
  }
  onDropped() {
    this.element.classList.remove('drop-area');
  }
  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }
  getBoundRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  children = new Set<SectionContainer>();
  dragTarget?: SectionContainer;
  dropTarget?: SectionContainer;
  constructor(private PageItemComponent: SectionContainerConstructor) {
    super('<ul class="items"></ul>');

    this.element.addEventListener('dragover', (e: DragEvent) => e.preventDefault());
    this.element.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault();

      if (!this.dropTarget) return;
      if (this.dragTarget && this.dragTarget !== this.dropTarget) {
        const dropY = e.clientY;
        const srcElement = this.dragTarget.getBoundRect();
        this.dragTarget.removeForm(this.element);
        this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
      }
      this.dropTarget.onDropped();
    });
  }

  addChild(section: Component) {
    const item = new this.PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseLisetener(() => {
      item.removeForm(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragListener((target: SectionContainer, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target;
          this.updatedSections('mute');
          break;
        case 'end':
          this.dragTarget = undefined;
          this.updatedSections('unmute');
          break;
        case 'enter':
          this.dropTarget = target;
          break;
        case 'leave':
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`unSupoorted state: ${state}`);
      }
    });
  }

  private updatedSections(state: 'mute' | 'unmute') {
    this.children.forEach((sections: SectionContainer) => sections.muteChildren(state));
  }
}
