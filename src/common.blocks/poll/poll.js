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

  let awesomePercent = awesomeElement.dataset.count*100/element.dataset.count;
  let goodPercent = goodElement.dataset.count*100/element.dataset.count;
  let fairPercent = fairElement.dataset.count*100/element.dataset.count;
  let badPercent = badElement ? badElement.dataset.count*100/element.dataset.count : 0;

  if (goodElement.dataset.count > 0) {
    goodElement.style.strokeDasharray = goodPercent * circum/100 + ' 999';
    goodBorder.style.strokeDasharray = '1 ' + (goodPercent * circum/100 - 2) + ' 1 999';
  } else {
    goodElement.style.stroke = 'none';
    goodBorder.style.stroke = 'none';
  };

  if (awesomeElement.dataset.count > 0) {
    awesomeElement.style.strokeDasharray = awesomePercent * circum/100 + ' 999';
    awesomeElement.style.strokeDashoffset = -(goodPercent * circum/100);
    awesomeBorder.style.strokeDashoffset = -(goodPercent * circum/100);
    awesomeBorder.style.strokeDasharray = '1 ' + (awesomePercent * circum/100 - 2) + ' 1 999';
  } else {
    awesomeElement.style.stroke = 'none';
    awesomeBorder.style.stroke = 'none';
  };

  if (fairElement.dataset.count > 0) {
    fairElement.style.strokeDasharray = fairPercent * circum/100 + ' 999';
    fairElement.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100);
    fairBorder.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100);
    fairBorder.style.strokeDasharray = '1 ' + (fairPercent * circum/100 - 2) + ' 1 999';
  } else {
    fairElement.style.stroke = 'none';
    fairBorder.style.stroke = 'none';
  };

  if (badElement.dataset.count > 0) {
    badElement.style.strokeDasharray = badPercent * circum/100 + ' 999';
    badElement.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100) - (fairPercent * circum/100);
    badBorder.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100) - (fairPercent * circum/100);
    badBorder.style.strokeDasharray = '1 ' + (badPercent * circum/100 - 2) + ' 1 999';
  } else {
    badElement.style.stroke = 'none';
    badBorder.style.stroke = 'none';
  };
};
