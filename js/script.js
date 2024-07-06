/**
 * masonry js
 */
const grid = document.querySelector('.grid');
const masonry = new Masonry( grid, {
    itemSelector: '.grid-item',
    gutter: 15,
    isFitWidth: true
});





////// test
// const scrollContainer = document.getElementById('scrollContainer');
// const scrollLeftBtn = document.getElementById('scrollLeft');
// const scrollRightBtn = document.getElementById('scrollRight');

// function checkScroll() {
//     if (scrollContainer.scrollLeft <= 0) {
//         scrollLeftBtn.classList.add('hidden');
//     } else {
//         scrollLeftBtn.classList.remove('hidden');
//     }

//     if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
//         scrollRightBtn.classList.add('hidden');
//     } else {
//         scrollRightBtn.classList.remove('hidden');
//     }
// }

// scrollLeftBtn.addEventListener('click', () => {
//     scrollContainer.scrollBy({
//         left: -200,
//         behavior: 'smooth'
//     });
// });

// scrollRightBtn.addEventListener('click', () => {
//     scrollContainer.scrollBy({
//         left: 200,
//         behavior: 'smooth'
//     });
// });

// scrollContainer.addEventListener('scroll', checkScroll);

// // Initial check
// checkScroll();



const scrollContainer = document.getElementById('scrollContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

function checkScroll() {
    scrollLeftBtn.classList.toggle('hidden', scrollContainer.scrollLeft <= 0);

    const atEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1;
    scrollRightBtn.classList.toggle('hidden', atEnd);
}

scrollLeftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: -200,
        behavior: 'smooth'
    });
    setTimeout(checkScroll, 300); // Check after the scroll action
});

scrollRightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: 200,
        behavior: 'smooth'
    });
    setTimeout(checkScroll, 300); // Check after the scroll action
});

scrollContainer.addEventListener('scroll', checkScroll);

// Initial check
checkScroll();


