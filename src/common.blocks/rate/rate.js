import './rate.scss';

let rateElements = document.querySelectorAll('.rate');

for (let element of rateElements) {
  let elementStars = element.querySelectorAll('.rate__star');

  for (let i = 0; i < elementStars.length; i++) {
    i < element.dataset.rating ? elementStars[i].textContent = 'star' : elementStars[i].textContent = 'star_border';
  };

  element.onmouseout = () => {
    for (let i = 0; i < elementStars.length; i++) {
      i < element.dataset.rating ? elementStars[i].textContent = 'star' : elementStars[i].textContent = 'star_border';
    };
  };

  for (let star of elementStars) {
    star.onmouseover = () => {
      for (let i = 0; i < elementStars.length; i++) {
        i <= star.dataset.number ? elementStars[i].textContent = 'star' : elementStars[i].textContent = 'star_border';
      };
    };

    star.onclick = () => {
      element.dataset.rating = +star.dataset.number+1;
    };
  };
};
