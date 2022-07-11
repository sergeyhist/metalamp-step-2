import './checkbox.scss';

let checkboxElements = document.querySelectorAll('.checkbox');

for (let element of checkboxElements) {
  let elementLabels = element.querySelectorAll('.checkbox__label');

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
