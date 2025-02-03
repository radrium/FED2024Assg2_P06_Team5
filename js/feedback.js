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