const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

// دریافت سبد خرید
function getCheckoutCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// فرمت قیمت
function formatCheckoutPrice(price) {
    return price.toLocaleString("fa-IR") + " تومان";
}

// نمایش محصولات در صفحه تسویه حساب
function renderCheckout() {
    const cart = getCheckoutCart();

    if (cart.length === 0) {
        window.location.href = "cart.html";
        return;
    }

    let totalPrice = 0;

    checkoutItems.innerHTML = cart.map(function(product) {
        const productTotal = product.price * product.quantity;
        totalPrice += productTotal;

        return  `
            <div class="checkout-product">
                <div>
                    <h4>${product.name}</h4>
                    <span>تعداد: ${product.quantity}</span>
                </div>

                <strong>${formatCheckoutPrice(productTotal)}</strong>
            </div>
        ` ;
    }).join("");

    checkoutTotal.textContent = formatCheckoutPrice(totalPrice);
}

// ثبت سفارش
checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const cart = getCheckoutCart();

    if (cart.length === 0) {
        alert("سبد خرید شما خالی است!");
        return;
    }

    const phone = document.getElementById("customer-phone").value.trim();

    if (!/^09\d{9}$/.test(phone)) {
        alert("شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
        return;
    }

    const totalPrice = cart.reduce(function(sum, product) {
        return sum + product.price * product.quantity;
    }, 0);

    const order = {
        id: Date.now(),
        customer: {
            name: document.getElementById("customer-name").value.trim(),
            phone: phone,
            email: document.getElementById("customer-email").value.trim(),
            address: document.getElementById("customer-address").value.trim(),
            postalCode: document.getElementById("postal-code").value.trim()
        },
        products: cart,
        total: totalPrice,
        date: new Date().toLocaleString("fa-IR"),
        status: "در انتظار پرداخت"
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    // ذخیره سفارش
    localStorage.setItem("orders", JSON.stringify(orders));

    // خالی کردن سبد خرید
    localStorage.removeItem("cart");

    // به‌روزرسانی عدد سبد خرید در هدر
    document.querySelectorAll(".cart-count").forEach(function(count) {
        count.textContent = "۰";
    });

    // نمایش پیام موفقیت
    alert("سفارش آزمایشی شما با موفقیت ثبت شد!");

    // بازگشت به صفحه اصلی
    window.location.href = "index.html";
});

// اجرای اولیه
renderCheckout();
