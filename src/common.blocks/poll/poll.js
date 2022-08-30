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

  goodElement.style.strokeDasharray = goodPercent * circum/100 + ' 999';
  awesomeElement.style.strokeDasharray = awesomePercent * circum/100 + ' 999';
  awesomeElement.style.strokeDashoffset = -(goodPercent * circum/100);
  fairElement.style.strokeDasharray = fairPercent * circum/100 + ' 999';
  fairElement.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100);
  if (badElement) {
    badElement.style.strokeDasharray = badPercent * circum/100 + ' 999';
    badElement.style.strokeDashoffset = -(awesomePercent * circum/100) - (goodPercent * circum/100) - (fairPercent * circum/100);
  }

  let border = 2;

  goodBorder.style.strokeDasharray = border + ' ' + (goodPercent * circum/100 - (border + border));
  awesomeBorder.style.strokeDasharray = border + ' ' + (goodPercent * circum/100 + awesomePercent * circum/100 - (border + border));
  fairBorder.style.strokeDasharray = border + ' ' + (goodPercent * circum/100 + awesomePercent * circum/100 + fairPercent * circum/100 - (border + border));
  badBorder.style.strokeDasharray = border + ' ' + (goodPercent * circum/100 + awesomePercent * circum/100 + fairPercent * circum/100 + badPercent * circum/100 - (border + border));
}
