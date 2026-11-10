const cartItems = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");

const cartTotalCount = document.getElementById("cart-total-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById("checkout-button");

// دریافت سبد خرید
function getCart() {
    try {
        return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
        return [];
    }
}

// فرمت قیمت
function formatPrice(price) {
    return price.toLocaleString("fa-IR") + " تومان";
}

// به‌روزرسانی تعداد کنار سبد خرید
function updateCartCount(cart = getCart()) {
    const cartCount = document.querySelector(".cart-count");

    if (!cartCount) return;

    const count = cart.reduce(function(sum, product) {
        return sum + Number(product.quantity || 0);
    }, 0);

    cartCount.textContent = count.toLocaleString("fa-IR");
}

// افزودن محصول به سبد خرید
function addToCart(id) {
    if (typeof products === "undefined") {
        console.error("فایل products.js بارگذاری نشده است.");
        return;
    }

    const product = products.find(function(item) {
        return item.id === Number(id);
    });

    if (!product) {
        alert("محصول پیدا نشد!");
        return;
    }

    let cart = getCart();

    const existingProduct = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount(cart);

    alert("محصول با موفقیت به سبد خرید اضافه شد.");
}

// نمایش محصولات سبد خرید
function renderCart() {
    if (!cartItems || !emptyCart ||
        !cartTotalCount || !cartSubtotal ||
        !cartTotal || !checkoutButton) {
        updateCartCount();
        return;
    }

    const cart = getCart();

    updateCartCount(cart);

    if (cart.length === 0) {
        cartItems.innerHTML = "";
        emptyCart.hidden = false;
        checkoutButton.disabled = true;

        cartTotalCount.textContent = "۰";
        cartSubtotal.textContent = formatPrice(0);
        cartTotal.textContent = formatPrice(0);

        return;
    }

    emptyCart.hidden = true;
    checkoutButton.disabled = false;

    cartItems.innerHTML = cart.map(function(product) {
        return `
            <article class="cart-item">

                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="cart-item-info">
                    <h3>${product.name}</h3>

                    <p>${formatPrice(product.price)}</p>

                    <div class="cart-item-actions">

                        <button onclick="changeQuantity(${product.id}, 1)">+</button>

                        <span>${product.quantity}</span>

                        <button onclick="changeQuantity(${product.id}, -1)">−</button>

                        <button class="remove-cart-item"
                            onclick="removeProduct(${product.id})">
                            <i class="fa-solid fa-trash"></i>
                            حذف
                        </button>

                    </div>
                </div>

            </article>
       ` ;
    }).join("");

    const totalCount = cart.reduce(function(sum, product) {
        return sum + product.quantity;
    }, 0);

    const totalPrice = cart.reduce(function(sum, product) {
        return sum + product.price * product.quantity;
    }, 0);

    cartTotalCount.textContent = totalCount.toLocaleString("fa-IR");
    cartSubtotal.textContent = formatPrice(totalPrice);
    cartTotal.textContent = formatPrice(totalPrice);
}

// افزایش و کاهش تعداد
function changeQuantity(id, amount) {
    let cart = getCart();
const product = cart.find(function(item) {
        return item.id === id;
    });

    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {
        cart = cart.filter(function(item) {
            return item.id !== id;
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// حذف محصول
function removeProduct(id) {
    let cart = getCart();

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// اجرای اولیه
renderCart();

// دکمه تسویه حساب
if (checkoutButton) {
    checkoutButton.addEventListener("click", function() {
        const cart = getCart();

        if (cart.length === 0) {
            alert("سبد خرید شما خالی است!");
            return;
        }

        window.location.href = "checkout.html";
    });
}