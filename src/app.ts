import { BaseComponent } from './components/component.js';
import { PageComponent } from './components/page.js';
import { ImageComponent } from './items/image.js';

class App {
  constructor(appRoot: HTMLElement) {
    // ul 생성
    const page = new PageComponent();
    page.attachTo(appRoot, 'beforeend');

    const ul = appRoot.querySelector('.items')! as HTMLUListElement;

    // li 생성 - image
    const imageTemp = new ImageComponent('Image', 'https://picsum.photos/800/400');
    imageTemp.attachTo(ul, 'beforeend');

    // li 생성 - video
    const videoTemp = new BaseComponent(`<li class="item">
                                          <div class="item__wrap">
                                            <div class="item__body"></div>
                                            <div class="item__controls">
                                              <button class="close-button">&times;</button>
                                            </div>
                                          </div>
                                        </li>`);
    videoTemp.attachTo(ul, 'beforeend');
    const videoLi = videoTemp.element;

    const videoWrap = videoLi.querySelector('.item__wrap')! as HTMLElement;
    videoWrap.classList.add('item__preview', 'item__video');
    const videoLibody = videoLi.querySelector('.item__body')! as HTMLElement;
    const videoBody = document.createElement('template');
    videoBody.innerHTML = `<div class='item__container'>
                              <div class="item__view-box">
                                <iframe
                                  class="item__view"
                                  width="894"
                                  height="503"
                                  src="https://www.youtube.com/embed/5dppORtI6RA"
                                  title="가을에 듣기좋은 노래 모음🍁 도입부 부터 좋은 팝송 감성 플리"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              </div>
                              <div class="item__title-box">
                                <h2 class="item__title">video</h2>
                              </div>
                            </div>`;
    const video = videoBody.content.firstElementChild! as HTMLLIElement;
    videoLibody.insertAdjacentElement('beforeend', video);

    // li 생성 - note
    const noteTemp = new BaseComponent(`<li class="item">
                                          <div class="item__wrap">
                                            <div class="item__body"></div>
                                            <div class="item__controls">
                                              <button class="close-button">&times;</button>
                                            </div>
                                          </div>
                                        </li>`);
    noteTemp.attachTo(ul, 'beforeend');
    const noteLi = noteTemp.element;

    const noteWrap = noteLi.querySelector('.item__wrap')! as HTMLElement;
    noteWrap.classList.add('item__basic', 'item__note');
    const noteLibody = noteLi.querySelector('.item__body')! as HTMLElement;
    const noteBody = document.createElement('template');
    noteBody.innerHTML = `<div class='item__container'>
                            <div class="item__title-box">
                              <h2 class="item__title">Note</h2>
                            </div>
                            <div class="item__content-box">
                              <p class="item__text">hi~!</p>
                            </div>
                          </div>`;
    const note = noteBody.content.firstElementChild! as HTMLLIElement;
    noteLibody.insertAdjacentElement('afterbegin', note);

    // li 생성 - todo
    const todoTemp = new BaseComponent(`<li class="item">
                                          <div class="item__wrap">
                                            <div class="item__body"></div>
                                            <div class="item__controls">
                                              <button class="close-button">&times;</button>
                                            </div>
                                          </div>
                                        </li>`);
    todoTemp.attachTo(ul, 'beforeend');
    const todoLi = todoTemp.element;

    const todoWrap = todoLi.querySelector('.item__wrap')! as HTMLElement;
    todoWrap.classList.add('item__basic', 'item__todo');
    const todoLibody = todoLi.querySelector('.item__body')! as HTMLElement;
    const todoBody = document.createElement('template');
    todoBody.innerHTML = `<div class='item__container'>
                            <div class="item__title-box">
                              <h2 class="item__title">To Do</h2>
                            </div>
                            <div class="item__content-box">
                              <input type="checkbox" name="title" id="id" class="item__input" />
                              <label for="id">content</label>
                            </div>
                          </div>`;
    const todo = todoBody.content.firstElementChild! as HTMLLIElement;
    todoLibody.insertAdjacentElement('afterbegin', todo);
  }
}

new App(document.querySelector('.main')! as HTMLElement);
