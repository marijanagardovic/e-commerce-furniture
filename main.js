const toggleBtn = document.querySelector('.navbar-toggle');
const collapse = document.querySelector('.navbar-collapse');
const cartBtn = document.querySelector('#cart-btn');
const cartContainer = document.querySelector('.cart-container');

toggleBtn.addEventListener('click', () => {
    collapse.classList.toggle('show-navbar');
})

cartBtn.addEventListener('click', () => {
    cartContainer.classList.toggle('show-cart-container');
})