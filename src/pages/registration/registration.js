import './registration.scss';
import 'common/header/header.js';
import 'common/footer/footer.js';
import 'cards/registration/registration.js';
import slide1 from 'assets/images/slide_1.png';
import slide3 from 'assets/images/slide_3.png';

let pageSlideshow = document.querySelector('.page__slideshow');

pageSlideshow.style.backgroundImage = `url(${slide3})`;

setInterval(() => {
  if (pageSlideshow.style.backgroundImage == `url(${slide1})`) {
    pageSlideshow.style.opacity = 0;
    setTimeout(() => {
      pageSlideshow.style.backgroundImage = `url(${slide3})`;
      pageSlideshow.style.opacity = 1;
    }, 1000);
  } else {
    pageSlideshow.style.opacity = 0;
    setTimeout(() => {
      pageSlideshow.style.backgroundImage = `url(${slide1})`;
      pageSlideshow.style.opacity = 1;
    }, 500);
  };
}, 10000);
