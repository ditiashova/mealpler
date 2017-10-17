angular.module('requestSrvc', [], ['$provide', function ($provide) {
    $provide.factory('request', ['$http', '$rootScope', '$location', function(http, rootScope, location) {
        let requestInstance;
        requestInstance = function(scope, security, url, data, onSuccess, onError, suppressNotification, requestId, authToken) {
            scope.processingRequest = true;
            http({
                method: data == undefined ? 'GET' : 'POST',
                url: location.protocol() + "://" + location.host() + ":" + location.port() + (!scope.realm || scope.realm=="empty" ? "" : scope.realm) + rootScope.param['gateway'] + security + '/' + url,
                headers: {'auth-token': authToken ? authToken : localStorage.getItem("auth-token")},
                data: data
            }).then(function (response) {
                    if (onSuccess) {
                        try {
                            onSuccess(response.data, response.status, response.headers, response.config, requestId);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    scope.processingRequest = false;
            }).catch(function (response) {
                scope.processingRequest = false;
                if (response.status == 403 && !authToken) {
                    scope.logout();
                } else if (response.status == 503) {
                    for (var i = 0; i < response.data.errors.length; i++) {
                        if ("SYSTEM_DISABLED" in response.data.errors[0]) {

                        } else {

                        }
                    }
                } else {
                    console.log(response.data);
                    if (onError) {
                        onError(response.data, requestId, response.status);
                    }
                }
            });
        }
        return requestInstance;
    }]);
}]);
