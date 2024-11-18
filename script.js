// التبديل بين إظهار الفلاتر
function toggleFilters() {
    document.getElementById("filters").classList.toggle("hidden");
}

// تطبيق الفلاتر
function applyFilters() {
    const priceMin = parseFloat(document.getElementById("price-min").value) || 0;
    const priceMax = parseFloat(document.getElementById("price-max").value) || Infinity;
    const location = document.getElementById("location").value.trim().toLowerCase();
    const size = parseFloat(document.getElementById("size").value) || 0;
    const sortOrder = document.getElementById("sort").value;

    const properties = document.querySelectorAll(".property");

    properties.forEach(property => {
        const propertyPrice = parseFloat(property.querySelector(".property-price").textContent.replace(/[^\d]/g, ''));
        const propertyLocation = property.querySelector(".property-location").textContent.trim().toLowerCase();
        const propertySize = parseFloat(property.querySelector(".property-size").textContent.replace(/[^\d]/g, ''));

        const matches = propertyPrice >= priceMin && propertyPrice <= priceMax &&
                        (!location || propertyLocation.includes(location)) &&
                        (!size || propertySize >= size);

        property.style.display = matches ? "" : "none";
    });

    if (sortOrder) {
        const sortedProperties = Array.from(properties).sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".property-price").textContent.replace(/[^\d]/g, ''));
            const priceB = parseFloat(b.querySelector(".property-price").textContent.replace(/[^\d]/g, ''));
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        });
        
        const container = document.getElementById("latest-properties");
        container.innerHTML = "";
        sortedProperties.forEach(property => container.appendChild(property));
    }
    alert("تم تطبيق الفلاتر...");
}

// التبديل بين إظهار نموذج تسجيل الدخول
function toggleLoginForm() {
    document.getElementById("admin-login").classList.toggle("hidden");
}

// التحقق من تسجيل الدخول للمسؤول
function checkAdminLogin() {
    const username = document.getElementById("admin-name").value;
    const password = document.getElementById("admin-password").value;

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
    event.preventDefault();
    const propertyLocation = document.getElementById("property-location").value;
    const propertyPrice = document.getElementById("property-price").value;
    const propertySize = document.getElementById("property-size").value;
    const propertyDescription = document.getElementById("property-description").value;

    if (!propertyLocation || !propertyPrice || !propertySize || !propertyDescription) {
        alert("من فضلك، تأكد من ملء جميع البيانات المطلوبة.");
        return;
    }

    const propertyContainer = document.getElementById("latest-properties");
    const propertyElement = document.createElement("div");
    propertyElement.classList.add("property");

    let imagesHtml = '';
    for (let i = 1; i <= 10; i++) {
        const fileInput = document.getElementById(`property-images-${i}`);
        if (fileInput && fileInput.files[0]) {
            const imgFile = fileInput.files[0];
            const imgURL = URL.createObjectURL(imgFile);
            imagesHtml += `<div class="property-image"><img src="${imgURL}" alt="Property Image" class="property-img"></div>`;
        }
    }

    propertyElement.innerHTML = `
        <h4>العقار في: <span class="property-location">${propertyLocation}</span></h4>
        <p>السعر: <span class="property-price">${propertyPrice}</span> ج.م</p>
        <p>المساحة: <span class="property-size">${propertySize}</span> م²</p>
        <p>الوصف: ${propertyDescription}</p>
        <div class="property-images-container">${imagesHtml}</div>
        <button class="delete-property-btn" onclick="deleteProperty(this)">حذف العقار</button>
    `;

    propertyContainer.appendChild(propertyElement);
    document.getElementById("add-property-form").reset();
});

// حذف العقار
function deleteProperty(button) {
    button.parentElement.remove();
    alert("تم حذف العقار بنجاح.");
}

// إضافة الطلب
document.getElementById("user-request-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const userRequest = document.getElementById("user-request").value;
    const userPhone = document.getElementById("user-phone").value;

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
    document.getElementById("user-request-form").reset();
});

// حذف الطلب
function deleteRequest(button) {
    button.parentElement.remove();
}

// نسخ الطلب
function copyRequest(button) {
    const requestItem = button.parentElement.innerText;
    navigator.clipboard.writeText(requestItem).then(() => alert("تم نسخ الطلب."));
}
// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
