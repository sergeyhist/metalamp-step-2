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
      dropdownInside.value = dropdownInside.dataset.sum;
      dropdownInside.value = dropdownInside.value.charAt(0).toUpperCase()+dropdownInside.value.slice(1);
      if (dropdownSubmenu.classList.contains('dropdown__submenu_visible') && !dropdownSubmenu.classList.contains('dropdown__submenu_solid')) {
        dropdownSubmenu.classList.remove('dropdown__submenu_visible');
        dropdownSubmenu.classList.remove('dropdown__submenu_solid');
        setTimeout(() => {
          dropdownShell.classList.remove('dropdown__shell_focused');
          dropdownShell.classList.remove('dropdown__shell_solid');
        }, 100);
      }
    };
  };

  const switchVisibility = () => {
    if (!dropdownSubmenu.classList.contains('dropdown__submenu_visible') && !dropdownSubmenu.classList.contains('dropdown__submenu_solid')) {
      dropdownShell.classList.add('dropdown__shell_focused');
      dropdownSubmenu.classList.add('dropdown__submenu_visible');
    } else {
      dropdownSubmenu.classList.remove('dropdown__submenu_visible');
      dropdownSubmenu.classList.remove('dropdown__submenu_solid');
      setTimeout(() => {
        dropdownShell.classList.remove('dropdown__shell_focused');
        dropdownShell.classList.remove('dropdown__shell_solid');
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
      let textCounts = [];
      let dropdownCounters = dropdownSubmenu.querySelectorAll('.dropdown__counter');
      let counterObjects = {};

      for (let counter of dropdownCounters) {
        if (counterObjects.hasOwnProperty(counter.parentElement.dataset.variants.split(',')[0])) {
          counterObjects[counter.parentElement.dataset.variants.split(',')[0]].count = +counterObjects[counter.parentElement.dataset.variants.split(',')[0]].count + +counter.querySelector('.dropdown__count').textContent; 
        } else {
          counterObjects[counter.parentElement.dataset.variants.split(',')[0]] = {
            variants: counter.parentElement.dataset.variants.split(','),
            count: counter.querySelector('.dropdown__count').textContent
          };
        };
      };
      for (let key of Object.keys(counterObjects)) {
        counterObjects[key].count > 0 ? textCounts.push(counterObjects[key].count+' '+counterObjects[key].variants[(counterObjects[key].count % 100 > 4 && counterObjects[key].count %100 < 20) ? 2 : cases[counterObjects[key].count % 10 < 5 ? counterObjects[key].count % 10 : 5]]) : element.dataset.dropdownType != 'guests' ? textCounts.push('нет '+counterObjects[key].variants[2]) : '';
      }

      if (element.dataset.dropdownType != 'guests') {
        dropdownInside.value = textCounts.join(', ');
        dropdownInside.value = dropdownInside.value.charAt(0).toUpperCase()+dropdownInside.value.slice(1);
      } else {
        dropdownInside.dataset.sum = textCounts.join(', '); 
      };
    };
    number.dispatchEvent(new Event('change'));
    confirmButton?.dispatchEvent(new Event('click'));
  };
};
