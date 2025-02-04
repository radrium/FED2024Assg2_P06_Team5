document.addEventListener('DOMContentLoaded', function() {
    const APIKEY = '67a1c864c5f8d453aae4d4fe'
    //create submit form listener
    document.getElementById("signup-submit").addEventListener("click", function(e) {
        e.preventDefault();

        //get the form data
        let userName = document.getElementById("signup-username").value;
        let phone = document.getElementById("signup-phone").value;
        let email = document.getElementById("signup-email").value;
        let password = document.getElementById("signup-password").value;
        let confirmPassword = document.getElementById("signup-confirm-password").value;

        if (confirmPassword !== password) {
            alert("Passwords do not match");
            return;
        }
    
        //get form values when submit button is clicked
        let jsondata = {
            "username": userName,
            "number": phone,
            "email": email,
            "password": password,
        };
    
        //create our AJAX settings.
        let settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': APIKEY,
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(jsondata),
            beforeSend: function() {
                //disable the submit button
                document.getElementById("signup-submit").disabled = true;
            }
        }
        fetch("https://fedassg2-3250.restdb.io/rest/user-data", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("signup-submit").disabled = false;
                //reset the form
                document.getElementById("signup-username").value = "";
                document.getElementById("signup-phone").value = "";
                document.getElementById("signup-email").value = "";
                document.getElementById("signup-password").value = "";
                document.getElementById("signup-confirm-password").value = "";
                alert("Sign up successful");
            });
        });
    });