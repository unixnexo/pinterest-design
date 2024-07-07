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
 * menus for notification / messages / settings - on the right side of the header
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



////////////test
// const post3DotBtn = document.querySelector('.post-3dot-btn');
// const post3DotMenu = document.querySelector('.post-3dot-menu');
// const postOnHoverContent = document.querySelector('.post-onhover-content');

// document.addEventListener('click', (e) => {
//   if (e.target === post3DotBtn) {
//     post3DotMenu.classList.toggle(remove);

//     if (!post3DotMenu.classList.contains('hidden')) {
//       postOnHoverContent.classList.remove('hidden');
//       postOnHoverContent.classList.add('flex');
//     } else {
//       postOnHoverContent.classList.add('hidden');
//       postOnHoverContent.classList.remove('flex');
//     }
//   } else if (e.target === post3DotMenu || post3DotMenu.contains(e.target)) {
//     // on menu, do nothing
//   } else {
//     post3DotMenu.classList.add(remove);
//     postOnHoverContent.classList.add('hidden');
//     postOnHoverContent.classList.remove('flex');
//   }

// });


const post3DotBtns = document.querySelectorAll('.post-3dot-btn');
const post3DotMenus = document.querySelectorAll('.post-3dot-menu');
const postOnHoverContents = document.querySelectorAll('.post-onhover-content');

post3DotBtns.forEach((btn, index) => {
  const post3DotMenu = post3DotMenus[index];
  const postOnHoverContent = postOnHoverContents[index];

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); 

    // Close all other menus
    post3DotMenus.forEach((menu, i) => {
      if (i !== index) {
        menu.classList.add('hidden');
        postOnHoverContents[i].classList.add('hidden');
        postOnHoverContents[i].classList.remove('flex');
      }
    });

    // Toggle the current menu
    post3DotMenu.classList.toggle('hidden');

    if (!post3DotMenu.classList.contains('hidden')) {
      postOnHoverContent.classList.remove('hidden');
      postOnHoverContent.classList.add('flex');
    } else {
      postOnHoverContent.classList.add('hidden');
      postOnHoverContent.classList.remove('flex');
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target !== btn && e.target !== post3DotMenu && !post3DotMenu.contains(e.target)) {
      post3DotMenu.classList.add('hidden');
      postOnHoverContent.classList.add('hidden');
      postOnHoverContent.classList.remove('flex');
    }
  });
});

