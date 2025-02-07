document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('sidenav-login-btn').style.display = 'none';
        document.getElementById('sidenav-signup-btn').style.display = 'none';
        document.getElementById('icon-btn').style.display = 'block';
    } else {
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('signup-btn').style.display = 'block';
        document.getElementById('sidenav-login-btn').style.display = 'block';
        document.getElementById('sidenav-signup-btn').style.display = 'block';
        document.getElementById('icon-btn').style.display = 'none';
    }

    const signoutBtn = document.getElementById('signout-btn');
    if (signoutBtn) {
        signoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            alert('You have been signed out.');
            document.getElementById('login-btn').style.display = 'block';
            document.getElementById('signup-btn').style.display = 'block';
            document.getElementById('sidenav-login-btn').style.display = 'block';
            document.getElementById('sidenav-signup-btn').style.display = 'block';
            document.getElementById('icon-btn').style.display = 'none';
        });
    }

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-bar');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        filterProducts();
    });

    function filterProducts() {
        const query = searchInput.value.toLowerCase();
        const categories = document.querySelectorAll('.category-section');
        
        categories.forEach(category => {
            const products = category.querySelectorAll('.product-gallery article');
            let anyProductVisible = false; // Flag to check if any product in the category is visible

            products.forEach(product => {
                const productName = product.querySelector('img').alt.toLowerCase();
                
                // Check if product matches search query
                const isSearchMatch = productName.includes(query);
                
                if (isSearchMatch) {
                    product.style.display = 'block'; // Show product
                    anyProductVisible = true; // At least one product matches
                } else {
                    product.style.display = 'none'; // Hide product
                }
            });

            // Hide category section if no products are visible
            if (anyProductVisible) {
                category.style.display = 'block'; // Show category section
            } else {
                category.style.display = 'none'; // Hide category section
            }
        });
    }
});

function loginUser(user) {
    // Assuming `user` is the logged-in user object
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
} 