import './payment.scss';
import 'common/dropdown/dropdown.js';
import 'common/calendar/calendar.js';
import 'common/button/button.js';

let paymentElements = document.querySelectorAll('.payment');

for (let element of paymentElements) {
  let paymentPrice = element.querySelector('.payment__price');
  let paymentDatepicker = element.querySelector('.calendar__datepicker');
  let paymentCost = element.querySelector('.payment__cost');
  let paymentResult = element.querySelector('.payment__result');
  let paymentFee = element.querySelector('.payment__fee');
  let paymentAdditionalFee = element.querySelector('.payment__additional-fee');

  paymentDatepicker.onchange = () => {
    paymentCost.querySelector('.payment__text').textContent = paymentPrice.querySelectorAll('p')[0].textContent+'x '+paymentDatepicker.dataset.selectedDays+' суток';
    paymentCost.querySelector('.payment__count').textContent = (+paymentPrice.textContent.split('₽')[0] * paymentDatepicker.dataset.selectedDays)+'₽';
    paymentResult.querySelector('.payment__count').textContent = +paymentCost.querySelector('.payment__count').textContent.split('₽')[0] - (+paymentFee.querySelector('.payment__count').textContent.split('₽')[0] + +paymentAdditionalFee.querySelector('.payment__count').textContent.split('₽')[0]) + '₽';
  };

  paymentDatepicker.dispatchEvent(new Event('change'));
};
