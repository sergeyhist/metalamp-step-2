import './landing.scss';
import 'common/header/header.js';
import 'common/footer/footer.js';
import 'common/slideshow/slideshow.js';
import 'cards/search/search.js';

let pageText = document.querySelector('.page__text')

pageText.classList.add('page__text_bottom');

setInterval(() => {
  if (pageText.classList.contains('page__text_top')) {
    pageText.style.opacity = 0;
    setTimeout(() => {
      pageText.classList.remove('page__text_top');
      pageText.classList.add('page__text_bottom');
      pageText.style.opacity = 1;
    }, 1000);
  } else {
    pageText.style.opacity = 0;
    setTimeout(() => {
      pageText.classList.remove('page__text_bottom');
      pageText.classList.add('page__text_top');
      pageText.style.opacity = 1;
    }, 1000);
  };
}, 10000);
