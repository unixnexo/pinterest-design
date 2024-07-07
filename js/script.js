/**
 * masonry js
 */
const grid = document.querySelector('.grid');
const masonry = new Masonry( grid, {
    itemSelector: '.grid-item',
    gutter: 15,
    isFitWidth: true
});


/**
 * slider for the "more ideas for ..." section
 */
const scrollContainer = document.getElementById('scrollContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');
const moreIdeaSecCon = document.querySelector('#moreIdeaSecCon');

function checkScroll() {
  const atStart = scrollContainer.scrollLeft <= 0;
  const atEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1;

  scrollLeftBtn.classList.toggle('hidden', atStart);
  scrollRightBtn.classList.toggle('hidden', atEnd);

  moreIdeaSecCon.classList.toggle('no-before', atStart);
  moreIdeaSecCon.classList.toggle('no-after', atEnd);
}

scrollLeftBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
  setTimeout(checkScroll, 300);
});

scrollRightBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
  setTimeout(checkScroll, 300);
});

scrollContainer.addEventListener('scroll', checkScroll);

// Initial check
checkScroll();
window.addEventListener('resize', checkScroll);


/**
 * all about search input
 */
const searchInput = document.getElementById('search-input');
const searchXIon = document.getElementById('search-x-icon');
const searchMagnifyIcon = document.getElementById('search-magnifier-icon');
const main = document.querySelector('main');

const remove = 'hidden';
const add = 'flex';
const searchInputInsetBig = 'pl-10';
const searchInputInsetSM = 'pl-5';
const mainOverlay = 'overlay';

searchInput.addEventListener('focus', () => {
    // overlay content
    main.classList.add(mainOverlay);

    // search input
    searchInput.classList.remove(searchInputInsetBig);
    searchInput.classList.add(searchInputInsetSM);

    // search icon 
    searchMagnifyIcon.classList.add(remove);

    // x icon
    searchXIon.classList.remove(remove);
    searchXIon.classList.add(add);
});
searchInput.addEventListener('blur', () => {
    // overlay content
    main.classList.remove(mainOverlay);

    // search input
    searchInput.classList.remove(searchInputInsetSM);
    searchInput.classList.add(searchInputInsetBig);

    // search icon 
    searchMagnifyIcon.classList.remove(remove);

    // x icon
    searchXIon.classList.remove(add);
    searchXIon.classList.add(remove);
    searchInput.value = '';
});


/**
 * menus for notification / messages / settings - on the right side of the header
 */
document.addEventListener('click', (e) => {
  const removeClass = 'hidden'; 

  if (e.target.classList.contains('menu-btn')) {
    const menuId = e.target.getAttribute('data-menu');
    const menu = document.getElementById(menuId);
    menu.classList.toggle(removeClass);
  } 
  else if (e.target.closest('.menu')) {
    // Clicked inside a menu, do nothing
  } 
  else {
    document.querySelectorAll('.menu').forEach(menu => {
      menu.classList.add(removeClass);
    });
  }
});


/**
 * notification menu > 3 dots > menu
 */
function threeDotMenu (el) {
  el.classList.toggle('is-open');
  const grandfather = document.querySelectorAll('.three-dot-menu-biggest-parent')
  
  grandfather.forEach(menu => {
    menu.addEventListener('mouseleave', () => {
      el.classList.remove('is-open');
    });
  });
  
}


////////////test
