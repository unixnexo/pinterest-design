/**
 * hide spinner and show content
 */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('spinner').classList.add('hidden');
  document.getElementsByTagName('main')[0].classList.remove('opacity-0');
});


/**
 * masonry js
 */
// document.addEventListener('DOMContentLoaded', function() { // layout won't be populated well
  const grid = document.querySelector('.grid');

  function getMasonryOptions() {
    return {
      itemSelector: '.grid-item',
      gutter: window.innerWidth <= 500 ? 2 : 15,
      fitWidth: true,
      horizontalOrder: true,
    };
  }

  let masonry = new Masonry(grid, getMasonryOptions());

  function adjustMasonryGutter() {
    masonry.destroy();
    masonry = new Masonry(grid, getMasonryOptions());
  }

  // window.addEventListener('resize', adjustMasonryGutter); // causes jumps on phone
// });


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
    // will get removed when the suggestion menu closes

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
 * menus for notification / messages / settings / qs / ... - mostly on the right side of the header
 * will change state for both menus & btns
 */
document.addEventListener('click', (e) => {
  const removeClass = 'hidden'; 

  if (e.target.classList.contains('menu-btn')) {
    const menuId = e.target.getAttribute('data-menu');
    const menu = document.getElementById(menuId);
    const btn = document.querySelector(`div[data-menu=${menuId}]`);

    // Close all menus and set state to inactive
    document.querySelectorAll('.menu').forEach(m => {
      if (m !== menu) {
        m.classList.add(removeClass);
        m.setAttribute('data-state-menu', 'inactive');
      }
    });

    inactiveUiBtn();
    if (menu.getAttribute('data-state-menu') === 'inactive') {
      menu.classList.remove(removeClass);
      menu.setAttribute('data-state-menu', 'active');
      if (btn) {
        btn.setAttribute('data-state', 'active');
      }
    } else {
      menu.classList.add(removeClass);
      menu.setAttribute('data-state-menu', 'inactive');
      if (btn) {
        btn.setAttribute('data-state', 'inactive');
      }
    }

  } 
  else if (e.target.closest('.menu')) {
    // Clicked inside a menu, do nothing
  } 
  else {
    document.querySelectorAll('.menu').forEach(menu => {
      menu.classList.add(removeClass);    
    });

    // inactive ui all 
    inactiveUiBtn();
  }
});

function inactiveUiBtn() {
  document.querySelectorAll('div[data-state]').forEach(el => {
    el.setAttribute('data-state', 'inactive');
  });
}


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


/**
 * inbox 3 dot menu
 */
const inbox3Dot = document.getElementById('inbox-3-dots');
const inbox3DotMenu = document.getElementById('inbox-3dot-menu');
document.addEventListener('click', (e) => {
 if(e.target === inbox3Dot) {
  inbox3Dot.classList.toggle('is-open');
 } else if (e.target === inbox3DotMenu || inbox3DotMenu.contains(e.target)){
  // clicked in menu, do nothing
 } else {
  inbox3Dot.classList.remove('is-open');
 }
});


/**
 * suggestion menu
 */
const suggestionSearch = document.getElementById('suggestion-search');
document.addEventListener('click', (e) => {
  if (e.target === searchInput) {
    suggestionSearch.classList.remove(remove);
    main.classList.add(mainOverlay);
  } else if (e.target === suggestionSearch || suggestionSearch.contains(e.target)) {
    searchInput.focus();
    main.classList.add(mainOverlay);
    // clicked in menu, do nothing
  } else {
    suggestionSearch.classList.add(remove);
    main.classList.remove(mainOverlay);
  }
});


// /**
//  * menus on post
//  */
let openMenu = null;
let openContent = null;

function handleMenuToggle(btnClass, menuClass, contentClass) {
  const buttons = document.querySelectorAll(btnClass);
  const menus = document.querySelectorAll(menuClass);
  const contents = document.querySelectorAll(contentClass);

  buttons.forEach((btn, index) => {
    const menu = menus[index];
    const content = contents[index];

    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      // Close the currently open menu, if any
      if (openMenu && openMenu !== menu) {
        openMenu.classList.add('hidden');
        openContent.classList.add('hidden');
        openContent.classList.remove('flex');
      }

      // Calculate the distances
      const clickX = e.clientX;
      const viewportWidth = window.innerWidth;
      const distanceToLeftEdge = clickX;
      const distanceToRightEdge = viewportWidth - clickX;

      // Adjust the menu position based on distance
      if (!menu.classList.contains('post-save-menu')) {
        if (distanceToLeftEdge < distanceToRightEdge) {
          menu.style.left = '-150px';
        } else {
          menu.style.left = '-300px';
        }
      } else {
        if (distanceToLeftEdge < distanceToRightEdge) {
          menu.style.left = '-15px';
        } else {
          menu.style.left = '-130px';
        }
      }

      // Toggle the current menu
      menu.classList.toggle('hidden');

      if (!menu.classList.contains('hidden')) {
        content.classList.remove('hidden');
        content.classList.add('flex');
        openMenu = menu;
        openContent = content;
      } else {
        content.classList.add('hidden');
        content.classList.remove('flex');
        openMenu = null;
        openContent = null;
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target !== btn && e.target !== menu && !menu.contains(e.target)) {
        menu.classList.add('hidden');
        content.classList.add('hidden');
        content.classList.remove('flex');
        openMenu = null;
        openContent = null;
      }
    });
  });
}

// post 3 dot menu
handleMenuToggle('.post-3dot-btn', '.post-3dot-menu', '.post-onhover-content');
// post share menu
handleMenuToggle('.post-share-btn', '.post-share-menu', '.post-onhover-content');
// post save menu
handleMenuToggle('.post-save-btn', '.post-save-menu', '.post-onhover-content');


/**
 * scrollable list at top - < sm screens
 */
const topListSmSc = document.getElementById('top-list-sm');
const hideTopListSmSc = '-translate-y-20';
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollDifference = Math.abs(scrollTop - lastScrollTop);

  // Only proceed if scrolled more than 100 pixels
  if (scrollDifference > 100) {
    if (scrollTop > lastScrollTop) {
      topListSmSc.classList.add(hideTopListSmSc);
    } else {
      topListSmSc.classList.remove(hideTopListSmSc);
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
});



////////////test

