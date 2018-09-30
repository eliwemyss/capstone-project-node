
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
                console.log(response)
                sessionStorage.setItem('token', response.token);
                location.href = '/main.html';
            },

            // error: (err) => {
            //     $('.alert').attr('aria-hidden', 'false').removeClass('hidden');
            // },

        });
    });
}


function selectLogin() {
    $('.landing').on('click', 'button.SelectLogin', () => {
        location.href = '/login.html';
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
                $('.createForm').addClass('hidden');
                $('.successful').removeClass('hidden');
            },

            error: (err) => {
                console.log(err);
                $('.alert').attr('aria-hidden', 'false').removeClass('hidden');
            },

        });
    });
}


$(login);
$(submitNew);
$(selectLogin);
