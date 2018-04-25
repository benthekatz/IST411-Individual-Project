//google login
var auth2;
var loginStatus;
var timeoutStatus;

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

        auth2.attachClickHandler('signin-button', {}, onSignIn, onFailure);
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

    loginStatus = true;
    $(".collapse").collapse("show");
    modal.style.display = "none";

    var userId = profile.getId();
    var ref = firebase.database().ref("users/" + userId);
    var timeout;
    ref.once("value", function (snapshot) {
        timeout = snapshot.child("timeout_active").val();
        if (timeout === true) {
            timeoutStatus = true;
            lock(userId);
        } else {
            timeoutStatus = false;
            unlock(userId);
        }
    }, function (error) {
        console.log("Error: " + error.code);
    });

    writeUserData(profile.getId(), profile.getName(), profile.getEmail(), profile.getImageUrl(), timeoutStatus);
}

function unlock(userId) {
    timeoutStatus = false;
    timeoutModal.style.display = "none";

    firebase.database().ref('users/' + userId).update({
        timeout_active: timeoutStatus
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
    timeoutStatus = true;
    timeoutModal.style.display = "block";

    firebase.database().ref('users/' + userId).update({
        timeout_active: timeoutStatus
    });

    timeoutTimer.start({countdown: true, startValues: {seconds: 30}});
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
    $(".collapse").collapse("hide");
    drawingTimer.stop();
    $('#drawingTimer .values').html("");
    auth2.signOut().then(function () {
        loginStatus = false;
        console.log('User signed out.');
    });
}

close.onclick = function () {
    modal.style.display = "none";
};

function writeUserData(userId, name, email, imageUrl, timeoutStatus) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl,
        timeout_active: timeoutStatus
    });
}

var hex = "#000000";
var drawingRef = firebase.database().ref('drawings');
var newDrawingRef = drawingRef.push();
var mouseOn = false;
var tempDrawing = [];

$("#canvas").mousedown(function (e) {
    mouseOn = true;
    var x = e.pageX - $(this).offset().left;
    var y = parseInt(e.pageY - $(this).offset().top);

    if (!loginStatus) {
        modal.style.display = "block";
    } else if (loginStatus && !timeoutStatus) {
        tempDrawing.push(x, y);
        startDrawing();
    }


});

function startDrawing() {
    $("#canvas").mousemove(function (e) {
        var x = e.pageX - $(this).offset().left;
        var y = parseInt(e.pageY - $(this).offset().top);

        if (mouseOn) {
            tempDrawing.push(x, y);
        }
    });

    $("#canvas").mouseup(function (e) {
        var x = e.pageX - $(this).offset().left;
        var y = parseInt(e.pageY - $(this).offset().top);
        var width;
        if ($("#select-width").val() === null) {
            width = 1;
        } else {
            width = $("#select-width").val();
        }
        
        tempDrawing.push(x, y);

        drawingRef.push({
            points: tempDrawing,
            color: hex,
            width: width
        });

        mouseOn = false;
        tempDrawing = [];
    });
}



$("#canvas").mouseleave(function (e) {
    mouseOn = false;
    //endDrawing();
});
