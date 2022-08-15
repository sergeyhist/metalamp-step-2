import './room.scss';

let roomElements = document.querySelectorAll('.room');

for (let element of roomElements) {
  let selectorItems = Array.from(element.querySelectorAll('.room__selector-item'));
  let roomImages = Array.from(element.querySelectorAll('.room__image'));
  let prevButton = element.querySelector('.room__prev');
  let nextButton = element.querySelector('.room__next');

  selectorItems[0].classList.add('room__selector-item_active');
  roomImages[0].classList.add('room__image_visible');

  for (let i in selectorItems) {
    selectorItems[i].onclick = () => {
      selectorItems.forEach(item => item.classList.contains('room__selector-item_active') && item.classList.remove('room__selector-item_active'));
      roomImages.forEach(image => image.classList.contains('room__image_visible') && image.classList.remove('room__image_visible'));
      roomImages[i].classList.add('room__image_visible');
      selectorItems[i].classList.add('room__selector-item_active');
    };
  };

  let selectImage = (type) => {
    for (let i in selectorItems) {
      if (selectorItems[i].classList.contains('room__selector-item_active')) {
        selectorItems[i].classList.remove('room__selector-item_active');
        roomImages[i].classList.remove('room__image_visible');
        if (i == 0 && type == 'prev') {
          selectorItems.at(-1).classList.add('room__selector-item_active');
          roomImages.at(-1).classList.add('room__image_visible');
        } else if (i == selectorItems.length-1 && type == 'next') {
          selectorItems.at(0).classList.add('room__selector-item_active');
          roomImages.at(0).classList.add('room__image_visible');
        } else {
          let step = type == 'prev' ? +i - 1 : +i + 1;
          selectorItems[step].classList.add('room__selector-item_active');
          roomImages[step].classList.add('room__image_visible');
        };
        break;
      };
    };
  };

  prevButton.onclick = () => {
    selectImage('prev');
  };

  nextButton.onclick = () => {
    selectImage('next');
  };
};
