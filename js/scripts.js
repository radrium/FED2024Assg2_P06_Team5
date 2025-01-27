document.addEventListener('DOMContentLoaded', function() {
    const APIKEY = '6796f154f9d2bbc852181e24'
    //create submit form listener
    document.getElementById("login-submit").addEventListener("click", function(e) {
        e.preventDefault();

        //get the form data
        let userName = document.getElementById("signup-username").value;
        let phone = document.getElementById("signup-phone").value;
        let email = document.getElementById("signup-email").value;
        let password = document.getElementById("signup-password").value;
        
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
                alert("test");
                //disable the submit button
                document.getElementById("login-submit").disabled = true;
                //reset the form
                document.getElementById("signup-username").reset();
                document.getElementById("signup-phone").reset();
                document.getElementById("signup-email").reset();
                document.getElementById("signup-password").reset();
            }
        }
        fetch("https://fedassg2-2419.restdb.io/rest/user-signup-data", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("login-submit").disabled = false;
            });
        });
    });