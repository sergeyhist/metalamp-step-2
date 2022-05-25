import IMask from 'imask';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
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
  let inputMain = element.querySelector('.input__main');
  let inputField = inputMain.querySelector('.input__field');
  switch (inputField.dataset.maskedType) {
    case 'date':
      dateMask(inputField);
      break;
  };
  switch (inputField.dataset.textType) {
    case 'date':
      let calendar = new AirDatepicker(inputField);
      inputMain.onclick = () => {
        if (calendar.visible !== true) {
          inputMain.classList.add('input__main_focused');
          calendar.show();
        } else {
          inputMain.classList.remove('input__main_focused');
          calendar.hide();
        };
      };
      document.body.addEventListener('mousedown', (e) => {
        if (!calendar.$datepicker.contains(e.target) && !inputMain.contains(e.target)) {
            inputMain.classList.remove('input__main_focused');
            calendar.hide();
        };
      });
      break;
  };
  if (inputField.dataset.submenuType) {
    let inputSubmenu = element.querySelector('.input__submenu');
    let countNumbers = inputSubmenu.querySelectorAll('.input__count');

    if (inputField.dataset.submenuType == 'guests') {
      let clearButton = inputSubmenu.querySelector('.input__button_clear');
      let confirmButton = inputSubmenu.querySelector('.input__button_confirm');

      clearButton.onclick = () => {
        for (let number of countNumbers) {
          number.textContent = 0;
          number.dispatchEvent(new Event('change'));
          inputField.value = '';
        };
      };
  
      confirmButton.onclick = () => {
        countNumbers[0].dispatchEvent(new Event('change'));
        inputField.value = inputField.dataset.countSum;
        inputMain.dispatchEvent(new Event('click'));
      };
    };

    inputMain.onclick = () => {
      if (inputSubmenu.classList.contains('input__submenu_visible')) {
        inputSubmenu.classList.remove('input__submenu_visible');
        setTimeout(() => {
          inputMain.classList.remove('input__main_radius_top');
          inputMain.classList.remove('input__main_focused');
        }, 100);
      } else {
        inputMain.classList.add('input__main_focused');
        inputSubmenu.classList.add('input__submenu_visible');
        inputMain.classList.add('input__main_radius_top');
      };
    };

    document.body.addEventListener('mousedown', (e) => {
      if (!inputSubmenu.contains(e.target) && !inputMain.contains(e.target)) {
        inputSubmenu.classList.remove('input__submenu_visible');
        setTimeout(() => {
          inputMain.classList.remove('input__main_radius_top');
          inputMain.classList.remove('input__main_focused');
        }, 100);
      };
    });

    for (let number of countNumbers) {
      number.nextSibling.onclick = () => {
        number.textContent++;
        number.dispatchEvent(new Event('change'));
      };
      number.previousSibling.onclick = () => {
        number.textContent > 0 && number.textContent--;
        number.dispatchEvent(new Event('change'));
      };

      if (number.textContent == 0) {number.previousSibling.disabled = true};
      number.onchange = () => {
        number.textContent > 0 ? number.previousSibling.disabled = false : number.previousSibling.disabled = true;
        let cases = [2,0,1,1,1,2];
        let textVariants = [];
        switch(inputField.dataset.submenuType) {
          case 'guests':
            let countSum = 0;
            let clearButton = inputSubmenu.querySelector('.input__button_clear');
            textVariants = [' гость', ' гостя', ' гостей'];
            for (let count of countNumbers) {
              countSum += +count.textContent;
            };
            countSum > 0 ? clearButton.classList.add('input__button_visible') : clearButton.classList.remove('input__button_visible');
            inputField.dataset.countSum = countSum > 0 ? countSum+textVariants[(countSum % 100 > 4 && countSum %100 < 20) ? 2 : cases[countSum % 10 < 5 ? countSum % 10 : 5]] : '';
            break;
          case 'items':
            let numbers = [];
            let inputCounters = inputSubmenu.querySelectorAll('.input__counter');
            for (let counter of inputCounters) {
              switch(counter.previousSibling.textContent) {
                case 'спальни':
                  textVariants = [' спальня', ' спальни', ' спален'];
                  break;
                case 'кровати':
                  textVariants = [' кровать', ' кровати', ' кроватей'];
                  break;
                case 'ванные комнаты':
                  textVariants = [' ванная комната', ' ванные комнаты', ' ванных комнат'];
              };
              let number = counter.querySelector('.input__count').textContent;
              number > 0  && numbers.push(number+textVariants[(number % 100 > 4 && number %100 < 20) ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]);
            };
            inputField.value = numbers.join(', ');
        };
      };
    };
  };
}
