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

    // Scroll-triggered category sections
    const categories = [
        {
            name: 'اکسسوری',
            link: 'accessories.html',
            products: [
                { id: 1, name: 'اکسسوری ۱', image: 'images/accessory1.jpg' },
                { id: 2, name: 'اکسسوری ۲', image: 'images/accessory2.jpg' },
                { id: 3, name: 'اکسسوری ۳', image: 'images/accessory3.jpg' },
                { id: 4, name: 'اکسسوری ۴', image: 'images/accessory4.jpg' }
            ]
        },
        {
            name: 'کیف',
            link: 'bags.html',
            products: [
                { id: 5, name: 'کیف ۱', image: 'images/bag1.jpg' },
                { id: 6, name: 'کیف ۲', image: 'images/bag2.jpg' },
                { id: 7, name: 'کیف ۳', image: 'images/bag3.jpg' },
                { id: 8, name: 'کیف ۴', image: 'images/bag4.jpg' }
            ]
        }
    ];

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
});
