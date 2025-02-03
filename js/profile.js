document.addEventListener('DOMContentLoaded', function() {
    const APIKEY = '6796f154f9d2bbc852181e24'; // Define APIKEY here
    
    document.getElementById("update-btn").addEventListener("click", function(e) {
        e.preventDefault();

        // Get the form data
        let userName = document.getElementById("username").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Disable the update button before sending request
        document.getElementById("update-btn").disabled = true;

        let settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': APIKEY,
                'Cache-Control': 'no-cache'
            }
        };

        fetch("https://fedassg2-2419.restdb.io/rest/user-data", settings)
        .then(response => response.json())
        .then(data => {
            // Find the user to update
            let user = data.find(u => u.email === email); // Adjust the condition if needed

            if (user) {
                // Update the user data
                user.username = userName;
                user.number = phone;
                user.email = email;
                user.password = password;

                let updateSettings = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey': APIKEY,
                        'Cache-Control': 'no-cache'
                    },
                    body: JSON.stringify(user) // Send updated user data in the body
                };

                // Send the updated user data
                fetch(`https://fedassg2-2419.restdb.io/rest/user-data/${user._id}`, updateSettings)
                .then(response => response.json())
                .then(updatedData => {
                    console.log(updatedData);
                    // Enable the update button after the request is sent
                    document.getElementById("update-btn").disabled = false;

                    // Reset the form
                    document.getElementById("username").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";

                    // Alert user that the data has been updated
                    alert("User data has been updated successfully");
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                    alert('Failed to update user data');
                    document.getElementById("update-btn").disabled = false;
                });
            } else {
                alert('User not found');
                document.getElementById("update-btn").disabled = false;
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('Failed to fetch user data');
            document.getElementById("update-btn").disabled = false;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('icon-btn').style.display = 'block';
    } else {
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('signup-btn').style.display = 'block';
        document.getElementById('icon-btn').style.display = 'none';
    }

    document.getElementById('signout-btn').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        alert('You have been signed out.');
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('signup-btn').style.display = 'block';
        document.getElementById('icon-btn').style.display = 'none';
    });
});