document.addEventListener("DOMContentLoaded", function () {

    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (!loginTab || !registerTab || !loginForm || !registerForm) {
        console.error("عناصر فرم ورود و ثبت‌نام پیدا نشدند.");
        return;
    }

    function showForm(type) {
        if (type === "register") {
            loginForm.classList.add("hidden");
            registerForm.classList.remove("hidden");
            loginTab.classList.remove("active");
            registerTab.classList.add("active");
        } else {
            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
            registerTab.classList.remove("active");
            loginTab.classList.add("active");
        }
    }

    loginTab.addEventListener("click", () => showForm("login"));
    registerTab.addEventListener("click", () => showForm("register"));

    document.querySelectorAll(".switch-to-register").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            showForm("register");
        });
    });

    document.querySelectorAll(".switch-to-login").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            showForm("login");
        });
    });

    // نمایش و مخفی کردن رمز عبور
    document.querySelectorAll(".password-toggle").forEach(button => {
        button.addEventListener("click", () => {
            const input = document.getElementById(button.dataset.target);
            if (!input) return;

            input.type = input.type === "password" ? "text" : "password";
        });
    });

    // ثبت نام آزمایشی
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("register-name").value.trim();
        const phone = document.getElementById("register-phone").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("register-confirm-password").value;
        const terms = document.getElementById("accept-terms");

        if (name.length < 3) {
            alert("نام باید حداقل ۳ کاراکتر باشد.");
            return;
        }

        if (!/^09\d{9}$/.test(phone)) {
            alert("شماره موبایل معتبر نیست.");
            return;
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("ایمیل معتبر نیست.");
            return;
        }

        if (password.length < 8) {
            alert("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }

        if (password !== confirmPassword) {
            alert("تکرار رمز عبور صحیح نیست.");
            return;
        }

        if (!terms.checked) {
            alert("لطفاً قوانین را بپذیرید.");
            return;
        }

        let users = [];

        try {
            users = JSON.parse(localStorage.getItem("demoUsers")) || [];
        } catch (error) {
            console.error(error);
            alert("خطا در خواندن اطلاعات ثبت‌نام.");
            return;
        }

        if (users.some(user => user.phone === phone)) {
            alert("این شماره موبایل قبلاً ثبت شده است.");
            return;
        }

        users.push({ name, phone, email });

        try {
            localStorage.setItem("demoUsers", JSON.stringify(users));
        } catch (error) {
            console.error(error);
            alert("مرورگر اجازه ذخیره اطلاعات را نمی‌دهد.");
            return;
        }

        alert("ثبت‌نام آزمایشی با موفقیت انجام شد. حالا وارد حساب شوید.");

        registerForm.reset();
        document.getElementById("login-phone").value = phone;
        showForm("login");
    });// ورود آزمایشی
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const phone = document.getElementById("login-phone").value.trim();
        const password = document.getElementById("login-password").value;

        if (!/^09\d{9}$/.test(phone)) {
            alert("شماره موبایل را صحیح وارد کنید.");
            return;
        }

        if (password.length < 8) {
            alert("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }

        let users = [];

        try {
            users = JSON.parse(localStorage.getItem("demoUsers")) || [];
        } catch (error) {
            console.error(error);
            alert("خطا در خواندن اطلاعات کاربران.");
            return;
        }

        const user = users.find(item => item.phone === phone);

        if (!user) {
            alert("حسابی با این شماره پیدا نشد. ابتدا ثبت‌نام کنید.");
            return;
        }

        try {
            localStorage.setItem("currentUser", JSON.stringify({
                name: user.name,
                phone: user.phone
            }));
        } catch (error) {
            console.error(error);
            alert("مرورگر اجازه ورود آزمایشی را نمی‌دهد.");
            return;
        }

        alert("ورود آزمایشی موفقیت‌آمیز بود!");
        window.location.href = "index.html";
    });

    // بازیابی رمز عبور
    const forgotPassword = document.getElementById("forgot-password");

    if (forgotPassword) {
        forgotPassword.addEventListener("click", event => {
            event.preventDefault();
            alert("بازیابی رمز پس از اتصال بک‌اند فعال می‌شود.");
        });
    }

});