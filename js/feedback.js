document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser.username === 'admin') {
        document.querySelector('.admin-panel').style.display = 'block';
        document.querySelector('.user-panel').style.display = 'none';
    } else {
        document.querySelector('.admin-panel').style.display = 'none';
        document.querySelector('.user-panel').style.display = 'block';
    }
});

function loginUser(user) {
    // Assuming `user` is the logged-in user object
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

document.addEventListener("DOMContentLoaded", function () {
  // This is our API key
  const APIKEY = '67a1c864c5f8d453aae4d4fe';

  // We call our function to get our feedbacks
  getFeedbacks();
  document.getElementById("update-feedback-container").style.display = "none";

  // We add an event listener to our table
  function getFeedbacks(limit = 10, all = true) {
    let settings = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    }

    // We fetch our feedbacks from the database
    fetch("https://fedassg2-3250.restdb.io/rest/feedback-form", settings)
      .then(response => response.json())
      .then(response => {
        let content = "";

        // We loop through the response and create a new row for each contact
        for (var i = 0; i < response.length && i < limit; i++) {
          // We create a new row for each contact
          content = `${content}<tr id='${response[i]._id}'>
          <td>${response[i].username}</td>
          <td>${response[i].email}</td>
          <td>${response[i].message}</td>
          <td>${response[i].reply}</td>
          <td>${response[i].status}</td>
          <td><a href='#update-feedback-container' class='update' 
          data-id='${response[i]._id}' 
          data-name='${response[i].username}' 
          data-email='${response[i].email}' 
          data-msg='${response[i].message}' 
          data-reply='${response[i].reply}'
          data-status='${response[i].status}'>Update</a></td></tr>`;
        }

        // We insert the new rows into our table
        document.getElementById("feedback-list").getElementsByTagName("tbody")[0].innerHTML = content;
        document.getElementById("Feedbacks").innerHTML = response.length;
      });
  }
});
