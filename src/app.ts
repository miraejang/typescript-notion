import { MediaSectionInput } from './components/page/dialog/input/media-input.js';
import { Component } from './components/component.js';
import { Composable, PageComponent, PageItemComponent } from './components/page.js';
import { InputDialog } from './components/page/dialog/dialog.js';
import { ImageComponent } from './items/image.js';
import { NoteComponent } from './items/note.js';
import { TodoComponent } from './items/todo.js';
import { VideoComponent } from './items/video.js';
import { TextSectionInput } from './components/page/dialog/input/text-input.js';

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    // ul 생성
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    // // li 생성 - image
    // const image = new ImageComponent('Image', 'https://picsum.photos/800/500');
    // this.page.addChild(image);

    // // li 생성 - video
    // const video = new VideoComponent('Video Title', 'https://www.youtube.com/embed/5dppORtI6RA');
    // this.page.addChild(video);

    // // // li 생성 - note
    // const note = new NoteComponent('Note title', 'hello~~~~');
    // this.page.addChild(note);

    // // // li 생성 - todo
    // const todo = new TodoComponent('Todo Title', 'Study');
    // this.page.addChild(todo);

    const imageBtn = document.querySelector('.new-image')! as HTMLButtonElement;
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const section = new MediaSectionInput();
      dialog.addChild(section);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeForm(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const img = new ImageComponent(section.title, section.url);
        this.page.addChild(img);
        dialog.removeForm(dialogRoot);
      });
    });

    const videoBtn = document.querySelector('.new-video')! as HTMLButtonElement;
    videoBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const section = new MediaSectionInput();
      dialog.addChild(section);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeForm(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const video = new VideoComponent(section.title, section.url);
        this.page.addChild(video);
        dialog.removeForm(dialogRoot);
      });
    });

    const noteBtn = document.querySelector('.new-note')! as HTMLButtonElement;
    noteBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const section = new TextSectionInput();
      dialog.addChild(section);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeForm(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const note = new NoteComponent(section.title, section.content);
        this.page.addChild(note);
        dialog.removeForm(dialogRoot);
      });
    });

    const todoBtn = document.querySelector('.new-todo')! as HTMLButtonElement;
    todoBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const section = new TextSectionInput();
      dialog.addChild(section);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeForm(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const todo = new TodoComponent(section.title, section.content);
        this.page.addChild(todo);
        dialog.removeForm(dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.main')! as HTMLElement, document.body);
