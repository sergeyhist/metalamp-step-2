import './form-elements.scss';
import 'common/input/input.js';

let elements = document.querySelectorAll('.form-elements__element');

for (let element of elements) {
  if (element.querySelector('.form-elements__mod')) {
    element.classList.add('form-elements__element_mod');
  };
};