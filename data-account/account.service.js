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
    'accountExceptionCatcherService'
];

function accountService($http, accountResponseHandlerCatcherService, accountValidatorService, accountExceptionCatcherService) {
    // Global Variables
    var SERVER_URL = 'http://localhost:8080';
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
        ARRAY : {
            USER : accountValidatorService.responseValidator
                        .userAccountValidator
                        .validateArray,
            DOCTOR : accountValidatorService.responseValidator
                        .doctorAccountValidator
                        .validateArray,
            ADMIN : accountValidatorService.responseValidator
                        .adminAccountValidator
                        .validateArray
        },
        OBJECT : {
            USER : accountValidatorService
                         .responseValidator
                         .userAccountValidator
                         .validateObject,
            DOCTOR : accountValidatorService
                         .responseValidator
                         .doctorAccountValidator
                         .validateObject,
            ADMIN : accountValidatorService
                         .responseValidator
                         .adminAccountValidator
                         .validateObject
        }
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
        readArbitraryAccountByEmail     :  readArbitraryAccountByEmail
    };
    return service;

    /*
     * public functions
     */

    function readArbitraryAccount(accountId) {
        if (!angular.isString(accountId) || !accountId) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, accountId);

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.GET, url, null, VALIDATOR.ARRAY, VALIDATOR.OBJECT);
    }

    function readArbitraryAccountByUsername(username) {
        if (!angular.isString(username) || !username) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        url += '?username=' + username;

        return getHttpPromise(HTTP_METHOD.GET, url, null, VALIDATOR.ARRAY, VALIDATOR.OBJECT);
    }

    function readArbitraryAccountByEmail(email) {
        if (!angular.isString(email) || !email) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        url += '?email=' + email;

        return getHttpPromise(HTTP_METHOD.GET, url, null, VALIDATOR.ARRAY, VALIDATOR.OBJECT);
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
    function assembleURL(SERVER_URL, accountId) {
        if (!angular.isString(SERVER_URL) ||
            !angular.isString(accountId)) {
            return '';
        }

        // SERVER_URL == ''
        if (!SERVER_URL)
            return '';

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
    function getHttpPromise(method, url, account, VALIDATE_ARRAY, VALIDATE_OBJECT) {
        if (method === HTTP_METHOD.GET) {
            return $http.get(url)
                        .then(
                            (function (validateArray, validateObject) {
                                return function(response) {
                                    var arrayCallback;
                                    var objectCallback;

                                    if (!angular.isObject(response) || response === null)
                                        return null;

                                    if (!angular.isObject(response.data) || response.data === null)
                                        return null;

                                    if (response.data.user_type === USER_TYPE.USER) {
                                        arrayCallback = validateArray.USER;
                                        objectCallback = validateObject.USER;
                                    } else if (response.data.user_type === USER_TYPE.DOCTOR) {
                                        arrayCallback = validateArray.DOCTOR;
                                        objectCallback = validateObject.DOCTOR;
                                    } else if (response.data.user_type === USER_TYPE.ADMIN) {
                                        arrayCallback = validateArray.ADMIN;
                                        objectCallback = validateObject.ADMIN;
                                    } else {
                                        return null;
                                    }

                                    return REQ_COMPLETED_CALLBACK.GET(response, arrayCallback, objectCallback);
                                };
                            })(VALIDATE_ARRAY, VALIDATE_OBJECT)
                        )
                        .catch(RES_FAILED_CALLBACK);
        }

        // wrong HTTP method
        throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
    }
}