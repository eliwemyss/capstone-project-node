function getUsername() {
    const username = sessionStorage.getItem('username')
    $('.username').html(username)
}

function login() {
    $('.login').submit((event) => {
        event.preventDefault();
        const user = username.value;
        const pass = password.value;
        const data = { username: `${user}`, password: `${pass}` };
        $.ajax({
            url: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(data),
            success: (response) => {
                alert('Login succesful, redirecting you to homepage ...');

                sessionStorage.setItem('jwtToken', response.jwtToken);
                sessionStorage.setItem('username', response.user.username)
                location.href = '/main.html';
            },

            error: (err) => {
                alert('Username or password does not match!')
            },

        });
    });
}





function submitNew() {
    $('.createAccount').submit((event) => {
        event.preventDefault();
        const user = newusername.value;
        const pass = newpassword.value;
        const name = newname.value;
        const data = {
            username: `${user}`, password: `${pass}`, name: `${name}`,
        };
        $.ajax({
            url: '/api/users',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(data),
            success: (response) => {
                alert('Account successfully created. Redirecting to login...')
                location.href = '/login.html'
            },

            error: (err) => {

            },

        });
    });
}


$(login);
$(submitNew);
$(getUsername)
