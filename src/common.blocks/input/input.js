import IMask from 'imask';
import './input.scss';

let inputElements = document.querySelectorAll('.input');
let dateMask = (element) => IMask(element, {
  mask: 'ДД.ММ.ГГГГ',
  blocks: {
    ГГГГ: {
      mask: '0000'
    },
    ММ: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    ДД: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31
    }
  }
});

for (let element of inputElements) {
  let inputShell = element.querySelector('.input__shell');
  let inputInside = inputShell.querySelector('.input__inside');

  switch (inputInside.dataset.mask) {
    case 'date':
      dateMask(inputInside);
      break;
  };
}
