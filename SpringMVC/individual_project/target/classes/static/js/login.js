var auth2;
var loginStatus;
var modal = document.getElementById("loginModal");
var close = document.getElementsByClassName("close")[0];
var error = document.getElementById("error");

//firebase authentication
var provider = new firebase.auth.GoogleAuthProvider();

//firebase database instance
var database = firebase.database();

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
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    console.log('Google Auth Response', googleUser);
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        
        if (!isUserEqual(googleUser, firebaseUser)) {
            var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.getAuthResponse().id_token);
            firebase.auth().signInWithCredential(credential).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });
        } else {
            console.log('User already signed-in Firebase.');
        }
    });

    writeUserData(profile.getId(), profile.getName(), profile.getEmail(), profile.getImageUrl());

    loginStatus = true;
    $(".collapse").collapse("show");
    modal.style.display = "none"
}

function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                // We don't need to reauth the Firebase connection.
                return true;
            }
        }
    }
    return false;
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

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

