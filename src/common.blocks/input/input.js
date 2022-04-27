let dropdownElements = document.querySelectorAll('.input__field_dropdown');
let dropdownSubmenus = document.querySelectorAll('.input__submenu');
let countNumbers = document.querySelectorAll('.input__count');
let minusButtons = document.querySelectorAll('.input__button_minus');
let plusButtons = document.querySelectorAll('.input__button_plus');

for (let i in dropdownElements) {
  dropdownElements[i].onclick = () => {
    if (dropdownSubmenus[i].style.opacity == 0) {
      dropdownElements[i].classList.add('input__field_focused');
      dropdownSubmenus[i].setAttribute('style', 'opacity: 1; transform: scaleY(1);');
    } else {
      dropdownElements[i].classList.remove('input__field_focused');
      dropdownSubmenus[i].setAttribute('style', 'opacity: 0; transform: scaleY(0);');
    }; 
  }
}

for (let i in plusButtons) {
  plusButtons[i].onclick = () => {
    countNumbers[i].textContent++;
    countNumbers[i].dispatchEvent(new Event('change'));
  };
}

for (let i in minusButtons) {
  minusButtons[i].onclick = () => {
    countNumbers[i].textContent > 0 && countNumbers[i].textContent--;
    countNumbers[i].dispatchEvent(new Event('change'));
  };
}

for (let i in countNumbers) {
  if (countNumbers[i].textContent == 0) {minusButtons[i].disabled = true};
  countNumbers[i].onchange = () => {
    let countSum = 0;
    countNumbers[i].textContent > 0 ? minusButtons[i].disabled = false : minusButtons[i].disabled = true;
    for (let number of countNumbers) {
      countSum += +number.textContent;
    };
    let dropdownElementText = [' гость', ' гостя', ' гостей'];
    let cases = [2,0,1,1,1,2];
    dropdownElement.value = countSum > 0 ? countSum+dropdownElementText[(countSum % 100 > 4 && countSum %100 < 20) ? 2 : cases[countSum % 10 < 5 ? countSum % 10 : 5]] : 'Сколько гостей';
  };
}