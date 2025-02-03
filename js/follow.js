let url = 'https://randomuser.me/api/';

document.getElementById('next-user').addEventListener('click', function(){
//insert and modify to your needs
  fetch(url)
    .then(response => response.json()) 
    .then(function(data){
      const user = data.results[0];
      console.log(data)
      console.log(user.name)
      document.getElementById('avatar').src = user.picture.medium;
      document.getElementById('fullname').textContent = `${user.name.first} ${user.name.last}`;
      document.getElementById('username').textContent = user.login.username;
      document.getElementById('email').textContent = user.email;
      document.getElementById('city').textContent = user.location.city;
    });
});