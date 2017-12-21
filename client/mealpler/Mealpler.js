let Mealpler = angular.module('Mealpler', ['ngAnimate', 'ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls', 'firebase']);
Mealpler.
    /*config(function ($routeProvider) {
        $routeProvider
            .when('/',
                {
                    templateUrl: 'scripts/dashboard/dashboard.html',
                    controller: 'DashboardCtrl',
                    controllerAs: 'dashboard'
                })
            .otherwise({redirectTo: '/'});
}).*/
    config(function() {
        moment.locale('dow', {
            week : {
                dow: 1,
            }
        });
        moment.locale('dow');
}).
    config(function () {
        // Initialize Firebase
        var config = {
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
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };

        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);


        initApp = function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var uid = user.uid;
                    var phoneNumber = user.phoneNumber;
                    var providerData = user.providerData;
                    user.getIdToken().then(function(accessToken) {
                        //document.getElementById('sign-in-status').textContent = 'Signed in';
                        //document.getElementById('sign-in').textContent = 'Sign out';
                        document.getElementById('user-photo').style.backgroundImage  = "url(" + photoURL +")";
                        document.getElementById('user-name').textContent  = 'Hello, ' + displayName;
                        document.getElementById('login-link').style.display  = 'none';
                        document.getElementById('logout-link').style.display  = 'inline'
                        /*document.getElementById('account-details').textContent = JSON.stringify({
                            displayName: displayName,
                            email: email,
                            emailVerified: emailVerified,
                            phoneNumber: phoneNumber,
                            photoURL: photoURL,
                            uid: uid,
                            accessToken: accessToken,
                            providerData: providerData
                        }, null, '  ')*/;
                    });
                } else {
                    // User is signed out.
                    //document.getElementById('sign-in-status').textContent = 'Signed out';
                    //document.getElementById('sign-in').textContent = 'Sign in';
                    //document.getElementById('account-details').textContent = 'null';
                    document.getElementById('user-photo').style.display  = 'none';
                    document.getElementById('user-name').style.display  = 'none';
                    document.getElementById('login-link').style.display  = 'inline';
                    document.getElementById('logout-link').style.display  = 'none'
                }
            }, function(error) {
                console.log(error);
            });
        };

        window.addEventListener('load', function() {
            initApp()
        });
});

