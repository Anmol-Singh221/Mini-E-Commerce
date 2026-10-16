let count = 0;

function addToCart(button) {
  count++;

  let badge = document.getElementById("cart-count");
  if (badge) {
    badge.innerText = count;
  }

  if (button) {
    let originalText = button.innerText;
    button.innerText = "Added ✓";
    button.classList.add("added");

    setTimeout(function () {
      button.innerText = originalText;
      button.classList.remove("added");
    }, 1000);
  }
}

// Filters the existing product cards by category.
// It only shows/hides cards already in the page — it never
// adds or removes any product.
function filterProducts(category, clickedButton) {
  let cards = document.querySelectorAll(".product-card");
  let noResults = document.getElementById("noResults");
  let visibleCount = 0;

  cards.forEach(function (card) {
    let cardCategory = card.getAttribute("data-category");

    if (category === "all" || cardCategory === category) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  // Highlight the active category button
  let buttons = document.querySelectorAll(".category-btn");
  buttons.forEach(function (btn) {
    btn.classList.remove("active");
  });
  clickedButton.classList.add("active");

  // Show a message if a category happens to have zero matches
  if (visibleCount === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }
}

function addToCart(button) {
    const card = button.closest(".product-card");

    if (!card) return;

    const name = card.querySelector(".product-name").textContent.trim();
    const priceText = card.querySelector(".product-price").textContent;
    const price = Number(priceText.replace(/[^0-9.]/g, ""));
    const image = card.querySelector(".product-img img").src;

    let cart = JSON.parse(localStorage.getItem("shopxCart") || "[]");

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("shopxCart", JSON.stringify(cart));

    alert(name + " added to cart!");
}
