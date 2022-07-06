import './toggle.scss';

let toggleElements = document.querySelectorAll('.toggle');

for (let element of toggleElements) {
  let elementLabels = element.querySelectorAll('.toggle__label');

  for (let label of elementLabels) {
    let hiddenField = label.querySelector('.toggle__field_hidden');
    let visibleField = label.querySelector('.toggle__field_visible');
    let labelFlag = label.querySelector('.toggle__flag');

    if (hiddenField.checked === true) {
      visibleField.classList.add('toggle__field_active');
      labelFlag.classList.add('toggle__flag_active');
    };

    hiddenField.onchange = () => {
      if (hiddenField.checked) {
        visibleField.classList.add('toggle__field_active');
        labelFlag.classList.add('toggle__flag_active');
      } else {
        visibleField.classList.remove('toggle__field_active');
        labelFlag.classList.remove('toggle__flag_active');
      };
    };
  };
};
