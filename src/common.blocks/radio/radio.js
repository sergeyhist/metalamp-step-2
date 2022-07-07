import './radio.scss';

let radioElements = document.querySelectorAll('.radio');

for (let element of radioElements) {
  let elementLabels = element.querySelectorAll('.radio__label');
  let fieldGroups = element.querySelectorAll('.radio__fields');

  for (let label of elementLabels) {
    let hiddenField = label.querySelector('.radio__field_hidden');
    let visibleField = label.querySelector('.radio__field_visible');
    let labelFlag = label.querySelector('.radio__flag');

    if (hiddenField.checked === true) {
      visibleField.classList.add('radio__field_checked');
      labelFlag.classList.add('radio__flag_visible');
      label.classList.add('radio__label_checked');
    };

    hiddenField.onchange = () => {
      for (let group of fieldGroups) {
        let visibleField = group.querySelector('.radio__field_visible');
        let labelFlag = group.querySelector('.radio__flag');
        if (visibleField.classList.contains('radio__field_checked')) {
          visibleField.classList.remove('radio__field_checked');
          visibleField.parentElement.parentElement.classList.remove('radio__label_checked');
          labelFlag.classList.remove('radio__flag_visible');
        };
      };
      visibleField.classList.add('radio__field_checked');
      labelFlag.classList.add('radio__flag_visible');
      label.classList.add('radio__label_checked');
    };
  };
};