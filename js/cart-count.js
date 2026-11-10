function updateHeaderCartCount() {
    const cartCount = document.querySelector(".cart-count");

    if (!cartCount) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalCount = cart.reduce(function(sum, product) {
        return sum + product.quantity;
    }, 0);

    cartCount.textContent = totalCount.toLocaleString("fa-IR");
}

updateHeaderCartCount();