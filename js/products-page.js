const allProducts = document.getElementById("all-products");
const searchInput = document.getElementById("product-search");
const sortSelect = document.getElementById("product-sort");
const categoryButtons = document.querySelectorAll(".shop-category");
const emptyProducts = document.getElementById("empty-products");

let selectedCategory = "all";

function renderAllProducts() {
    if (!allProducts) return;

    let filteredProducts = [...products];

    // فیلتر دسته‌بندی
    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(function(product) {
            return product.category === selectedCategory;
        });
    }

    // جست‌وجوی محصول
    if (searchInput) {
        const searchValue = searchInput.value.trim().toLowerCase();

        filteredProducts = filteredProducts.filter(function(product) {
            return product.name.toLowerCase().includes(searchValue);
        });
    }

    // مرتب‌سازی قیمت
    if (sortSelect) {
        if (sortSelect.value === "low") {
            filteredProducts.sort((a, b) => a.price - b.price);
        }

        if (sortSelect.value === "high") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }
    }

    // نمایش محصولات
    allProducts.innerHTML = filteredProducts.map(function(product) {
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
                        ${product.price.toLocaleString("fa-IR")} تومان
                    </div>

                  <a href="product.html?id=${product.id}" class="add-to-cart">
    <i class="fa-solid fa-eye"></i>
    مشاهده جزئیات
</a>

                </div>
     </article>
`;
    }).join("");

    // نمایش پیام در صورت نبود محصول
    if (emptyProducts) {
        emptyProducts.hidden = filteredProducts.length > 0;
    }
}

// کلیک روی دسته‌بندی‌ها
categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        categoryButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        renderAllProducts();
    });
});

// جست‌وجو
if (searchInput) {
    searchInput.addEventListener("input", renderAllProducts);
}

// مرتب‌سازی
if (sortSelect) {
    sortSelect.addEventListener("change", renderAllProducts);
}

// نمایش اولیه محصولات
renderAllProducts();