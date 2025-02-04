document.addEventListener('DOMContentLoaded', function() {
    const APIKEY = '67a19838c5f8d4c6e7e4d4e8'
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('You need to be logged in to submit the contact form.');
        return;
    }
    //create submit form listener
    document.getElementById("contact-form-submit").addEventListener("click", function(e) {
        e.preventDefault();
        
        //get the form data
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let topic = document.getElementById("topic").value;
        let message = document.getElementById("message").value;

        if (email === "" || phone === "" || topic === "" || message === "") {
            alert("Please fill in all the fields");
            return;
        }

        //get form values when submit button is clicked
        let jsondata = {
            "username": loggedInUser.username,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "number": phone,
            "topic": topic,
            "message": message,
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
                document.getElementById("contact-form-submit").disabled = true;
            }
        }
        fetch("https://fedassg2-105b.restdb.io/rest/feedback-form", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("contact-form-submit").disabled = false;
                //reset the form
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("email").value = "";
                document.getElementById("topic").value = "";
                document.getElementById("message").value = "";
                alert("Feedback submitted successfully");
            });
        });
    });