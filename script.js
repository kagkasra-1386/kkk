// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');

    // Add hover effect for product cards
    productGrid.addEventListener('mouseover', (event) => {
        const target = event.target.closest('.product-card');
        if (target) {
            target.style.transform = 'scale(1.08)';
            target.style.transition = 'transform 0.3s ease';
        }
    });

    productGrid.addEventListener('mouseout', (event) => {
        const target = event.target.closest('.product-card');
        if (target) {
            target.style.transform = 'scale(1)';
        }
    });

    // Handle "مشاهده جزئیات" button clicks
    productGrid.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (button) {
            const productId = button.parentElement.querySelector('h3').textContent.split(' ')[1];
            window.location.href = `product-details.html?id=${productId}`;
        }
    });

    const mainContainer = document.querySelector('main');

    categories.forEach(category => {
        const section = document.createElement('section');
        section.className = 'category-section';

        const heading = document.createElement('h2');
        heading.textContent = category.name;

        const productGrid = document.createElement('div');
        productGrid.className = 'product-grid';

        category.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;

            const title = document.createElement('h3');
            title.textContent = product.name;

            const button = document.createElement('button');
            button.textContent = 'مشاهده جزئیات';
            button.onclick = () => {
                window.location.href = `product-details.html?id=${product.id}`;
            };

            productCard.appendChild(img);
            productCard.appendChild(title);
            productCard.appendChild(button);
            productGrid.appendChild(productCard);
        });

        const moreButton = document.createElement('button');
        moreButton.className = 'btn';
        moreButton.textContent = 'مشاهده محصولات بیشتر';
        moreButton.onclick = () => {
            window.location.href = category.link;
        };

        section.appendChild(heading);
        section.appendChild(productGrid);
        section.appendChild(moreButton);
        mainContainer.appendChild(section);
    });

    // Login and Signup Forms Functionality
    const authForms = document.querySelector('.auth-forms');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    authForms.querySelector('.login-btn').addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    authForms.querySelector('.signup-btn').addEventListener('click', () => {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Login Form Submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = event.target.querySelector('input[name="username"]').value.trim();
        const password = event.target.querySelector('input[name="password"]').value.trim();

        if (username && password) {
            alert(`خوش آمدید، ${username}`);
            loginForm.reset();
            loginForm.classList.add('hidden');
        } else {
            alert('لطفاً همه فیلدها را پر کنید.');
        }
    });

    // Signup Form Submission
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = event.target.querySelector('input[name="username"]').value.trim();
        const email = event.target.querySelector('input[name="email"]').value.trim();
        const password = event.target.querySelector('input[name="password"]').value.trim();

        if (username && email && password) {
            alert(`ثبت‌نام موفقیت‌آمیز بود، ${username}`);
            signupForm.reset();
            signupForm.classList.add('hidden');
        } else {
            alert('لطفاً همه فیلدها را پر کنید.');
        }
    });
});


// Hamburger Menu Functionality
const hamburgerIcon = document.getElementById('hamburger-icon');
const menuContent = document.getElementById('menu-content');

hamburgerIcon.addEventListener('click', () => {
    // Toggle visibility
    menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
});

    // Dynamically populate menu items if hidden class is removed
    if (!menuContent.classList.contains('hidden')) {
        menuContent.innerHTML = `
            <ul>
                <li><a href="#">خانه</a></li>
                <li><a href="#about">درباره ما</a></li>
                <li><a href="#contact">ارتباط با ما</a></li>
                <li>
                    محصولات
                    <ul class="submenu">
                        <li><a href="accessories.html">اکسسوری</a></li>
                        <li><a href="bags.html">بگ</a></li>
                    </ul>
                </li>
                <li><a href="cart.html">سبد خرید</a></li>
            </ul>
        `;
    }

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menuContent.contains(event.target) && !hamburgerIcon.contains(event.target)) {
        menuContent.classList.add('hidden');
    }
});

const searchInput = document.getElementById('search-input');
const productGrid = document.querySelector('.product-grid');

// ذخیره محصولات اصلی
const allProducts = Array.from(productGrid.children);

// جستجوی لحظه‌ای
const performSearch = (query) => {
    productGrid.innerHTML = ''; // پاک کردن محتوا

    if (query) {
        // فیلتر کردن محصولات
        const results = allProducts.filter((card) => {
            const productName = card.querySelector('h3').textContent;
            return productName.includes(query);
        });

        if (results.length > 0) {
            results.forEach((result) => productGrid.appendChild(result));
        } else {
            productGrid.innerHTML = '<p>محصولی یافت نشد</p>';
        }
    } else {
        // بازگرداندن لیست کامل محصولات
        allProducts.forEach((product) => productGrid.appendChild(product));
    }
};

// رویداد لحظه‌ای جستجو
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    performSearch(query);
});

// Listen to input events for real-time search
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    performSearch(query);
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

// Login and Signup Redirection
const loginButton = document.getElementById('login-btn');
const signupButton = document.getElementById('signup-btn');

loginButton.addEventListener('click', () => {
    window.location.href = 'login.html';
});

signupButton.addEventListener('click', () => {
    window.location.href = 'signup.html';
});

// Signup Form Submission
document.getElementById('signup-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
    });
    const result = await response.json();
    alert(result.message);
});

// Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
    });
    const result = await response.json();
    if (response.ok) {
        alert(result.message);
    } else {
        alert(result.message);
    }
});
