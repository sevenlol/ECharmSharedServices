/*
 * User Account Data Service for Blog System
 */

//module getter
angular
    .module('account')
    .factory('userAccountService', userAccountService);

userAccountService.$inject = [
	'$http',
	'accountResponseHandlerCatcherService',
	'accountValidatorService',
	'accountExceptionCatcherService'
];

function userAccountService($http, accountResponseHandlerCatcherService, accountValidatorService, accountExceptionCatcherService) {
	// TODO put SERVER_URL in another module
	// Global Variables
    var SERVER_URL = 'http://localhost:8080';
    var HTTP_METHOD = {
    	GET : 'GET',
    	POST : 'POST',
    	PUT : 'PUT',
    	PATCH : 'PATCH',
    	DELETE : 'DELETE'
    };

    // set functions/callbacks
    var REQ_VALIDATOR = {
    	FILLED : accountValidatorService.requestValidator
                                   .userAccountValidator
                                   .validateFilled,
        NOT_EMPTY : accountValidatorService.requestValidator
                                   .userAccountValidator
                                   .validateNotEmpty
    };
    var RES_VALIDATOR = {
    	ARRAY : accountValidatorService
        			.responseValidator
        			.userAccountValidator
        			.validateArray,
        OBJECT : accountValidatorService
        			.responseValidator
        			.userAccountValidator
        			.validateObject
    };
    var RES_FAILED_CALLBACK = accountResponseHandlerCatcherService.requestFailed;
    var REQ_COMPLETED_CALLBACK = {
    	GET : accountResponseHandlerCatcherService.getRequestCompleted;
    	POST : accountResponseHandlerCatcherService.postRequestCompleted;
    	PUT : accountResponseHandlerCatcherService.putRequestCompleted;
    	PATCH : accountResponseHandlerCatcherService.patchRequestCompleted;
    	DELETE : accountResponseHandlerCatcherService.deleteRequestCompleted;
    };

    // the service object
    var service = {
    	/* Create */
        createUserAccount           :  createUserAccount,

        /* Read */
        readAllUserAccount          :  readAllUserAccount,
        readUserAccount             :  readUserAccount,

        /* Update */
        updateUserAccount           :  updateUserAccount,
        partiallyUpdateUserAccount  :  partiallyUpdateUserAccount,

        /* Delete*/
        deleteAllUserAccount        :  deleteAllUserAccount,
        deleteUserAccount           :  deleteUserAccount
    };
    return service;

    /*
     * public functions
     */

    /* Create */

    /*
     * @desc Create a user account
     * @param {Object} userAccount the user account to be created
     * @returns {Object}  the created user account
     * @throws {Object}  the error object when failing to create
     */
    function createUserAccount(userAccount) {
    	// validate userAccount object
        if (REQ_VALIDATOR.FILLED(userAccount) === null) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // assemble URL
        var url = assembleURL(SERVER_URL, '');

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.POST, url, userAccount);
    }

    /* Read */

    /*
     * @desc Read all user accounts
     * @returns {Array}  an array containing all the UserAccount objects
     * @throws {Object}  the error object when failing to read
     */
    function readAllUserAccount() {
    	// assemble URL
        var url = assembleURL(SERVER_URL, '');

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    /*
     * @desc Read certain user account
     * @param {String} accountId ID of the user account to be red
     * @returns {Object}  the UserAccount object
     * @throws {Object}  the error object when failing to read
     */
    function readUserAccount(accountId) {

    	// validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

    	// assemble URL
        var url = assembleURL(SERVER_URL, accountId);

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    /* Update */

    /*
     * @desc Update certain user account
     * @param {String} accountId the ID of the user account to be updated
     * @param {Object} userAccount the UserAccount object that is used to update
     * @returns {Object}  the UserAccount object
     * @throws {Object}  the error object when failing to update
     */
    function updateUserAccount(accountId, userAccount) {
    	// validate userAccount object
        if (REQ_VALIDATOR.FILLED(userAccount) === null) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

    	// assemble URL
        var url = assembleURL(SERVER_URL, accountId);

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.PUT, url, userAccount);
    }

    /*
     * @desc Partially update certain user account
     * @param {String} accountId the ID of the user account to be updated
     * @param {Object} userAccount the UserAccount object that is used to update
     * @returns {Object}  the UserAccount object
     * @throws {Object}  the error object when failing to update
     */
    function partiallyUpdateUserAccount(accountId, userAccount) {
    	// validate userAccount object
        if (REQ_VALIDATOR.NOT_EMPTY(userAccount) === null) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

    	// assemble URL
        var url = assembleURL(SERVER_URL, accountId);

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.PATCH, url, userAccount);
    }

    /* Delete */

    /*
     * @desc Delete all user accounts
     * @returns {Array}  an array containing all the deleted UserAccount objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteAllUserAccount() {
    	// assemble URL
        var url = assembleURL(SERVER_URL, '');

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.DELETE, url, null);
    }

    /*
     * @desc Delete certain user account
     * @param {String} accountId the ID of the account to be deleted
     * @returns {Object}  the deleted UserAccount object
     * @throws {Object}  the error object when failing to delete
     */
    function deleteUserAccount(accountId) {
    	// validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

    	// assemble URL
        var url = assembleURL(SERVER_URL, accountId);

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.DELETE, url, null);
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

    	var assembledUrl = SERVER_URL + '/accounts/users';

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
     * @param {Object} userAccount the user account object
     * @returns {Object} a $http promise with callbacks set
     */
    function getHttpPromise(method, url, userAccount) {
    	if (method === HTTP_METHOD.GET) {
    		return $http.get(url)
                    	.then(
                    		(function (validateArray, validateObject) {
                    			return function(response) {
                    		    	return REQ_COMPLETED_CALLBACK.GET(response, validateArray, validateObject);
                    			};
                    		})(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT)
                    	)
                    	.catch(RES_FAILED_CALLBACK);
    	} else if (method === HTTP_METHOD.POST) {
    		return $http.post(url, userAccount)
                    	.then(
                    		(function (validateArray, validateObject) {
                    			return function(response) {
                    		    	return REQ_COMPLETED_CALLBACK.POST(response, validateArray, validateObject);
                    			};
                    		})(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT)
                    	)
                    	.catch(RES_FAILED_CALLBACK);
    	} else if (method === HTTP_METHOD.PUT) {
    		return $http.put(url, userAccount)
                    	.then(
                    		(function (validateArray, validateObject) {
                    			return function(response) {
                    		    	return REQ_COMPLETED_CALLBACK.PUT(response, validateArray, validateObject);
                    			};
                    		})(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT)
                    	)
                    	.catch(RES_FAILED_CALLBACK);
    	} else if (method === HTTP_METHOD.PATCH) {
    		return $http.patch(url, userAccount)
                    	.then(
                    		(function (validateArray, validateObject) {
                    			return function(response) {
                    		    	return REQ_COMPLETED_CALLBACK.PATCH(response, validateArray, validateObject);
                    			};
                    		})(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT)
                    	)
                    	.catch(RES_FAILED_CALLBACK);
    	} else if (method === HTTP_METHOD.DELETE) {
    		return $http.delete(url)
                    	.then(
                    		(function (validateArray, validateObject) {
                    			return function(response) {
                    		    	return REQ_COMPLETED_CALLBACK.DELETE(response, validateArray, validateObject);
                    			};
                    		})(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT)
                    	)
                    	.catch(RES_FAILED_CALLBACK);
    	}

    	// wrong HTTP method
    	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
    }
}