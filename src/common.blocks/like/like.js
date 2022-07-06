import './like.scss';

let likeElements = document.querySelectorAll('.like');

for (let element of likeElements) {
  let elementIcon = element.querySelector('.like__icon');
  let elementCounter = element.querySelector('.like__counter');

  if (element.dataset.active == 'true') {
    element.classList.add('like_active');
    elementIcon.classList.add('like__icon_active');
    elementCounter.classList.add('like__counter_active');
    elementIcon.textContent = 'favorite';
  };

  element.onclick = () => {
    if (element.classList.contains('like_active')) {
      element.classList.remove('like_active');
      elementIcon.classList.remove('like__icon_active');
      elementCounter.classList.remove('like__counter_active');
      elementIcon.textContent = 'favorite_border';
      +elementCounter.textContent > 0 ? elementCounter.textContent = +elementCounter.textContent-1 : '';
    } else {
      element.classList.add('like_active');
      elementIcon.classList.add('like__icon_active');
      elementCounter.classList.add('like__counter_active');
      elementIcon.textContent = 'favorite';
      elementCounter.textContent = +elementCounter.textContent+1;
    };
  };
};
