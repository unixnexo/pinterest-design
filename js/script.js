const grid = document.querySelector('.grid');
const masonry = new Masonry( grid, {
    itemSelector: '.grid-item',
    gutter: 15,
    isFitWidth: true
});
