const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUser) {
    console.log('User is logged in:', loggedInUser);
    // Update UI based on logged-in user
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('signup-btn').style.display = 'none';
    document.getElementById('icon-btn').style.display = 'block';
    document.getElementById('signout-btn').style.display = 'block';
}

document.getElementById('signout-btn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    alert('You have been signed out.');
    // Update UI after sign out
    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('signup-btn').style.display = 'block';
    document.getElementById('icon-btn').style.display = 'none';
    document.getElementById('signout-btn').style.display = 'none';
});