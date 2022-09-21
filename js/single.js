const image = document.getElementById('image');
const title = document.getElementById('title');
const price = document.getElementById('price');
const rating = document.getElementById('rating');
const description = document.getElementById('description');
const quantity = document.getElementById('qty');
const category = document.getElementById('category')

const form = document.querySelector('form');

let currentId = null;
let currentProduct = {};
// let cart = [];

window.addEventListener('load', () => {

    currentId = localStorage.getItem("singleProduct");

    console.log(currentId);

    fetch(`https://fakestoreapi.com/products/${currentId}`)
    .then(proizvodRaw => {
        return proizvodRaw.json();
    })
    .then(proizvodJson => {
        console.log(proizvodJson);
        currentProduct = proizvodJson;

        image.innerHTML = `<img src="${proizvodJson.image}" alt=""/>`;
        title.textContent = `${proizvodJson.title}`;
        price.textContent = `$${proizvodJson.price}`;
        rating.textContent = `Rating: ${proizvodJson.rating.rate}`
        description.textContent = `${proizvodJson.description}`;
        category.textContent = `${proizvodJson.category}`

        quantity.innerHTML = '';

        for(let i = 1; i <= proizvodJson.rating.count; i++) {
            quantity.innerHTML += `<option value="${i}">${i}</option>`;
        }
        
        
    })
    .catch(err => console.error(err));
})


form.addEventListener('submit', (event) => {
    event.preventDefault();

    currentProduct.rating.count = Number(event.target.quantity.value);
    

    if(!localStorage.getItem('cart')){
        localStorage.setItem('cart', '[]');
    }

    cart = JSON.parse(localStorage.getItem('cart'));
    
   
    let isProductAdded = false;

    cart.forEach((element) => {
        if(element.id === currentProduct.id){
            element.rating.count += currentProduct.rating.count;
            isProductAdded = true;
        }
    })

    if (!isProductAdded) {
        cart.push(currentProduct);
    }
    

    document.querySelector('#numberItem').innerHTML = ` (${cart.length})`;
    localStorage.setItem('cart', JSON.stringify(cart));

    window.location = "index.html";
    
})