import './radio.scss';

let radioElements = document.querySelectorAll('.radio');

for (let element of radioElements) {
  let elementLabels = element.querySelectorAll('.radio__label');
  let visibleFields = element.querySelectorAll('.radio__field_visible');

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
      for (let field of visibleFields) {
        let fieldFlag = field.querySelector('.radio__flag');
        if (field.classList.contains('radio__field_checked')) {
          field.classList.remove('radio__field_checked');
          field.parentElement.parentElement.classList.remove('radio__label_checked');
          fieldFlag.classList.remove('radio__flag_visible');
        };
      };
      visibleField.classList.add('radio__field_checked');
      labelFlag.classList.add('radio__flag_visible');
      label.classList.add('radio__label_checked');
    };
  };
};