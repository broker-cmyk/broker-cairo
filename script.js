// التبديل بين إظهار الفلاتر
function toggleFilters() {
    var filters = document.getElementById("filters");
    filters.classList.toggle("hidden");
}

// تطبيق الفلاتر
function applyFilters() {
    const priceMin = document.getElementById("price-min").value;
    const priceMax = document.getElementById("price-max").value;
    const location = document.getElementById("location").value;
    const size = document.getElementById("size").value;
    const sortOrder = document.getElementById("sort").value;

    // ستحتاج هنا لإضافة الكود المناسب لتصفية العقارات بناءً على الفلاتر
    alert("تم تطبيق الفلاتر...");
}

// التبديل بين إظهار نموذج تسجيل الدخول
function toggleLoginForm() {
    var loginForm = document.getElementById("admin-login");
    loginForm.classList.toggle("hidden");
}

// التحقق من تسجيل الدخول للمسؤول
function checkAdminLogin() {
    var username = document.getElementById("admin-name").value;
    var password = document.getElementById("admin-password").value;

    if (username === "مهد أحمد علي" && password === "01156342313مهد@") {
        alert("تم تسجيل الدخول بنجاح");
        document.getElementById("admin-requests-section").classList.remove("hidden");
        document.getElementById("add-property-section").classList.remove("hidden");
    } else {
        alert("بيانات غير صحيحة");
    }
}

// إضافة العقار
document.getElementById("add-property-form").addEventListener("submit", function (event) {
    event.preventDefault(); // منع الإرسال التقليدي للنموذج

    // الحصول على بيانات النموذج
    const propertyLocation = document.getElementById("property-location").value;
    const propertyPrice = document.getElementById("property-price").value;
    const propertySize = document.getElementById("property-size").value;
    const propertyDescription = document.getElementById("property-description").value;
    const propertyImages = [];
    
    // التحقق من وجود الصور
    for (let i = 1; i <= 10; i++) {
        let imgFile = document.getElementById("property-images-" + i).files[0];
        if (imgFile) {
            propertyImages.push(URL.createObjectURL(imgFile)); // إنشاء رابط محلي للصور
        }
    }
    
    const propertyVideo = document.getElementById("property-video").files[0];

    if (propertyLocation === "" || propertyPrice === "" || propertySize === "" || propertyDescription === "") {
        alert("من فضلك، تأكد من ملء جميع البيانات المطلوبة.");
        return;
    }

    // إنشاء عنصر جديد لعرض العقار
    const propertyContainer = document.getElementById("latest-properties");
    const propertyElement = document.createElement("div");
    propertyElement.classList.add("property");

    let imagesHtml = "";
    propertyImages.forEach((img) => {
        imagesHtml += `<div class="property-image"><img src="${img}" alt="Property Image" class="property-img"></div>`;
    });

    propertyElement.innerHTML = `
        <h4>العقار في: ${propertyLocation}</h4>
        <p>السعر: ${propertyPrice} ج.م</p>
        <p>المساحة: ${propertySize} م²</p>
        <p>الوصف: ${propertyDescription}</p>
        <div class="property-images-container">
            ${imagesHtml}
        </div>
        ${propertyVideo ? `<p>فيديو العقار: <a href="${URL.createObjectURL(propertyVideo)}" target="_blank">مشاهدة الفيديو</a></p>` : ''}
        <button class="delete-property-btn" onclick="deleteProperty(this)">حذف العقار</button>
    `;

    // إضافة العقار إلى القائمة
    propertyContainer.appendChild(propertyElement);

    // إعادة تعيين النموذج بعد الإضافة
    document.getElementById("add-property-form").reset();
});

// حذف العقار
function deleteProperty(button) {
    const propertyItem = button.parentElement;
    propertyItem.remove();
    alert("تم حذف العقار بنجاح.");
}

// إضافة الطلب
document.getElementById("user-request-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const userRequest = document.getElementById("user-request").value;
    const userPhone = document.getElementById("user-phone").value;

    // عرض الطلب للمسؤول فقط
    const requestList = document.getElementById("admin-requests-list");
    const requestItem = document.createElement("div");
    requestItem.classList.add("request-item");

    requestItem.innerHTML = `
        <p><strong>الطلب:</strong> ${userRequest}</p>
        <p><strong>رقم الهاتف:</strong> ${userPhone}</p>
        <button onclick="deleteRequest(this)">حذف الطلب</button>
        <button onclick="copyRequest(this)">نسخ الطلب</button>
    `;

    requestList.appendChild(requestItem);

    // إعادة تعيين النموذج بعد الإرسال
    document.getElementById("user-request-form").reset();
});

// حذف الطلب
function deleteRequest(button) {
    const requestItem = button.parentElement;
    requestItem.remove();
}

// نسخ الطلب
function copyRequest(button) {
    const requestItem = button.parentElement;
    const requestContent = requestItem.innerText;

    const textArea = document.createElement("textarea");
    textArea.value = requestContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    alert("تم نسخ الطلب.");
}
