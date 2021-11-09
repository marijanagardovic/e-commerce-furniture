const toggleBtn = document.querySelector('.navbar-toggle');
const collapse = document.querySelector('.navbar-collapse');
const cartBtn = document.querySelector('#cart-btn');
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');


toggleBtn.addEventListener('click', () => {
    collapse.classList.toggle('show-navbar');
})

cartBtn.addEventListener('click', () => {
    cartContainer.classList.toggle('show-cart-container');
})

window.addEventListener('DOMContentLoaded', () => {
    loadJSON();
})

function loadJSON() {
    fetch('products.json')
    .then(response => response.json())
    .then(products => {
        let html = '';
        products.forEach(product => {
            html += `
            <div class="product-item">
                <div class="product-image">
                    <img src="${product.imgSrc}" alt="product-image">
                    <button type="button" class="add-to-cart"><i class="fas fa-shopping-cart"></i>Add to cart</button>
                </div>
                <div class="product-content">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-category">${product.category}</span>
                    <p class="product-price">$${product.price}</p>
                </div>
            </div>
            `;
        });
        productList.innerHTML = html;
    })
}