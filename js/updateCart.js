let cart = [];

window.addEventListener('load', () => {
    if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        document.querySelector('#numberItem').innerHTML = ` (${cart.length})`;
    }
})