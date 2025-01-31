document.addEventListener('DOMContentLoaded', function() {
    const APIKEY = '6796f154f9d2bbc852181e24'; // Define APIKEY here
    
    document.getElementById("login-submit").addEventListener("click", function(e) {
        e.preventDefault();

        // Get the form data
        let userName = document.getElementById("login-username").value; // Match the id in HTML
        let password = document.getElementById("login-password").value;

        // Validation
        if (!userName || !password) {
            alert("Please enter your username and password.");
            return;
        }

        // Disable the submit button before sending request
        document.getElementById("login-submit").disabled = true;

        let settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': APIKEY,
                'Cache-Control': 'no-cache'
            }
        }

        fetch("https://fedassg2-2419.restdb.io/rest/user-data", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let userExists = false;
                let loggedInUser = null;
                for (let user of data) {
                    if (user.username === userName && user.password === password) {
                        userExists = true;
                        loggedInUser = user;
                        break;
                    }
                }
                
                if (userExists === true) {
                    console.log("Login successful");
                    alert("Login successful");
                    
                    // Store user data in localStorage
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

                    document.getElementById('login-btn').style.display = 'none';
                    document.getElementById('signup-btn').style.display = 'none';
                    document.getElementById('icon-btn').style.display = 'block';
                    window.location.href = "../index.html";  // Redirect to homepage on successful login
                } else {
                    console.log("Login failed");
                    alert("Login failed, invalid username or password.");
                }

                // Re-enable the submit button after the login process
                document.getElementById("login-submit").disabled = false;
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("login-submit").disabled = false;
                alert("An error occurred during login");
            });
    });
});

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUser) {
    console.log('User is logged in:', loggedInUser);
    // Update UI based on logged-in user
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('signup-btn').style.display = 'none';
    document.getElementById('icon-btn').style.display = 'block';
    document.getElementById('signout-btn').style.display = 'block';
} else {
    // Update UI for logged-out user
    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('signup-btn').style.display = 'block';
    document.getElementById('icon-btn').style.display = 'none';
    document.getElementById('signout-btn').style.display = 'none';
}

document.getElementById('signout-btn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    alert('You have been signed out.');
    // Update UI after sign out
    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('signup-btn').style.display = 'block';
    document.getElementById('icon-btn').style.display = 'none';
    document.getElementById('signout-btn').style.display = 'none';
});