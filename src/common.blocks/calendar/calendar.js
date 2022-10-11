import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './calendar.scss';

let calendarElements = document.querySelectorAll('.calendar');

function addZero(n) {return n < 10 ? '0'+n : n};

for (let element of calendarElements) {
  let calendarInputs = element.querySelectorAll('.calendar__input');
  let inputFields = element.querySelectorAll('input');
  let calendarDatepicker = element.querySelector('.calendar__datepicker');
  let switchVisibility = (datepicker, onlyRemove) => {
    if (!datepicker.classList.contains('calendar__datepicker_visible') && onlyRemove != true) {
      datepicker.classList.add('calendar__datepicker_visible');
    } else {
      datepicker.classList.remove('calendar__datepicker_visible');
    };
  };

  let confirmButton = {
    content: 'применить',
    className: 'calendar__button-confirm',
    onClick: (dp) => {
      if (inputFields.length > 1) {
        for (let i of [0,1] ) {
          if (dp.selectedDates[i]) {
            inputFields[i].value = addZero(dp.selectedDates[i].getDate())+'.'+addZero(+dp.selectedDates[i].getMonth()+1)+'.'+dp.selectedDates[i].getFullYear();
          };
        };
        if (dp.selectedDates) {
          dp.$datepicker.parentElement.dataset.selectedDays = (dp.selectedDates[1]?.getTime() - dp.selectedDates[0]?.getTime()) / (1000 * 3600 * 24);
        };
        calendarDatepicker.dispatchEvent(new Event('change'));
      } else {
        inputFields[0].value = dp.formatDate(dp.selectedDates[0], 'dd MMM')+' - '+dp.formatDate(dp.selectedDates[1], 'dd MMM');
      };
      switchVisibility(calendarDatepicker, true);
    }
  };

  let clearButton = {
    content: 'очистить',
    className: 'calendar__button-clear',
    onClick: (dp) => {
      dp.clear();
      for (let input of inputFields) {
        input.value = '';
      };
    }
  };

  let calendar = new AirDatepicker(calendarDatepicker, {
    navTitles: {days: 'MMMM yyyy'},
    range: true,
    buttons: [clearButton, confirmButton]
  });


  for (let input of calendarInputs) {
    input.onclick = () => {
      switchVisibility(calendarDatepicker);  
    };

    input.onkeydown = (e) => {
      e.key == 'Enter' && switchVisibility(calendarDatepicker);
    };

    
  };

  let inputsArray = Array.from(calendarInputs);
  let hideCalendar = (e) => {
    if (calendarDatepicker.classList.contains('calendar__datepicker_visible')) {
      if (!calendarDatepicker.contains(e.target) && !inputsArray.some((input) => input.contains(e.target)))  {
        calendarDatepicker.classList.remove('calendar__datepicker_visible');
      };
    };
  }

  document.body.addEventListener('mousedown', (e) => {
    hideCalendar(e);
  });

  document.body.addEventListener('keydown', (e) => {
    e.key == 'Enter' && hideCalendar(e);
  });

  let navArrows = calendar.$datepicker.querySelectorAll('.air-datepicker-nav--action');
  
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

  calendar.selectDate(element.dataset.dates?.split('-'));
  calendar.setViewDate(element.dataset.dates?.split('-')[1]);
  element.dataset.dates?.split('-')[1] == '' && calendar.setViewDate(element.dataset.dates?.split('-')[0]);
  element.dataset.dates && calendar.$datepicker.querySelector('.calendar__button-confirm').dispatchEvent(new Event('click'));
};
