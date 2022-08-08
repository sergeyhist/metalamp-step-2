import './payment.scss';
import 'common/dropdown/dropdown.js';
import 'common/calendar/calendar.js';

let paymentElements = document.querySelectorAll('.payment');

for (let element of paymentElements) {
  let paymentPrice = element.querySelector('.payment__price');
  let paymentDatepicker = element.querySelector('.calendar__datepicker');
  let paymentCost = element.querySelector('.payment__cost');

  paymentCost.querySelector('.payment__text').textContent = paymentPrice.querySelectorAll('p')[0].textContent+'x '+paymentDatepicker.dataset.selectedDays+' суток';
  paymentCost.querySelector('.payment__count').textContent = (+paymentPrice.textContent.split('₽')[0] * paymentDatepicker.dataset.selectedDays)+'₽';
};
