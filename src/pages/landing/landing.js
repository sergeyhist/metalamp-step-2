import './landing.scss';
import 'common/header/header.js';
import 'common/footer/footer.js';
import 'cards/search/search.js';
import slide1 from 'assets/images/slide_1.png';
import slide2 from 'assets/images/slide_2.png';

let pageText = document.querySelector('.page__text');
let pageSlideshow = document.querySelector('.page__slideshow');

pageText.classList.add('page__text_bottom');
pageSlideshow.style.backgroundImage = `url(${slide2})`;

setInterval(() => {
  if (pageText.classList.contains('page__text_top')) {
    pageText.style.opacity = 0;
    pageSlideshow.style.opacity = 0;
    setTimeout(() => {
      pageText.classList.remove('page__text_top');
      pageText.classList.add('page__text_bottom');
      pageSlideshow.style.backgroundImage = `url(${slide2})`;
      pageText.style.opacity = 1;
      pageSlideshow.style.opacity = 1;
    }, 1000);
  } else {
    pageText.style.opacity = 0;
    pageSlideshow.style.opacity = 0;
    setTimeout(() => {
      pageText.classList.remove('page__text_bottom');
      pageText.classList.add('page__text_top');
      pageSlideshow.style.backgroundImage = `url(${slide1})`;
      pageText.style.opacity = 1;
      pageSlideshow.style.opacity = 1;
    }, 500);
  };
}, 10000);
