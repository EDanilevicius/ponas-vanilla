//Modal popup
$(window).on('load', function () {
    if (localStorage.getItem("x-auth") === null) {
        $('#login_modal').modal('show');
    } else {
        $('#login_modal').modal('hide');
    }
});

//Create user//////////////////////////////////////////////////////////
function createUser() {
    const url = "http://localhost:3000/api/user";
    const staffNameValue = document.getElementById("create_staff-name").value;
    const passwordValue = document.getElementById("create_staff-password").value;
    const emailValue = document.getElementById("staff-email").value;

    let data = {
        staff_name: staffNameValue,
        password: passwordValue,
        email: emailValue
    };
    console.log(data)

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(function (response) {
            if (response.code === 11000) {
                //create modal with js
                $('#staff_user_exists').modal('show');
                $('#create_user_modal').modal('hide');

            } else {
                $('#create_user_modal').modal('hide');
                $('#login_modal').modal('show');
            }
            console.log(response);
        })
        .catch(error => console.error('Error:', error));
};

document.getElementById("create_user").addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        createUser();
    }
});
document.getElementById("staff_user_exists_close").addEventListener('click', event => {
    $('#create_user_modal').modal('show');
});

// Log in function////////////////////////////////////////////////////
function login() {
    const url = "http://localhost:3000/api/login";
    const staffNameValue = document.getElementById("create_staff-name").value;
    const passwordValue = document.getElementById("staff-password").value;
    let data = {
        staff_name: staffNameValue,
        password: passwordValue,
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            if (token = response.headers.get("x-auth") === null) {
                alert("Incorrect password or username")
            } else {
                token = response.headers.get("x-auth");
                console.log(response.headers.get("x-auth").toString());
                window.localStorage.setItem("x-auth", token);

                window.localStorage.setItem("user", staffNameValue);
                $('#login_modal').modal('hide');
                location.reload();

                return response.json();
            }
        })
        .then(function (responseAsJson) {
            console.log(responseAsJson);
        })
        .catch(error => console.error("Error:", error));
};

document.getElementById("login_user_button").addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        login();
    }
});

//Log out function///////////////////////////////////////////////////
function logout(url = 'http://localhost:3000/api/logout') {
    let token = localStorage.getItem("x-auth");
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': token
        }
    }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    token = null;
    window.localStorage.clear();
    $('#login_modal').modal('show');
};
document.getElementById("logout").addEventListener('click', event => {
    if (event.target.tagName === "BUTTON") {
        logout();
    }
});