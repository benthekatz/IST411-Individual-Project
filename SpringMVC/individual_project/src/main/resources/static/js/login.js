var auth2;
var loginStatus;
var modal = document.getElementById("loginModal");
var close = document.getElementsByClassName("close")[0];
var error = document.getElementById("error");


var initClient = function () {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: 'CLIENT_ID.apps.googleusercontent.com'
        });

        auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
    });

    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        loginStatus = true;
        alert(loginStatus);
    } else {
        loginStatus = false;
        alert(loginStatus);
    }
};

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    

    loginStatus = true;
    $(".collapse").collapse("show");
    modal.style.display = "none"
}

var onFailure = function (error) {
    error.style.display = "block";
};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        $(".collapse").collapse("hide");
        loginStatus = false;
    });
}

$("#canvas").mousedown(function (e) {
    if (!loginStatus) {
        modal.style.display = "block";
    }
});

close.onclick = function () {
    modal.style.display = "none";
}

