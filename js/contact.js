const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const phone = document.getElementById("contact-phone").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value;
        const message = document.getElementById("contact-message").value.trim();

        // بررسی شماره موبایل
        if (!/^09\d{9}$/.test(phone)) {
            alert("شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
            return;
        }

        // بررسی نام
        if (name.length < 3) {
            alert("لطفاً نام و نام خانوادگی را صحیح وارد کنید.");
            return;
        }

        // بررسی متن پیام
        if (message.length < 10) {
            alert("متن پیام باید حداقل ۱۰ کاراکتر باشد.");
            return;
        }

        // ساخت پیام آزمایشی
        const contactData = {
            id: Date.now(),
            name: name,
            phone: phone,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toLocaleString("fa-IR")
        };

        // ذخیره در مرورگر
        const messages = JSON.parse(
            localStorage.getItem("contactMessages")
        ) || [];

        messages.push(contactData);

        localStorage.setItem(
            "contactMessages",
            JSON.stringify(messages)
        );

        alert(
            "پیام شما در نسخه آزمایشی DigiShop ثبت شد. 💚"
        );

        contactForm.reset();

    });

}