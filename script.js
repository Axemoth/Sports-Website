// Cart functionality
document.addEventListener("DOMContentLoaded", function() {
    displayCart();
    updateTotal();
    setupAddToCartButtons();
});

// Function to add item to the cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
    displayCart();
    updateTotal();
}

// Function to display cart items
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");

    if (cartItems) {
        cartItems.innerHTML = "";

        cart.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity('${item.name}')">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity('${item.name}')">+</button>
                </td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Remove</button></td>
            `;
            cartItems.appendChild(row);
        });
    }
    updateTotal();
}

// Function to update the total price
function updateTotal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalElement = document.getElementById("total-amount");

    if (totalElement) {
        totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }
}

// Function to remove an item from the cart
function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateTotal();
}

// Function to increase the quantity of an item
function increaseQuantity(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(item => item.name === name);

    if (item) {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        updateTotal();
    }
}

// Function to decrease the quantity of an item
function decreaseQuantity(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(item => item.name === name);

    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        updateTotal();
    } else if (item && item.quantity === 1) {
        removeFromCart(name);
    }
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
    updateTotal();
    alert("Cart cleared!");
}

// Function to setup "Add to Cart" buttons
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            addToCart(name, price);
        });
    });
}

// Function to plant a tree (for charity) after successful payment
function plantTree() {
    let treeCount = localStorage.getItem('treeCount') || 0;
    treeCount++;
    localStorage.setItem('treeCount', treeCount);

    // Update any elements showing tree count on other pages
    const treeCountElement = document.getElementById('tree-count');
    if (treeCountElement) {
        treeCountElement.textContent = treeCount;
    }
}

// Example of handling payment success (to be triggered on payment confirmation page)
document.addEventListener("DOMContentLoaded", function() {
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert("Payment successful!");

            // Plant a tree upon successful payment
            plantTree();

            // Redirect to Track Order or Confirmation page
            window.location.href = "track_order.html";
        });
    }
});
function makePayment() {
    // After processing payment logic
    if (paymentSuccessful) {
        sessionStorage.setItem('paymentSuccess', 'true');
        window.location.href = 'track_order.html';
    }
}
// Prevent checkout if the cart is empty
document.getElementById('checkout-btn').addEventListener('click', function (e) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        e.preventDefault();
    }
});


