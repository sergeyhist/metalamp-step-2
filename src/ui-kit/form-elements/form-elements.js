import './form-elements.scss';
import 'common/input/input.js';
import 'common/dropdown/dropdown.js';
import 'common/checkbox/checkbox.js';

let elements = document.querySelectorAll('.page__element');

for (let element of elements) {
  if (element.querySelector('.page__element-mod')) {
    element.classList.add('page__element_mod');
  };
};