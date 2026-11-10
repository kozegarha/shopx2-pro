const productDetail = document.getElementById("product-detail");
const productNotFound = document.getElementById("product-not-found");

// توضیحات محصولات
const productDescriptions = {
    1: "گوشی سامسونگ Galaxy S24 با طراحی مدرن، دوربین قدرتمند و عملکرد سریع، انتخابی عالی برای علاقه‌مندان به تکنولوژی است.",

    2: "لپ‌تاپ ایسوس VivoBook با طراحی زیبا و عملکرد مناسب، گزینه‌ای کاربردی برای کارهای روزمره، تحصیل و فعالیت‌های حرفه‌ای است.",

    3: "هدفون بی‌سیم JBL با کیفیت صدای مطلوب و طراحی راحت، تجربه‌ای لذت‌بخش از گوش دادن به موسیقی فراهم می‌کند.",

    4: "ساعت هوشمند سامسونگ با امکانات متنوع، طراحی جذاب و قابلیت بررسی فعالیت‌های روزانه، همراهی کاربردی برای شماست."
};

// دریافت شناسه محصول از آدرس
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

// پیدا کردن محصول
const product = products.find(function(item) {
    return item.id === productId;
});

// نمایش جزئیات
function renderProductDetail() {

    if (!product) {
        productNotFound.hidden = false;
        productDetail.hidden = true;
        return;
    }

    document.title = product.name + " | DigiShop";

    productDetail.innerHTML =`
        <div class="product-detail-wrapper">

            <div class="product-detail-image">
                <span class="detail-badge">${product.badge}</span>

                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-detail-info">

                <span class="detail-category">
                    <i class="fa-solid fa-tag"></i>
                    ${getCategoryName(product.category)}
                </span>

                <h1>${product.name}</h1>

                <div class="detail-rating">
                    <span>★★★★★</span>
                    <small>محصول منتخب دیجی‌شاپ</small>
                </div>

                <div class="detail-description">
                    <h3>معرفی محصول</h3>
                    <p>
                        ${productDescriptions[product.id] || "برای این محصول توضیحاتی ثبت نشده است."}
                    </p>
                </div>

                <div class="detail-price">
                    <span>قیمت محصول</span>
                    <strong>
                        ${product.price.toLocaleString("fa-IR")} تومان
                    </strong>
                </div>

                <div class="detail-actions">

                    <div class="quantity-control">
                        <button type="button" id="decrease-quantity">−</button>
                        <span id="product-quantity">1</span>
                        <button type="button" id="increase-quantity">+</button>
                    </div>

                    <button type="button" class="detail-add-cart" id="add-to-cart">
                        <i class="fa-solid fa-cart-plus"></i>
                        افزودن به سبد خرید
                    </button>

                </div>

                <div class="detail-features">
                    <div>
                        <i class="fa-solid fa-truck-fast"></i>
                        ارسال سریع
                    </div>

                    <div>
                        <i class="fa-solid fa-shield-halved"></i>
                        خرید مطمئن
                    </div>

                    <div>
                        <i class="fa-solid fa-headset"></i>
                        پشتیبانی
                    </div>
                </div>

            </div>

        </div>
`;

    setupProductActions();
}

// نام دسته‌بندی
function getCategoryName(category) {
    const categories = {
        mobile: "موبایل",
        laptop: "لپ‌تاپ",
        accessory: "لوازم جانبی",
        watch: "ساعت هوشمند"
    };

    return categories[category] || "محصول دیجیتال";
}

// کنترل تعداد و افزودن به سبد خرید
function setupProductActions() {

    let quantity = 1;
const quantityDisplay = document.getElementById("product-quantity");
    const increaseButton = document.getElementById("increase-quantity");
    const decreaseButton = document.getElementById("decrease-quantity");
    const addButton = document.getElementById("add-to-cart");

    increaseButton.addEventListener("click", function() {
        quantity++;
        quantityDisplay.textContent = quantity;
    });

    decreaseButton.addEventListener("click", function() {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    addButton.addEventListener("click", function() {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find(function(item) {
            return item.id === product.id;
        });

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
updateHeaderCartCount();
        addButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            به سبد خرید اضافه شد
        `;

        addButton.disabled = true;

        setTimeout(function() {
            addButton.innerHTML = `
                <i class="fa-solid fa-cart-plus"></i>
                افزودن به سبد خرید
            `;
            addButton.disabled = false;
        }, 1500);
    });
}

renderProductDetail();