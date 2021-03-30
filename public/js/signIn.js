function signIn() {
    console.log('test')
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider)

    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        console.log('result')
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log('USER', user)
        window.location = 'noteForm.html';
    }).catch((error) => {
        // Handle Errors here.
        console.log('ERROR!')
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}