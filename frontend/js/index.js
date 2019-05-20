//Standart buttons
document.getElementById('registracija').addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        window.open('registration/index.html', "_self");
    }

});

document.getElementById('paieska').addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        window.open('search/index.html', "_self");
    }

});

document.getElementById('meistras').addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        window.open('staff/index.html', "_self");
    }

});

//Modal login buttons
document.getElementById('login_create_user').addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        $('#create_user_modal').modal('show');
        $('#login_modal').modal('hide');
    }
});
document.getElementById('login_forgot_password').addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        alert("Your new password was sent to email")
    }
});

//Modal create user buttons
document.getElementById('create_user_back').addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        $('#create_user_modal').modal('hide');
        $('#login_modal').modal('show');
    }
});