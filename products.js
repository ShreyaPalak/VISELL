// Fetch and display products from Firebase
async function loadProducts() {
    try {
        const productsContainer = document.getElementById('productsContainer');
        if (!productsContainer) return;

        // Clear existing products
        productsContainer.innerHTML = '';

        // Fetch all products from Firebase
        const querySnapshot = await db.collection('products').orderBy('createdAt', 'desc').get();

        if (querySnapshot.empty) {
            productsContainer.innerHTML = '<p style="text-align: center; color: #999;">No products available yet.</p>';
            return;
        }

        // Loop through products and create HTML
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productHTML = `
                <div class="grid__column grid__column--6 grid__column--3@md">
                    <div data-testid="product" class="product-tile">
                        <a href="#product-${doc.id}" class="tile">
                            <div class="tile__image">
                                <div class="image image--background-color">
                                    <div class="image__object">
                                        <img src="${product.image}" alt="${product.name}" onerror="this.src='logo.jpg'">
                                    </div>
                                </div>
                            </div>
                            <div class="tile__description">
                                <h3 class="tile__heading">${product.name}</h3>
                                <p class="tile__category" style="color: #999; font-size: 12px; margin: 5px 0;">
                                    ${product.category}
                                </p>
                                <p class="tile__prices">
                                    <span class="tile__price tile__price--original">
                                        ₹${product.price}
                                    </span>
                                </p>
                                <p class="tile__seller" style="color: #666; font-size: 12px; margin-top: 8px;">
                                    Seller: ${product.sellerName}
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productHTML;
        });

    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);

// Reload products every 30 seconds (optional)
setInterval(loadProducts, 30000);
