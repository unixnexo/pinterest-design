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



////// test

