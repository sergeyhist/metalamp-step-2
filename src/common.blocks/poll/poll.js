import './poll.scss';

let pollElements = document.querySelectorAll('.poll');

for (let element of pollElements) {
  let radius = 46;
  let circum = 2 * radius * Math.PI;
  let elementCircles = element.querySelectorAll('circle')

  for (let circle of elementCircles) {
    circle.setAttribute('cx', 50);
    circle.setAttribute('cy', 50);
    circle.setAttribute('r', radius);
  }

  let awesomeElement = element.querySelector('.poll__awesome');
  let goodElement = element.querySelector('.poll__good');
  let fairElement = element.querySelector('.poll__fair');
  let badElement = element.querySelector('.poll__bad');

  let goodBorder = element.querySelector('.poll__good-border');
  let awesomeBorder = element.querySelector('.poll__awesome-border');
  let fairBorder = element.querySelector('.poll__fair-border');
  let badBorder = element.querySelector('.poll__bad-border');

  let pollCounter = element.querySelector('.poll__counter');

  let drawCircle = () => {
    let allCount = +awesomeElement.dataset.count + +goodElement.dataset.count + +fairElement.dataset.count + +badElement.dataset.count;
    let awesomePercent = awesomeElement.dataset.count*100/allCount;
    let goodPercent = goodElement.dataset.count*100/allCount;
    let fairPercent = fairElement.dataset.count*100/allCount;
    let badPercent = badElement ? badElement.dataset.count*100/allCount : 0;

    pollCounter.querySelector('p').textContent = allCount;

    if (goodElement.dataset.count > 0) {
      if (goodElement.style.visibility == 'hidden') {goodElement.style.visibility = 'visible'};
      if (goodElement.dataset.count > 5 && goodBorder.style.visibility == 'hidden')  {goodBorder.style.visibility = 'visible'};
      goodElement.style.strokeDasharray = goodPercent * circum/100 + ' 999';
      goodBorder.style.strokeDasharray = '1 ' + (goodPercent * circum/100 - 2) + ' 1 999';
    } else {
      goodElement.style.visibility = 'hidden';
      goodBorder.style.visibility = 'hidden';
    };

    if (awesomeElement.dataset.count > 0) {
      if (awesomeElement.style.visibility == 'hidden') {awesomeElement.style.visibility = 'visible'};
      if (awesomeElement.dataset.count > 5 && awesomeBorder.style.visibility == 'hidden')  {awesomeBorder.style.visibility = 'visible'};
      awesomeElement.style.strokeDasharray = awesomePercent * circum/100 + ' 999';
      awesomeElement.style.strokeDashoffset = -(goodPercent * circum/100);
      awesomeBorder.style.strokeDashoffset = -(goodPercent * circum/100);
      awesomeBorder.style.strokeDasharray = '1 ' + (awesomePercent * circum/100 - 2) + ' 1 999';
    } else {
      awesomeElement.style.visibility = 'hidden';
      awesomeBorder.style.visibility = 'hidden';
    };

    if (fairElement.dataset.count > 0) {
      if (fairElement.style.visibility == 'hidden') {fairElement.style.visibility = 'visible'};
      if (fairElement.dataset.count > 5 && fairBorder.style.visibility == 'hidden')  {fairBorder.style.visibility = 'visible'};
      fairElement.style.strokeDasharray = fairPercent * circum/100 + ' 999';
      fairElement.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100);
      fairBorder.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100);
      fairBorder.style.strokeDasharray = '1 ' + (fairPercent * circum/100 - 2) + ' 1 999';
    } else {
      fairElement.style.visibility = 'hidden';
      fairBorder.style.visibility = 'hidden';
    };

    if (badElement.dataset.count > 0) {
      if (badElement.style.visibility == 'hidden') {badElement.style.visibility = 'visible'};
      if (badElement.dataset.count > 5 && badBorder.style.visibility == 'hidden')  {badBorder.style.visibility = 'visible'};
      badElement.style.strokeDasharray = badPercent * circum/100 + ' 999';
      badElement.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100) - (fairPercent * circum/100);
      badBorder.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100) - (fairPercent * circum/100);
      badBorder.style.strokeDasharray = '1 ' + (badPercent * circum/100 - 2) + ' 1 999';
    } else {
      badElement.style.visibility = 'hidden';
      badBorder.style.visibility = 'hidden';
    };
  };

  drawCircle();

  let pollItems = element.querySelectorAll('.poll__item');

  for (let item of pollItems) {
    let updatePoll = () => {
      switch (item.textContent) {
        case 'Великолепно': +awesomeElement.dataset.count++; break;
        case 'Хорошо': +goodElement.dataset.count++; break;
        case 'Удовлетворительно': +fairElement.dataset.count++; break;
        case 'Разочарован': +badElement.dataset.count++; break;
      };
      drawCircle();
    }

    item.onclick = () => {updatePoll()};
    item.onkeydown = (e) => {e.key == 'Enter' && updatePoll()};
  };
};
