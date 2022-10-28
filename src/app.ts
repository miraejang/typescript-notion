import { BaseComponent } from './components/component.js';
import { PageComponent } from './components/page.js';
import { ImageComponent } from './items/image.js';
import { NoteComponent } from './items/note.js';
import { TodoComponent } from './items/todo.js';
import { VideoComponent } from './items/video.js';

class App {
  page;
  constructor(appRoot: HTMLElement) {
    // ul 생성
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    // li 생성 - image
    const image = new ImageComponent('Image', 'https://picsum.photos/800/400');
    this.page.addChild(image);

    // li 생성 - video
    const video = new VideoComponent('Video Title', 'https://www.youtube.com/embed/5dppORtI6RA');
    this.page.addChild(video);

    // // li 생성 - note
    const note = new NoteComponent('Note title', 'hello~~~~');
    this.page.addChild(note);

    // // li 생성 - todo
    const todo = new TodoComponent('Todo Title', 'Study');
    this.page.addChild(todo);
  }
}

new App(document.querySelector('.main')! as HTMLElement);
