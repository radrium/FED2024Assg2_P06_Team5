document.addEventListener('DOMContentLoaded', function() {
  const APIKEY = '67a1c864c5f8d453aae4d4fe';
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  document.getElementById("update-feedback-container").style.display = "none";
  document.getElementById("add-update-msg").style.display = "none";

  function getFeedbacksAdmin(limit = 10, all = true) {
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

        // We loop through the response and create a new row for each feedback
        for (var i = 0; i < response.length && i < limit; i++) {
          // We create a new row for each feedback
          content += `<tr id='${response[i]._id}'>
            <td>${response[i].feedback_id}</td>
            <td>${response[i].username}</td>
            <td>${response[i].email}</td>
            <td>${response[i].message}</td>
            <td>${response[i].reply}</td>
            <td>${response[i].status}</td>
            <td><a href='#update-feedback-container' class='update' 
            data-id='${response[i]._id}'
            data-feedback-id='${response[i].feedback_id}' 
            data-name='${response[i].username}' 
            data-topic='${response[i].topic}'
            data-email='${response[i].email}' 
            data-msg='${response[i].message}' 
            data-reply='${response[i].reply}'>Update</a></td></tr>`;
        }

        // We insert the new rows into our table
        document.getElementById("admin-feedback-list").getElementsByTagName("tbody")[0].innerHTML = content;
        document.getElementById("admin-Feedbacks").innerHTML = response.length;
      });
  }

  function getFeedbacksUser(limit = 10, all = true) {
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

        // We loop through the response and create a new row for each feedback
        for (var i = 0; i < response.length && i < limit; i++) {
          // We create a new row for each feedback
          if (response[i].username === loggedInUser.username) {
            content += `<tr id='${response[i]._id}'>
            <td>${response[i].feedback_id}</td>
            <td>${response[i].topic}</td>
            <td>${response[i].message}</td>
            <td>${response[i].reply}</td>
            <td>${response[i].status}</td>
            <td>${response[i].rating}</td>
            <td><a href='#update-feedback-container' class='update' 
            data-id='${response[i]._id}'
            data-feedback-id='${response[i].feedback_id}' 
            data-name='${response[i].username}' 
            data-topic='${response[i].topic}'
            data-email='${response[i].email}' 
            data-msg='${response[i].message}' 
            data-reply='${response[i].reply}'>Update</a></td>
            <td>Rate</td></tr>`
            
          }
        }

        // We insert the new rows into our table
        document.getElementById("feedback-list").getElementsByTagName("tbody")[0].innerHTML = content;
        document.getElementById("Feedbacks").innerHTML = response.length;
      });
  }

  if (loggedInUser.username === 'admin') {
    document.querySelector('.admin-panel').style.display = 'block';
    document.querySelector('.user-panel').style.display = 'none';
    getFeedbacksAdmin();

    document.getElementById("admin-feedback-list").addEventListener("click", function (e) {
      if (e.target.classList.contains("update")) {
        e.preventDefault();
        // Update our update form values
        let feedbackId = e.target.getAttribute("data-id");
        let feedbackName = e.target.getAttribute("data-name");
        let feedbackEmail = e.target.getAttribute("data-email");
        let feedbackTopic = e.target.getAttribute("data-topic");
        let feedbackMsg = e.target.getAttribute("data-msg");
        console.log(e.target.getAttribute("data-id"));

        // Load in our data from the selected row and add it to our update feedback form 
        document.getElementById("update-feedback-id").value = feedbackId;
        document.getElementById("update-feedback-name").value = feedbackName;
        document.getElementById("update-feedback-email").value = feedbackEmail;
        document.getElementById("update-feedback-topic").value = feedbackTopic;
        document.getElementById("update-feedback-msg").value = feedbackMsg;
        document.getElementById("update-feedback-container").style.display = "block";
      }
    });

    document.getElementById("update-feedback-submit").addEventListener("click", function (e) {
      e.preventDefault();
      // Retrieve all my update form values
      let feedbackId = document.getElementById("update-feedback-id").value;
      let feedbackReply = document.getElementById("update-reply-msg").value;
      let feedbackStatus = document.getElementById("update-feedback-status").value;

      document.getElementById("update-feedback-submit").disabled = true;

      let settings = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'x-apikey': APIKEY,
              'Cache-Control': 'no-cache'
          }
      };

      fetch("https://fedassg2-3250.restdb.io/rest/feedback-form", settings)
      .then(response => response.json())
      .then(data => {
        let feedback = data.find(u => u._id === feedbackId); 
        if (feedback) {
          feedback.reply = feedbackReply;
          feedback.status = feedbackStatus;

          let updateSettings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': APIKEY,
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(feedback)
          };

          fetch(`https://fedassg2-3250.restdb.io/rest/feedback-form/${feedbackId}`, updateSettings)
          .then(response => response.json())
          .then(updatedData => {
            console.log(updatedData);
            document.getElementById("update-feedback-submit").disabled = false;
            document.getElementById("update-feedback-container").style.display = "none";
            document.getElementById("add-update-msg").style.display = "block";
            document.getElementById("add-update-msg").innerHTML = "Feedback updated successfully!";
            if (loggedInUser.username === 'admin') {
              getFeedbacksAdmin();
            } else {
              getFeedbacksUser();
            }
          });
        }
      });
    });
  } else {
      document.querySelector('.admin-panel').style.display = 'none';
      document.querySelector('.user-panel').style.display = 'block';
      getFeedbacksUser();
  }
});

function loginUser(user) {
  // Assuming `user` is the logged-in user object
  localStorage.setItem('loggedInUser', JSON.stringify(user));
}
