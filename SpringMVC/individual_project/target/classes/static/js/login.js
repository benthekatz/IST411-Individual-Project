var auth2;
var loginStatus;

var initClient = function () {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: 'CLIENT_ID.apps.googleusercontent.com'
        });

        auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
    });

    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        loginStatus = true;
    } else {
        loginStatus = false;
    }
};

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    loginStatus = true;
}

var onSuccess = function (user) {
    console.log('Signed in as ' + user.getBasicProfile().getName());
};

var onFailure = function (error) {
    console.log(error);
};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        loginStatus = false;
    });
}

$("#canvas").mousedown(function (e) {
    if(!loginStatus) {
        alert("You must sign in to use the canvas");
    }
});