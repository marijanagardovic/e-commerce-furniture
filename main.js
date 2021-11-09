const toggleBtn = document.querySelector('.navbar-toggle');
const collapse = document.querySelector('.navbar-collapse');
const cartBtn = document.querySelector('#cart-btn');
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
const cartList = document.querySelector('.cart-list');
const totalValue = document.querySelector('#cart-total-value');
const countInfo = document.querySelector('#cart-count-info');
const deleteBtn = document.querySelector('.cart-item-delete');
let cartItemId = 1;


toggleBtn.addEventListener('click', () => {
    collapse.classList.toggle('show-navbar');
})

cartBtn.addEventListener('click', () => {
    cartContainer.classList.toggle('show-cart-container');
})

window.addEventListener('DOMContentLoaded', () => {
    loadJSON();
    loadCart();
})


//adding products
productList.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-to-cart')) {
        let oneProduct = e.target.parentElement.parentElement;
        getProductInfo(oneProduct);
    }
})

function getProductInfo(product) {
    let productInfo = {
        id: cartItemId,
        imgSrc: product.querySelector('.product-image img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemId++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

function addToCartList(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
    <div class="cart-item">
        <img src="${product.imgSrc}" alt="product image">
        <div class="cart-item-info">
            <h3 class="cart-item-name">${product.name}</h3>
            <span class="cart-item-category">${product.category}</span>
            <span class="cart-item-price">${product.price}</span>
        </div>
        <button type="button" class="cart-item-delete">x</button>
    </div> 
    `;
    cartList.appendChild(cartItem);
}

//save product in local storage

function saveProductInStorage(item) {
    let productsList = getProductFromSotarge();
    productsList.push(item);
    localStorage.setItem('productsList', JSON.stringify(productsList));
    updateInfo();
}

//get from storage

function getProductFromSotarge() {
    return localStorage.getItem('productsList') ? JSON.parse(localStorage.getItem('productsList')) : [];
}

function loadCart() {
    let products = getProductFromSotarge();
    if(products.length < 1) {
        cartItemId = 1;
    } else {
        cartItemId = products[products.length - 1].id;
        cartItemId++;
    }
    products.forEach(product => {
        addToCartList(product);
    })
}

function loadJSON() {
    fetch('products.json')
    .then(response => response.json())
    .then(products => {
        let html = '';
        products.forEach(product => {
            html += `
            <div class="product-item">
                <div class="product-image">
                    <img src="${product.imgSrc}" alt="product image">
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
    .catch(error => {
        alert(`User live server`);
    })
}

function updateInfo() {
    let cartInfo = findCartInfo();
    countInfo.textContent = cartInfo.productCoun;
    totalValue.textContent = cartInfo.total;
}

updateInfo();

function findCartInfo() {
    let products = getProductFromSotarge();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1));
        return acc += price;
    }, 0);
    return {
        total: total.toFixed(2),
        productCoun: products.length
    }
}

findCartInfo();

cartList.addEventListener('click', deleteProduct);

function deleteProduct(e) {
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); 
    } 

    let products = getProductFromSotarge();
    let updatedProducts = products.forEach(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); 
    updateInfo();
}


