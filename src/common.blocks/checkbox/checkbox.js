import './checkbox.scss';

let checkboxElements = document.querySelectorAll('.checkbox');

for (let element of checkboxElements) {
  let elementLabels = element.querySelectorAll('.checkbox__block');
  
  if (element.querySelector('.checkbox__shell')) {
    let checkboxShell = element.querySelector('.checkbox__shell');
    let checkboxList = element.querySelector('.checkbox__list');
    let checkboxArrow = element.querySelector('.checkbox__arrow');
    let listVisibility = () => {
      if (checkboxList.classList.contains('checkbox__list_visible')) {
        checkboxList.classList.remove('checkbox__list_visible');
        checkboxArrow.classList.remove('checkbox__arrow_rotate');
      } else {
        checkboxList.classList.add('checkbox__list_visible');
        checkboxArrow.classList.add('checkbox__arrow_rotate');
      };
    };

    checkboxShell.onclick = () => {listVisibility()};
    checkboxShell.onkeydown = (e) => {e.key == 'Enter' && listVisibility()};
  };

  for (let label of elementLabels) {
    let hiddenField = label.querySelector('.checkbox__field_hidden');
    let visibleField = label.querySelector('.checkbox__field_visible');
    let labelFlag = label.querySelector('.checkbox__flag');

    if (hiddenField.checked === true) {
      visibleField.classList.add('checkbox__field_checked');
      labelFlag.classList.add('checkbox__flag_visible');
    };

    hiddenField.onchange = () => {
      if (hiddenField.checked) {
        visibleField.classList.add('checkbox__field_checked');
        labelFlag.classList.add('checkbox__flag_visible');
      } else {
        visibleField.classList.remove('checkbox__field_checked');
        labelFlag.classList.remove('checkbox__flag_visible');
      };
    };
  };
};
