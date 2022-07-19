import './pagination.scss';

let paginationElements = document.querySelectorAll('.pagination');

for (let element of paginationElements) {
  let paginationNumbers = element.querySelectorAll('.pagination__number');
  let currentNumber = element.querySelector('.pagination__number_current');
  let nextButton = element.querySelector('.pagination__arrow');
  let paginationInfo = element.querySelector('.pagination__info');
  let pagesElement = element.querySelector('.pagination__pages');

  let changeCurrentNumber = (pages, newCurrent) => {
    for (let page of pages) {
      page.classList.contains('pagination__number_current') && page.classList.remove('pagination__number_current');
    };
    newCurrent.classList.add('pagination__number_current');
    
    let infoAllCount = pagesElement.dataset.allItemsCount > 100 ? '100+' : pagesElement.dataset.allItemsCount;
    let infoCurrentCount = +newCurrent.textContent * pagesElement.dataset.pageItemsCount - pagesElement.dataset.pageItemsCount + 1;
    let infoPageCount = infoCurrentCount + +pagesElement.dataset.pageItemsCount - 1;

    if (newCurrent == pages[pages.length-1]) {
      paginationInfo.textContent = infoCurrentCount + '-' + pagesElement.dataset.allItemsCount + ' из ' + infoAllCount + ' вариантов аренды';
    } else {
      paginationInfo.textContent = infoCurrentCount + '-' + infoPageCount + ' из ' + infoAllCount + ' вариантов аренды';
    };

    return newCurrent;
  };

  let checkPages = (pages, current) => {
    let hasPagesAfter = +pages[pages.length-1].textContent - +current.textContent > 2;
    let hasPagesBefore = +current.textContent - +pages[0].textContent > 2;
    let fakeBlocks = pages[0].parentElement.querySelectorAll('.pagination__number_fake');
    for (let block of fakeBlocks) {
      pages[0].parentElement.removeChild(block);
    };
    let fakeBlock = document.createElement('span');
    fakeBlock.classList.add('pagination__item', 'pagination__number', 'pagination__number_fake', 'unselect');
    let secondFakeBlock =  fakeBlock.cloneNode(true);


    for (let page of pages) {
      page.classList.contains('pagination__number_hidden') && page.classList.remove('pagination__number_hidden');
    };

    let changePagesAfter = (block, startPosition) => {
      pages[+current.textContent-1+startPosition].after(block);
      for (let i = +current.textContent-1+startPosition+1; i < pages.length-1; i++) {
        pages[i].classList.add('pagination__number_hidden');
      };
    };

    let changePagesBefore = (block, startPosition) => {
      pages[+current.textContent-1-startPosition].before(block);
      for (let i = +current.textContent-1-startPosition-1; i > 0; i--) {
        pages[i].classList.add('pagination__number_hidden');
      };
    };

    if (hasPagesAfter && !hasPagesBefore) {
      changePagesAfter(fakeBlock, 2);
    } else if (hasPagesBefore && !hasPagesAfter) {
      changePagesBefore(fakeBlock, 2);
    } else if (hasPagesAfter && hasPagesBefore) {
      changePagesAfter(fakeBlock, 1);
      changePagesBefore(secondFakeBlock, 1);
    };
  };

  if (!currentNumber) {
    currentNumber = changeCurrentNumber(paginationNumbers, paginationNumbers[0]);
  };

  checkPages(paginationNumbers, currentNumber);

  for (let number of paginationNumbers) {
    number.onclick = () => {
      currentNumber = changeCurrentNumber(paginationNumbers, number);
      checkPages(paginationNumbers, currentNumber);
    };
  };

  nextButton.onclick = () => {
    currentNumber = changeCurrentNumber(paginationNumbers, paginationNumbers[+currentNumber.textContent]);
    checkPages(paginationNumbers, currentNumber);
  };
};
