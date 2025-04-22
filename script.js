 // Fetch and display products
 const baseUrl = 'http://localhost:3000/products';
 async function fetchProducts() {
    try {
        const response = await fetch(baseUrl);
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Price: $${product.price}</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            productList.insertAdjacentHTML('beforeend', productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
//login 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('input-icon');
    const checkbox = document.getElementById('check');

    // Toggle password visibility
    passwordIcon.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordIcon.classList.remove('ri-eye-off-line');
            passwordIcon.classList.add('ri-eye-line');
        } else {
            passwordInput.type = 'password';
            passwordIcon.classList.remove('ri-eye-line');
            passwordIcon.classList.add('ri-eye-off-line');
        }
    });

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from submitting to server
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!email || !password) {
            alert('Please fill in both fields.');
            return;
        }

        // Simulate form submission (You can replace this with actual form submission to server)
        alert('Logged in successfully!');
        // Clear the form fields
        form.reset();
    });
});

//searchbar
const searchInput = document.querySelector('.searchInput');
const searchButton = document.querySelector('.search .btn');
const products = Array.from(document.querySelectorAll('.product'));

// Add an event listener to the button
searchButton.addEventListener('click', function() {
    const query = searchInput.value.trim().toLowerCase();

    if (query) {
        products.forEach(product => {
            const productName = product.querySelector('h5').textContent.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    } else {
        alert('Please enter a search term.');
        products.forEach(product => product.style.display = '');
    }
});

// Optional: Allow pressing "Enter" to trigger the search
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

// Add to cart functionality
let cart = [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Initialize cart from localStorage on page load
loadCart();
updateCartModal();

document.querySelectorAll('.btn-success').forEach(button => {
    button.addEventListener('click', (e) => {
        const productDiv = e.target.closest('.product');
        const productName = productDiv.querySelector('h5').innerText;
        const productPriceText = productDiv.querySelector('p').innerText;
        const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));

        cart.push({ name: productName, price: productPrice });
        saveCart();
        alert(`${productName} has been added to your cart!`);
        updateCartModal();
    });
});

function updateCartModal() {
    const cartItemsList = document.getElementById('cartItemsList');
    const totalPriceElement = document.getElementById('totalPrice');
    cartItemsList.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - Ksh ${item.price}`;
        cartItemsList.appendChild(listItem);
        totalPrice += item.price; // Calculate total price
    });

    totalPriceElement.innerText = `Total Price: Ksh ${totalPrice}`;
}


  
// Cart icon click event to open the modal
document.querySelector('.cart button').addEventListener('click', () => {
    updateCartModal(); // Update the cart modal with current cart items
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show(); // Show the cart modal
});

// Navbar links redirect to jeans section
document.querySelectorAll('.navBottom ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const jeansSection = document.getElementById('jeans');
        if (jeansSection) {
            jeansSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize
fetchProducts();





