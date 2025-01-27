document.addEventListener('DOMContentLoaded', function() {
    const APIKEY = '6796f154f9d2bbc852181e24'
    //create submit form listener
    document.getElementById("login-submit").addEventListener("click", function(e) {
        e.preventDefault();

        //get the form data
        let userName = document.getElementById("login-username").value;
        let password = document.getElementById("login-password").value;

        //get form values when submit button is clicked
        let jsondata = {
            "username": userName,
            "password": password
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
                document.getElementById("login-submit").disabled = true;
                //reset the form
                document.getElementById("login-username").reset();
                document.getElementById("login-password").reset();
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