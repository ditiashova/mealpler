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
                } else {
                    //
                }
            }, function(error) {
                console.log(error);
            });
        };

        window.addEventListener('load', function() {
            initApp()
        });
});

