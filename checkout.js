
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutForm = document.getElementById("checkout-form");
const orderResult = document.getElementById("order-result");

let cart = JSON.parse(localStorage.getItem("shopxCart") || "[]");

function saveCart() {
    localStorage.setItem("shopxCart", JSON.stringify(cart));
}

function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty.</p>
                <a href="shop.html">Go to Shop</a>
            </div>
        `;

        cartTotal.textContent = "0.00";
        checkoutForm.hidden = true;
        return;
    }

    checkoutForm.hidden = false;

    let total = 0;

    cart.forEach((item, index) => {
        const quantity = Math.max(1, Number(item.quantity) || 1);
        const price = Math.max(0, Number(item.price) || 0);

        total += price * quantity;

        const product = document.createElement("div");
        product.className = "checkout-product";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;
        image.onerror = () => {
            image.style.display = "none";
        };

        const info = document.createElement("div");
        info.className = "checkout-product-info";

        const name = document.createElement("strong");
        name.textContent = item.name;

        const priceText = document.createElement("p");
        priceText.textContent = `$${price.toFixed(2)} each`;

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.setAttribute("aria-label", "Decrease quantity");

        minus.addEventListener("click", () => {
            if (quantity > 1) {
                cart[index].quantity = quantity - 1;
            } else {
                cart.splice(index, 1);
            }

            saveCart();
            renderCart();
        });

        const quantityText = document.createElement("span");
        quantityText.textContent = quantity;

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", "Increase quantity");

        plus.addEventListener("click", () => {
            cart[index].quantity = quantity + 1;
            saveCart();
            renderCart();
        });

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Remove";

        remove.addEventListener("click", () => {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        });

        controls.append(minus, quantityText, plus, remove);
        info.append(name, priceText, controls);
        product.append(image, info);
        cartItems.appendChild(product);
    });

    cartTotal.textContent = total.toFixed(2);
}

checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!checkoutForm.reportValidity()) return;

    const orderNumber =
        "SX-" + Date.now().toString().slice(-8);

    const total = cart.reduce((sum, item) => {
        return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    orderResult.innerHTML = "";

    const message = document.createElement("div");
    message.className = "success-message";

    const heading = document.createElement("h3");
    heading.textContent = "✓ Demo Order Placed!";

    const number = document.createElement("p");
    number.textContent = `Demo Order Number: ${orderNumber}`;

    const amount = document.createElement("p");
    amount.textContent = `Order Total: $${total.toFixed(2)}`;

    const note = document.createElement("p");
    note.textContent =
        "This is a frontend demonstration. No actual order was sent to a store.";

    message.append(heading, number, amount, note);
    orderResult.appendChild(message);

    cart = [];
    saveCart();
    renderCart();

    checkoutForm.reset();
    checkoutForm.hidden = true;
    orderResult.scrollIntoView({ behavior: "smooth" });
});

renderCart();
