import './room.scss';
import 'common/rate/rate.js';
import rooms from 'assets/json/rooms.json';

let roomElements = document.querySelectorAll('.room');

for (let element of roomElements) {
  let selectorItems = Array.from(element.querySelectorAll('.room__selector-item'));
  let roomImage = element.querySelector('.room__image');
  let prevButton = element.querySelector('.room__prev');
  let nextButton = element.querySelector('.room__next');
  let roomNumber = element.dataset.number;
  let room = rooms.find(obj => {return obj.number == roomNumber});
  let image = (i) => {return 'url('+require('assets/images/rooms/'+room.images.at(i))+')'}

  roomImage.style.backgroundImage = image(0);

  selectorItems[0].classList.add('room__selector-item_active');

  for (let i in selectorItems) {
    selectorItems[i].onclick = () => {
      selectorItems.forEach(item => item.classList.contains('room__selector-item_active') && item.classList.remove('room__selector-item_active'));
      selectorItems[i].classList.add('room__selector-item_active');
      roomImage.style.backgroundImage = image(i);
    };
  };

  let selectImage = (type) => {
    for (let i in selectorItems) {
      if (selectorItems[i].classList.contains('room__selector-item_active')) {
        selectorItems[i].classList.remove('room__selector-item_active');
        roomImage.style.backgroundImage = image(i);
        if (i == 0 && type == 'prev') {
          selectorItems.at(-1).classList.add('room__selector-item_active');
          roomImage.style.backgroundImage = image(-1);
        } else if (i == selectorItems.length-1 && type == 'next') {
          selectorItems.at(0).classList.add('room__selector-item_active');
          roomImage.style.backgroundImage = image(0);
        } else {
          let step = type == 'prev' ? +i - 1 : +i + 1;
          selectorItems[step].classList.add('room__selector-item_active');
          roomImage.style.backgroundImage = image(step);
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
