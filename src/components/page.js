import { BaseComponent } from './component.js';
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li class="item" draggable="true">
            <div class="item__wrap">
              <div class="item__body"></div>
              <div class="item__controls">
                <button class="close-button">&times;</button>
              </div>
            </div>
          </li>`);
        const cloaseBtn = this.element.querySelector('.close-button');
        cloaseBtn.addEventListener('click', () => {
            this.closeListener && this.closeListener();
        });
        this.element.addEventListener('dragstart', (e) => {
            this.notifyDragObservers('start');
            this.element.classList.add('lifted');
        });
        this.element.addEventListener('dragend', (e) => {
            this.notifyDragObservers('end');
            this.element.classList.remove('lifted');
        });
        this.element.addEventListener('dragenter', (e) => {
            this.notifyDragObservers('enter');
            this.element.classList.add('drop-area');
        });
        this.element.addEventListener('dragleave', (e) => {
            this.notifyDragObservers('leave');
            this.element.classList.remove('drop-area');
        });
    }
    addChild(child) {
        const body = this.element.querySelector('.item__body');
        child.attachTo(body);
    }
    setOnCloseLisetener(listener) {
        this.closeListener = listener;
    }
    setOnDragListener(listener) {
        this.dragListener = listener;
    }
    notifyDragObservers(state) {
        this.dragListener && this.dragListener(this, state);
    }
    onDropped() {
        this.element.classList.remove('drop-area');
    }
    muteChildren(state) {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        }
        else {
            this.element.classList.remove('mute-children');
        }
    }
    getBoundRect() {
        return this.element.getBoundingClientRect();
    }
}
export class PageComponent extends BaseComponent {
    constructor(PageItemComponent) {
        super('<ul class="items"></ul>');
        this.PageItemComponent = PageItemComponent;
        this.children = new Set();
        this.element.addEventListener('dragover', (e) => e.preventDefault());
        this.element.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!this.dropTarget)
                return;
            if (this.dragTarget && this.dragTarget !== this.dropTarget) {
                const dropY = e.clientY;
                const srcElement = this.dragTarget.getBoundRect();
                this.dragTarget.removeForm(this.element);
                this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
            }
            this.dropTarget.onDropped();
        });
    }
    addChild(section) {
        const item = new this.PageItemComponent();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseLisetener(() => {
            item.removeForm(this.element);
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragListener((target, state) => {
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
    updatedSections(state) {
        this.children.forEach((sections) => sections.muteChildren(state));
    }
}
