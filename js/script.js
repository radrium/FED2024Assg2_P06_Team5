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
        // document.querySelector('.user-panel').style.display = 'none';
    }

    // alert('test');
    const signoutBtn = document.getElementById('signout-btn');
    if (signoutBtn) {
        signoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            alert('You have been signed out.');
            document.getElementById('login-btn').style.display = 'block';
            document.getElementById('signup-btn').style.display = 'block';
            document.getElementById('icon-btn').style.display = 'none';
        });
    }
});

function loginUser(user) {
    // Assuming `user` is the logged-in user object
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}