import './payment.scss';
import 'common/dropdown/dropdown.js';

let paymentElements = document.querySelectorAll('.payment');

for (let element of paymentElements) {
  let calendar = element.querySelector('.dropdown__calendar');
  let cost = element.querySelector('.payment__cost');
  let price = element.querySelector('.payment__price');

  cost.textContent = price.textContent.split('₽')[0]  * (calendar.dataset.selectedDays - 1);
};
