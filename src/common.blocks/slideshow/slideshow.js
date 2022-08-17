import './slideshow.scss';

let slideshowElements = document.querySelectorAll('.slideshow');

for (let element of slideshowElements) {
  let slideshowImage = element.querySelector('.slideshow__image');
  let images = slideshowImage.dataset.images.split(',');
  let i = 1;

  slideshowImage.src = require('assets/images/'+images[0]);

  setInterval(() => {
    slideshowImage.classList.add('slideshow__image_hidden');
    setTimeout(() => {
      slideshowImage.src = require('assets/images/'+images[i]);
      slideshowImage.classList.remove('slideshow__image_hidden');
      i < images.length - 1 ? i++ : i = 0;
    }, 1000);
  }, 10000);
};
