import './checkbox.scss';

let checkboxes = document.querySelectorAll('.checkbox');

for (let checkbox of checkboxes) {
  let checkboxElements = checkbox.querySelectorAll('.checkbox__element');

  for (let element of checkboxElements) {
    let hiddenField = element.querySelector('.checkbox__field_hidden');
    let visibleField = element.querySelector('.checkbox__field_visible');
    let elementFlag = element.querySelector('.checkbox__flag');

    hiddenField.onchange = () => {
      console.log('change');
      console.log(hiddenField.checked);
      if (hiddenField.checked) {
        visibleField.classList.add('checkbox__field_checked');
        elementFlag.classList.add('checkbox__flag_visible');
      } else {
        visibleField.classList.remove('checkbox__field_checked');
        elementFlag.classList.remove('checkbox__flag_visible');
      };
    };
  };
};