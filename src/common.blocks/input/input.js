let inputElements = document.querySelectorAll('.input')

for (let element of inputElements) {
  let inputField = element.querySelector('.input__field');
  if (inputField.dataset.submenuType) {
    let inputSubmenu = element.querySelector('.input__submenu');
    inputField.onclick = () => {
      if (inputSubmenu.classList.contains('input__submenu_visible')) {
        inputField.classList.remove('input__field_focused');
        inputSubmenu.classList.remove('input__submenu_visible');
      } else {
        inputField.classList.add('input__field_focused');
        inputSubmenu.classList.add('input__submenu_visible');
      }; 
    }
    let plusButtons = inputSubmenu.querySelectorAll('.input__button_plus');
    let minusButtons = inputSubmenu.querySelectorAll('.input__button_minus');
    let countNumbers = inputSubmenu.querySelectorAll('.input__count');
    for (let i in plusButtons) {
      plusButtons[i].onclick = () => {
        countNumbers[i].textContent++;
        countNumbers[i].dispatchEvent(new Event('change'));
      };
    };
    for (let i in minusButtons) {
      minusButtons[i].onclick = () => {
        countNumbers[i].textContent > 0 && countNumbers[i].textContent--;
        countNumbers[i].dispatchEvent(new Event('change'));
      };
    };
    for (let i in countNumbers) {
      if (countNumbers[i].textContent == 0) {minusButtons[i].disabled = true};
      countNumbers[i].onchange = () => {
        countNumbers[i].textContent > 0 ? minusButtons[i].disabled = false : minusButtons[i].disabled = true;
        let cases = [2,0,1,1,1,2];
        let textVariants = [];
        switch(inputField.dataset.submenuType) {
          case 'guests':
            let countSum = 0;
            textVariants = [' гость', ' гостя', ' гостей'];
            for (let number of countNumbers) {
              countSum += +number.textContent;
            };
            console.log(textVariants);
            inputField.value = countSum > 0 ? countSum+textVariants[(countSum % 100 > 4 && countSum %100 < 20) ? 2 : cases[countSum % 10 < 5 ? countSum % 10 : 5]] : '';
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
  }
}
