const cartTable = document.getElementById('cartTable');


window.addEventListener('load', () => {
    if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    };

    cartTable.innerHTML = '';


    cart.forEach(item => {
        console.log(item)
        cartTable.innerHTML += `
            <tr id="cart-item-${item.id}">
                <td><img src="${item.image}"/></td>
                <td id="table-name">${item.title.toUpperCase().substring(0, 15)}...</td>
                <td>$${item.price}</td>
                <td>${item.rating.count}</td>
                <td>$${item.price * item.rating.count}</td>
                <td><button onclick="removeItem(${item.id})" class="btn btn-danger m-0 btn-sm"><i class="fas fa-trash-alt"></i></button></td>
             </tr>
        `
    })

    let total = cart.reduce((acc, curVal) => {
        return acc + (curVal.price * curVal.rating.count)
    },0);

    cartTable.innerHTML += `
    <th scope="row"></th>
                <td></td>
                <td></td>
                <td>Total: </td>
                <td id="total-price">$${total}</td>
                <td></td>
    `
})

const clearCart = () => {
    localStorage.setItem('cart', '[]');
    cart = [];

    cartTable.innerHTML = '';
    window.location = "index.html";
}

const completePurchase = () => {
    localStorage.setItem('cart', '[]');
    cart = [];

    cartTable.innerHTML = '';
}

const backToShop = () => {
    window.location = "index.html";
}


const removeItem = (id) => {
    cart = JSON.parse(localStorage.getItem('cart'));

    let itemId = `cart-item-${id}`
    let selectedItem = document.getElementById(itemId)
    
    if (selectedItem) {
        selectedItem.remove();
    }

    cart = cart.filter(item => item.id != id);
    localStorage.setItem("cart", JSON.stringify(cart))

    let totall = cart.reduce((acc, curVal) => {
        return acc + (curVal.price * curVal.rating.count)
    },0);

    const total = document.getElementById("total-price");
    total.innerText = ` $${totall}`;
    document.querySelector('#numberItem').innerHTML = ` (${cart.length})`;
    
}