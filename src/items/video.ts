import { BaseComponent } from '../components/component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<div class="item__video">
            <div class="item__view-box">
              <iframe
                class="item__view video__iframe"
                width="894"
                height="503"
                title="가을에 듣기좋은 노래 모음🍁 도입부 부터 좋은 팝송 감성 플리"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="item__title-box">
              <h2 class="item__title"></h2>
            </div>
          </div>`);

    const iframeElement = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    iframeElement.src = this.convertToEmbeddedURL(url);

    const titleElement = this.element.querySelector('.item__title')! as HTMLHeadElement;
    titleElement.textContent = title;
  }

  convertToEmbeddedURL(url: string): string {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);

    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
