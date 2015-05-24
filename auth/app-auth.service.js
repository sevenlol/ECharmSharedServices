angular.module('app.auth')
       .factory('authService', authService);

authService.$inject = [
    '$http',
    '$window',
    'valueService'
];

function authService($http, $window, valueService) {
    var SERVER_URL = valueService.SERVER_URL.AUTH;
    var DEFAULT_CALLBACK = function() {};

    var service = {
        checkAuthStatus : checkAuthStatus,
        signIn          : signIn,
        signOut         : signOut,
        fbSignIn        : fbSignIn
    };
    return service;

    /* public functions */

    function checkAuthStatus(authedCallback, notAuthedCallback) {
        authenticate(null, authedCallback, notAuthedCallback);
    }

    function signIn(credentials, successCallback, failureCallback) {
        if (!angular.isObject(credentials) || credentials === null)
            return;

        if (!angular.isString(credentials.username) || !credentials.username)
            return;

        if (!angular.isString(credentials.password) || !credentials.password)
            return;

        authenticate(credentials, successCallback, failureCallback);
    }

    function signOut(successCallback, failureCallback) {
        var verifiedSuccessCallback = angular.isFunction(successCallback) ?
                                      successCallback :
                                      DEFAULT_CALLBACK;
        var verifiedFailureCallback = angular.isFunction(failureCallback) ?
                                      failureCallback :
                                      DEFAULT_CALLBACK;

        $http
            .post(SERVER_URL + '/logout')
            .success(verifiedSuccessCallback)
            .error(verifiedFailureCallback);
    }

    function fbSignIn(redirectUrl) {
        $window.location.href = SERVER_URL + '/auth/facebook';
    }

    /* private functions */

    function authenticate(credentials, successCallback, failureCallback) {
        var verifiedSuccessCallback = angular.isFunction(successCallback) ?
                                      successCallback :
                                      DEFAULT_CALLBACK;
        var verifiedFailureCallback = angular.isFunction(failureCallback) ?
                                      failureCallback :
                                      DEFAULT_CALLBACK;

        var headers = credentials ?
                      { authorization : "Basic " + btoa(credentials.username + ":" + credentials.password) } :
                      {};

        $http
            .get(SERVER_URL + '/user', {headers : headers})
            .success(verifiedSuccessCallback)
            .error(verifiedFailureCallback);
    }
}