/*
 * Account Data Service for Blog System
 */

//module getter
angular
    .module('data.account')
    .factory('accountService', accountService);

accountService.$inject = [
    '$http',
    'accountResponseHandlerCatcherService',
    'accountValidatorService',
    'accountExceptionCatcherService',
    'valueService'
];

function accountService($http, accountResponseHandlerCatcherService, accountValidatorService, accountExceptionCatcherService, valueService) {
    // Global Variables
    var SERVER_URL = valueService.SERVER_URL.ACCOUNT;
    var HTTP_METHOD = {
        GET : 'GET',
        POST : 'POST',
        PUT : 'PUT',
        PATCH : 'PATCH',
        DELETE : 'DELETE'
    };

    var USER_TYPE = {
        USER   : 'USER',
        DOCTOR : 'DOCTOR',
        ADMIN  : 'ADMIN'
    };

    var VALIDATOR = {
        ARRAY : accountValidatorService.responseValidator
                        .arbitraryAccountValidator
                        .validateArray,
        OBJECT : accountValidatorService
                        .responseValidator
                        .arbitraryAccountValidator
                        .validateObject
    };
    var RES_FAILED_CALLBACK = accountResponseHandlerCatcherService.requestFailed;
    var REQ_COMPLETED_CALLBACK = {
        GET : accountResponseHandlerCatcherService.getRequestCompleted,
        POST : accountResponseHandlerCatcherService.postRequestCompleted,
        PUT : accountResponseHandlerCatcherService.putRequestCompleted,
        PATCH : accountResponseHandlerCatcherService.patchRequestCompleted,
        DELETE : accountResponseHandlerCatcherService.deleteRequestCompleted
    };

    var service = {
        readArbitraryAccount            :  readArbitraryAccount,
        readArbitraryAccountByUsername  :  readArbitraryAccountByUsername,
        readArbitraryAccountByEmail     :  readArbitraryAccountByEmail,

        /* read all */
        readAllAccount                  :  readAllAccount,

        /* delete all */
        deleteAllAccount                :  deleteAllAccount
    };
    return service;

    /*
     * public functions
     */

    function readArbitraryAccount(accountId) {
        if (!angular.isString(accountId) || !accountId) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, true, accountId);

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.GET, url, null, VALIDATOR.ARRAY, VALIDATOR.OBJECT);
    }

    function readArbitraryAccountByUsername(username) {
        if (!angular.isString(username) || !username) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, true, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        url += '?username=' + username;

        return getHttpPromise(HTTP_METHOD.GET, url, null, VALIDATOR.ARRAY, VALIDATOR.OBJECT);
    }

    function readArbitraryAccountByEmail(email) {
        if (!angular.isString(email) || !email) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, true, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        url += '?email=' + email;

        return getHttpPromise(HTTP_METHOD.GET, url, null, VALIDATOR.ARRAY, VALIDATOR.OBJECT);
    }

    function readAllAccount() {
        var url = assembleURL(SERVER_URL, false, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.GET, url, null, VALIDATOR.ARRAY, VALIDATOR.OBJECT);
    }

    function deleteAllAccount() {
        var url = assembleURL(SERVER_URL, false, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.DELETE, url, null, VALIDATOR.ARRAY, VALIDATOR.OBJECT);
    }

    /*
     * private functions
     */

    /*
     * @desc Assemble url based on server's url and account id
     * @param {String} SERVER_URL server's url
     * @param {String} accountId the account id. if not needed, set to ''
     * @returns {String}  the assembled url
     */
    function assembleURL(SERVER_URL, isArbitrary, accountId) {
        if (!angular.isString(SERVER_URL) ||
            !angular.isString(accountId)) {
            return '';
        }

        // SERVER_URL == ''
        if (!SERVER_URL)
            return '';

        if (!isArbitrary)
            return SERVER_URL + '/accounts';

        var assembledUrl = SERVER_URL + '/accounts/arbitrarys';

        // accountId == ''
        if (!accountId)
            return assembledUrl;

        assembledUrl += '/' + accountId;

        return assembledUrl;
    }

    /*
     * @desc Get a $http promise based on the HTTP method, url and
     *       the user account object
     * @param {String} method HTTP method (GET, POST ..., etc)
     * @param {String} url the assembled url
     * @param {Object} account the account object
     * @returns {Object} a $http promise with callbacks set
     */
    function getHttpPromise(method, url, account, validateArray, validateObject) {
        if (method === HTTP_METHOD.GET) {
            return $http.get(url)
                    .then(
                        (function (validateArray, validateObject) {
                            return function(response) {
                                return REQ_COMPLETED_CALLBACK.GET(response, validateArray, validateObject);
                            };
                        })(validateArray, validateObject)
                    )
                    .catch(RES_FAILED_CALLBACK);
        } else if (method === HTTP_METHOD.DELETE) {
            return $http.delete(url)
                    .then(
                        (function (validateArray, validateObject) {
                            return function(response) {
                                return REQ_COMPLETED_CALLBACK.DELETE(response, validateArray, validateObject);
                            };
                        })(validateArray, validateObject)
                    )
                    .catch(RES_FAILED_CALLBACK);
        }

        // wrong HTTP method
        throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
    }
}