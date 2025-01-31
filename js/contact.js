document.addEventListener('DOMContentLoaded', function() {
    const APIKEY = '6796f154f9d2bbc852181e24'
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

        //get form values when submit button is clicked
        let jsondata = {
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
        fetch("https://fedassg2-2419.restdb.io/rest/feedback-form", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("contact-form-submit").disabled = false;
                //reset the form
                document.getElementById("first_name").value = "";
                document.getElementById("last_name").value = "";
                document.getElementById("number").value = "";
                document.getElementById("email").value = "";
                document.getElementById("topic").value = "";
                document.getElementById("message").value = "";
                alert("Feedback submitted successfully");
            });
        });
    });