Mealpler.config(() => {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyDNk1AEYY2DVSZ4aU2l-aF7tG_KkVg8oBE",
        authDomain: "mealpler-app.firebaseapp.com",
        databaseURL: "https://mealpler-app.firebaseio.com",
        projectId: "mealpler-app",
        storageBucket: "mealpler-app.appspot.com",
        messagingSenderId: "796771168878"
    };
    firebase.initializeApp(config);

    // FirebaseUI config.
    var uiConfig = {
        callbacks: {
            signInSuccess: function(currentUser, credential, redirectUrl) {
                // Do something.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                //document.getElementById('loader').style.display = 'none';
            }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        // Query parameter name for mode.
        queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);


    /*const initApp = function() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
            } else {
                //
            }
        }, (error) => console.log(error));
    };

    window.addEventListener('load', function() {
        initApp()
    });*/
});