import './room.scss';
import * as rooms from 'assets/json/rooms.json';

let roomElements = document.querySelectorAll('.room');

for (let element of roomElements) {
  let roomNumber = element.dataset.number;
  let selectorItems = element.querySelectorAll('.room__selector-item');

  selectorItems[0].classList.add('room__selector-item_active');
};
