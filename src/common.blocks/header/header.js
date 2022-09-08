import './header.scss';
import 'common/button/button.scss';

let headerElements = document.querySelectorAll('.header');

for (let element of headerElements) {
  let mobileMenu = element.querySelector('.header__mobile-menu');
  let menu = element.querySelector('.header__menu');
  let arrowMenuLinks = Array.from(element.querySelectorAll('.header__menu-link_arrow'));
  let submenuElements = Array.from(element.querySelectorAll('.header__submenu'));

  let switchMenuVisibility = () => {
    if (!menu.classList.contains('header__menu_visible')) {
      menu.classList.add('header__menu_visible');
    } else {
      menu.classList.remove('header__menu_visible');
    };
  };

  let switchSubmenuVisibility = (i) => {
    if (!submenuElements[i].classList.contains('header__submenu_visible')) {
      
      submenuElements[i].classList.add('header__submenu_visible');
    } else {
      submenuElements[i].classList.remove('header__submenu_visible');
    };
  };

  mobileMenu.onclick = () => {
    switchMenuVisibility();
  };

  mobileMenu.onkeydown = (e) => {
    e.key == 'Enter' && switchMenuVisibility();
  };

  document.addEventListener('mousedown', (event) => {
    if (!mobileMenu.contains(event.target) && !menu.contains(event.target)) {
      menu.classList.remove('header__menu_visible');
    };
  });

  for (let i in arrowMenuLinks) {
    arrowMenuLinks[i].onclick = () => {
      switchSubmenuVisibility(i);
    };

    document.body.addEventListener('mousedown', (event) => {
      if (!arrowMenuLinks[i].contains(event.target) && !submenuElements[i].contains(event.target)) {
        submenuElements[i].classList.remove('header__submenu_visible');
      };
    });
  };
};
