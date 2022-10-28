import { BaseComponent } from '../components/component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<div class="item__video">
            <div class="item__view-box">
              <iframe
                class="item__view"
                width="894"
                height="503"
                src="${url}"
                title="가을에 듣기좋은 노래 모음🍁 도입부 부터 좋은 팝송 감성 플리"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="item__title-box">
              <h2 class="item__title">${title}</h2>
            </div>
          </div>`);
  }
}
