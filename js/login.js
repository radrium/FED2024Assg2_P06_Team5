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
                for (let user of data) {
                    if (user.username === userName && user.password === password) {
                        userExists = true;
                        break;
                    }
                }

                if (userExists === true) {
                    console.log("Login successful");
                    alert("Login successful");
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
