//google login
var auth2;
var loginStatus;

//login modal
var modal = document.getElementById("loginModal");
var close = document.getElementsByClassName("close")[0];
var error = document.getElementById("error");

//timeout modal
var timeoutModal = document.getElementById("timeoutModal")

//firebase authentication
var provider = new firebase.auth.GoogleAuthProvider();

//firebase database instance
var database = firebase.database();

//timers
var drawingTimer = new Timer();
var timeoutTimer = new Timer();

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
    modal.style.display = "none";
    
    var userId = profile.getId();
    var ref = firebase.database().ref("users/" + userId);
    var timeout;
    ref.once("value", function (snapshot) {
        timeout = snapshot.child("timeout_active").val();
        if (timeout === true) {
            lock(userId);
        } else {
            unlock(userId);
        }
    }, function (error) {
        console.log("Error: " + error.code);
    });
}

function unlock(userId) {
    lockStatus = false;
    timeoutModal.style.display = "none";

    firebase.database().ref('users/' + userId).update({
        timeout_active: false
    });

    drawingTimer.start({countdown: true, startValues: {seconds: 30}});
    $('#drawingTimer .values').html(drawingTimer.getTimeValues().toString());
    drawingTimer.addEventListener('secondsUpdated', function (e) {
        $('#drawingTimer .values').html(drawingTimer.getTimeValues().toString());
    });
    drawingTimer.addEventListener('targetAchieved', function (e) {
        $('#drawingTimer .values').html("");
        lock(userId);
    });
}

function lock(userId) {
    lockStatus = true;
    timeoutModal.style.display = "block";

    firebase.database().ref('users/' + userId).update({
        timeout_active: true
    });

    timeoutTimer.start({countdown: true, startValues: {seconds: 60}});
    $('#timeoutTimer .values').html(timeoutTimer.getTimeValues().toString());
    timeoutTimer.addEventListener('secondsUpdated', function (e) {
        $('#timeoutTimer .values').html("You can draw in: " + timeoutTimer.getTimeValues().toString());
    });
    timeoutTimer.addEventListener('targetAchieved', function (e) {
        $('#timeoutTimer .values').html("");
        unlock(userId);
    });
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

        firebase.database().ref('users/' + userId).update({
            timeout_active: true
        });
        
        drawingTimer.stop();
        $('#drawingTimer .values').html("");
    });
}

$("#canvas").mousedown(function (e) {
    if (!loginStatus) {
        modal.style.display = "block";
    }
});

close.onclick = function () {
    modal.style.display = "none";
};

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl,
        timeout_active: false
    });
}

