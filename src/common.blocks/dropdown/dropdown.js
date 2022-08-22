import './dropdown.scss';

let dropdownElements = document.querySelectorAll('.dropdown');

for (let element of dropdownElements) {
  let dropdownShell = element.querySelector('.dropdown__shell');
  let dropdownInside = dropdownShell.querySelector('.dropdown__inside');
  let dropdownSubmenu = element.querySelector('.dropdown__submenu');
  let countNumbers = dropdownSubmenu.querySelectorAll('.dropdown__count');
  let clearButton = dropdownSubmenu.querySelector('.dropdown__button-clear');
  let confirmButton = dropdownSubmenu.querySelector('.dropdown__button-confirm');
  
  if (dropdownInside.dataset.dropdownType == 'guests') {
    clearButton.onclick = () => {
      for (let number of countNumbers) {
        number.textContent = 0;
        number.dispatchEvent(new Event('change'));
        dropdownInside.value = '';
      };
    };

    confirmButton.onclick = () => {
      dropdownInside.value = dropdownInside.dataset.countSum;
      if (dropdownSubmenu.classList.contains('dropdown__submenu_visible')) {
        dropdownSubmenu.classList.remove('dropdown__submenu_visible');
        setTimeout(() => {
          dropdownShell.classList.remove('dropdown__shell_radius_top');
          dropdownShell.classList.remove('dropdown__shell_focused');
        }, 100);
      }
    };
  };

  const switchVisibility = () => {
    if (!dropdownSubmenu.classList.contains('dropdown__submenu_visible')) {
      dropdownShell.classList.add('dropdown__shell_focused');
      dropdownSubmenu.classList.add('dropdown__submenu_visible');
      dropdownShell.classList.add('dropdown__shell_radius_top');
    } else {
      dropdownSubmenu.classList.remove('dropdown__submenu_visible');
      setTimeout(() => {
        dropdownShell.classList.remove('dropdown__shell_radius_top');
        dropdownShell.classList.remove('dropdown__shell_focused');
      }, 100);
    };
  };

  dropdownShell.onclick = () => {
    switchVisibility();
  };

  dropdownShell.onkeydown = (e) => {
    e.key == 'Enter' && switchVisibility();
  }

  document.body.addEventListener('mousedown', (event) => {
    if (dropdownSubmenu.classList.contains('dropdown__submenu_visible')) {
      if (!dropdownSubmenu.contains(event.target) && !dropdownShell.contains(event.target)) {
        dropdownSubmenu.classList.remove('dropdown__submenu_visible');
        setTimeout(() => {
          dropdownShell.classList.remove('dropdown__shell_radius_top');
          dropdownShell.classList.remove('dropdown__shell_focused');
        }, 100);
      };
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
      switch(dropdownInside.dataset.dropdownType) {
        case 'guests':
          let countSum = 0;

          switch(counter.previousSibling.textContent) {
            case 'младенцы':
              textVariants = [' младенец', ' младенца', ' младенцев'];
              break;
            default:
              textVariants = [' гость', ' гостя', ' гостей'];
          };

          for (let count of countNumbers) {
            countSum += +count.textContent;
          };
          countSum > 0 ? clearButton.classList.add('dropdown__button_visible') : clearButton.classList.remove('dropdown__button_visible');
          dropdownInside.dataset.countSum = countSum > 0 ? countSum+textVariants[(countSum % 100 > 4 && countSum %100 < 20) ? 2 : cases[countSum % 10 < 5 ? countSum % 10 : 5]] : '';
          break;
        case 'room':
          let textCounts = [];
          let dropdownCounters = dropdownSubmenu.querySelectorAll('.dropdown__counter');

          for (let counter of dropdownCounters) {
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
            let number = counter.querySelector('.dropdown__count').textContent;
            number > 0 ? textCounts.push(number+textVariants[(number % 100 > 4 && number %100 < 20) ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]) : textCounts.push('нет '+textVariants[2]);
          };
          dropdownInside.value = textCounts.join(', ');
          dropdownInside.value = dropdownInside.value.charAt(0).toUpperCase()+dropdownInside.value.slice(1);
      };
    };
    number.dispatchEvent(new Event('change'));
    confirmButton?.dispatchEvent(new Event('click'));
  };
};
