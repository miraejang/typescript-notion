import { MediaData, MediaSectionInput } from './components/page/dialog/input/media-input.js';
import { Component } from './components/component.js';
import { Composable, PageComponent, PageItemComponent } from './components/page.js';
import { InputDialog } from './components/page/dialog/dialog.js';
import { ImageComponent } from './items/image.js';
import { NoteComponent } from './items/note.js';
import { TodoComponent } from './items/todo.js';
import { VideoComponent } from './items/video.js';
import { TextData, TextSectionInput } from './components/page/dialog/input/text-input.js';

type InputComponentConstructor<T extends (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    // ul 생성
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    // For demo :)
    this.page.addChild(new ImageComponent('Image Sample', 'https://picsum.photos/800/500'));
    this.page.addChild(new VideoComponent('Video Sample', 'https://www.youtube.com/embed/5dppORtI6RA'));
    this.page.addChild(new NoteComponent('Note Sample', 'Hello~'));
    this.page.addChild(new TodoComponent('Todo Sample', 'Study'));

    this.bindElementTodialog('.new-image', MediaSectionInput, (input: MediaSectionInput) => new ImageComponent(input.title, input.url));
    this.bindElementTodialog('.new-video', MediaSectionInput, (input: MediaSectionInput) => new VideoComponent(input.title, input.url));
    this.bindElementTodialog('.new-note', TextSectionInput, (input: TextSectionInput) => new NoteComponent(input.title, input.content));
    this.bindElementTodialog('.new-todo', TextSectionInput, (input: TextSectionInput) => new TodoComponent(input.title, input.content));
  }

  bindElementTodialog<T extends (MediaData | TextData) & Component>(selector: string, InputCompoent: InputComponentConstructor<T>, makeSection: (input: T) => Component) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputCompoent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeForm(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const todo = makeSection(input);
        this.page.addChild(todo);
        dialog.removeForm(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.main')! as HTMLElement, document.body);
