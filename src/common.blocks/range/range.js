import $ from 'jquery';
import 'assets/jquery-ui/jquery-ui.min.js';
import 'assets/jquery-ui/jquery-ui.min.css';
import './range.scss';

let rangeElements = document.querySelectorAll('.range');

for (let element of rangeElements) {
  let rangeValue = element.parentElement.querySelector('#range-value');
  rangeValue.textContent = element.dataset.defaultMin+'₽ - '+element.dataset.defaultMax+'₽';

  $(element).slider({
    range: true,
    max: $(element).data('max'),
    step: $(element).data('step'),
    values: [$(element).data('default-min'), $(element).data('default-max')],
    slide: (event, ui) => {
      $(rangeValue).html(ui.values[0]+'₽ - '+ui.values[1]+'₽')
    }
  });
};
