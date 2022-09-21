const listProducts = document.querySelector('.listProducts');
const infoBox = document.querySelector('.cart-box');
const totalCount = document.querySelector('.total');

let products = [];

window.addEventListener('load', () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(resJson => {
            // console.log(resJson);
            products = resJson;
            console.log(products);
        })
        .then( _ => {
            printingProducts();
        })
        .catch(err => console.log(err));
})

const printingProducts = () => {
    products.forEach(product => {
        listProducts.innerHTML += `
        <div class="item">
            <a onclick="goToSingle(${product.id})">
                <img src="${product.image}" alt="" height="250px">
                <h3>${product.title.toUpperCase().substring(0, 12)}...</h3>
                <p>$${Math.floor(product.price)}</p>
            </a>
        </div>
        `;
    });
};


if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
};

cart.forEach(item => {
    // console.log(item);
    infoBox.innerHTML += `
    <div>
        <img src="${item.image}" alt="">
    </div>
    <div class="detail-box">
        <p>${item.title.substring(0, 10)}...</p>
        <p class="cart-qty">${item.rating.count}</p>
        <p>x</p>
        <p class="cart-price">$${item.price}</p>
    </div>
    `
})

let total = cart.reduce((acc, curVal) => {
    return acc + (curVal.price * curVal.rating.count)
}, 0)

totalCount.innerHTML = `Total: <p class="total-price">$${total}</p>`



const goToSingle = (id) =>{
    localStorage.setItem("singleProduct", id);
    window.location = "single.html";
    console.log(id);
}
