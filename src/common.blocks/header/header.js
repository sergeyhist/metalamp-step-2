import './header.scss';
import 'common/button/button.scss';

let headerElements = document.querySelectorAll('.header');

for (let element of headerElements) {
  let mobileMenu = element.querySelector('.header__mobile-menu');
  let menu = element.querySelector('.header__menu');
  let switchVisibility = () => {
    if (!menu.classList.contains('header__menu_visible')) {
      menu.classList.add('header__menu_visible');
    } else {
      menu.classList.remove('header__menu_visible');
    };
  };

  mobileMenu.onclick = () => {
    switchVisibility();
  };
};
