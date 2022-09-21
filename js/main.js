const btnAdd = document.querySelector('.btn-info');
const cartInfo = document.querySelector('.cart-info');
const btnBack = document.querySelector('.btn-back');

const btnViewCart = document.querySelector('.btn-cart');

const cartName = document.querySelector('.cart-name');


btnAdd.addEventListener('click', () => {
    cartInfo.classList.add("cart-active");
});

btnBack.addEventListener('click', () => {
    cartInfo.classList.remove("cart-active");
});

btnViewCart.addEventListener('click', () => {
    window.location = "cart.html";
});

