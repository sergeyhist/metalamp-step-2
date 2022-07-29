import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './calendar.scss';

function addZero(n) {return n < 9 ? '0'+n : n};

export let calendarGenerator = (initialBlock, dateFrom, dateTo) => {
  let months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  let dates = [];
  let datesConfirm = (calendar) => {
    if (calendar.selectedDates[0] && calendar.selectedDates[1]) {
      dateFrom.value = addZero(calendar.selectedDates[0].getDate())+'.'+addZero(+calendar.selectedDates[0].getMonth()+1)+'.'+calendar.selectedDates[0].getFullYear();
      dateTo.value = addZero(calendar.selectedDates[1].getDate())+'.'+addZero(+calendar.selectedDates[1].getMonth()+1)+'.'+calendar.selectedDates[1].getFullYear();
    };
  };
  let dateRangeConfirm = (calendar) => {
    if (calendar.selectedDates[0] && calendar.selectedDates[1]) {
      dateFrom.value =
        addZero(calendar.selectedDates[0].getDate())+' '+months[calendar.selectedDates[0].getMonth()]+' - '+
        addZero(calendar.selectedDates[1].getDate())+' '+months[calendar.selectedDates[1].getMonth()];
    };
  };
  let confirmButton = {
    content: 'применить',
    className: 'calendar__button-confirm',
    onClick: (dp) => {
      dateTo ? datesConfirm(dp) : dateRangeConfirm(dp);
      let selectedDays = dp.$datepicker.querySelectorAll('.-selected-');
      let inRangeDays = dp.$datepicker.querySelectorAll('.-in-range-');
      initialBlock.dataset.selectedDays = selectedDays.length + inRangeDays.length;
    }
  };
  let clearButton = {
    content: 'очистить',
    className: 'calendar__button-clear',
    onClick: (dp) => {
      dp.clear();
      if (dateTo) {
        dateFrom.value = '';
        dateTo.value = '';
      } else {
        dateFrom.value = '';
      };
    }
  };

  if (dateTo) {
    if (dateFrom.value) {dates[0] = (dateFrom.value.split('.').reverse().join(','))}'';
    if (dateTo.value) {dates[1] = (dateTo.value.split('.').reverse().join(','))};
  } else {
    if (dateFrom.value) {
      dateFrom.value.split('-').forEach((date) => {dates.push(date.split('.').reverse().join(','))});
      dateFrom.value =
        dateFrom.value.split('-')[0].split('.')[0]+' '+months[+dateFrom.value.split('-')[0].split('.')[1]-1]+' - '+
        dateFrom.value.split('-')[1].split('.')[0]+' '+months[+dateFrom.value.split('-')[1].split('.')[1]-1];
    };
  };

  new AirDatepicker(initialBlock, {
    navTitles: {days: 'MMMM yyyy'},
    buttons: [clearButton, confirmButton],
    range: true,
    selectedDates: dates
  });
};

export let changeArrows = () => {
  let navArrows = document.querySelectorAll('.air-datepicker-nav--action');
  
  for (let arrow of navArrows) {
    let arrowBack = document.createElement('button');
    let arrowForward = document.createElement('button');

    arrowBack.classList.add('material-icons');
    arrowBack.innerHTML = 'arrow_back';
    arrowForward.classList.add('material-icons');
    arrowForward.innerHTML = 'arrow_forward';

    switch (arrow.dataset.action) {
      case 'prev': arrow.replaceChildren(arrowBack); break;
      case 'next': arrow.replaceChildren(arrowForward);
    };
  };
};
