const featuredProducts = document.getElementById("featured-products");

function formatPrice(price) {
    return price.toLocaleString("fa-IR") + " تومان";
}

function renderProducts() {
    if (!featuredProducts) return;

    featuredProducts.innerHTML = products.map(function(product) {
        return `
            <article class="product-card">

                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="product-info">

                    <span class="product-badge">
                        ${product.badge}
                    </span>

                    <h3>${product.name}</h3>

                    <div class="product-price">
                        ${formatPrice(product.price)}
                    </div>

                    <button
                        class="add-to-cart"
                        onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i>
                        افزودن به سبد خرید
                    </button>

                </div>

            </article>
        `;
    }).join("");
}

renderProducts();


// نمایش اطلاعات کاربر در هدر
document.addEventListener("DOMContentLoaded", function() {

    const authArea = document.getElementById("header-auth");

    if (!authArea) return;

    let currentUser = null;

    try {
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
    } catch (error) {
        console.error("خطا در اطلاعات کاربر:", error);
    }

    if (currentUser) {

        authArea.outerHTML = `
            <div class="header-user" id="header-user">

                <span>
                    <i class="fas fa-user-circle"></i>
                    ${currentUser.name}
                </span>

                <button type="button" id="logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    خروج
                </button>

            </div>
        `;

        const logoutButton = document.getElementById("logout-btn");

        logoutButton.addEventListener("click", function() {

            localStorage.removeItem("currentUser");

            alert("با موفقیت از حساب خارج شدید.");

            window.location.reload();

        });
    }

});