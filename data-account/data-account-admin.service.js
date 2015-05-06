/*
 * Admin Account Data Service for Account System
 */

//module getter
angular
    .module('data.account')
    .factory('adminAccountService', adminAccountService);

adminAccountService.$inject = [
	'$http',
	'accountResponseHandlerCatcherService',
	'accountValidatorService',
	'accountExceptionCatcherService'
];

function adminAccountService($http, accountResponseHandlerCatcherService, accountValidatorService, accountExceptionCatcherService) {
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
                                   .adminAccountValidator
                                   .validateFilled,
        NOT_EMPTY : accountValidatorService.requestValidator
                                   .adminAccountValidator
                                   .validateNotEmpty
    };
    var RES_VALIDATOR = {
    	ARRAY : accountValidatorService
        			.responseValidator
        			.adminAccountValidator
        			.validateArray,
        OBJECT : accountValidatorService
        			.responseValidator
        			.adminAccountValidator
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
    	/* Create */
        createAdminAccount           :  createAdminAccount,

        /* Read */
        readAllAdminAccount          :  readAllAdminAccount,
        readAdminAccountByUsername   :  readAdminAccountByUsername,
        readAdminAccountByEmail      :  readAdminAccountByEmail,
        // read by id
        readAdminAccount             :  readAdminAccount,

        /* Update */
        updateAdminAccount           :  updateAdminAccount,
        partiallyUpdateAdminAccount  :  partiallyUpdateAdminAccount,

        /* Delete*/
        deleteAllAdminAccount        :  deleteAllAdminAccount,
        deleteAdminAccount           :  deleteAdminAccount
    };
    return service;

    /*
     * public functions
     */

    /* Create */

    /*
     * @desc Create a admin account
     * @param {Object} adminAccount the admin account to be created
     * @returns {Object}  the created admin account
     * @throws {Object}  the error object when failing to create
     */
    function createAdminAccount(adminAccount) {
    	// validate adminAccount object
        if (REQ_VALIDATOR.FILLED(adminAccount) === null) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // assemble URL
        var url = assembleURL(SERVER_URL, '');

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.POST, url, adminAccount);
    }

    /* Read */

    /*
     * @desc Read all admin accounts
     * @returns {Array}  an array containing all the AdminAccount objects
     * @throws {Object}  the error object when failing to read
     */
    function readAllAdminAccount() {
    	// assemble URL
        var url = assembleURL(SERVER_URL, '');

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    function readAdminAccountByUsername(username) {
        if (!angular.isString(username) || !username)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // assemble URL
        var url = assembleURL(SERVER_URL, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        url += '?username=' + username;

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    function readAdminAccountByEmail(email) {
        if (!angular.isString(email) || !email)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // assemble URL
        var url = assembleURL(SERVER_URL, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        url += '?email=' + email;

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    /*
     * @desc Read certain admin account
     * @param {String} accountId ID of the admin account to be red
     * @returns {Object}  the AdminAccount object
     * @throws {Object}  the error object when failing to read
     */
    function readAdminAccount(accountId) {

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
     * @desc Update certain admin account
     * @param {String} accountId the ID of the admin account to be updated
     * @param {Object} adminAccount the AdminAccount object that is used to update
     * @returns {Object}  the AdminAccount object
     * @throws {Object}  the error object when failing to update
     */
    function updateAdminAccount(accountId, adminAccount) {
    	// validate adminAccount object
        if (REQ_VALIDATOR.FILLED(adminAccount) === null) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

    	// assemble URL
        var url = assembleURL(SERVER_URL, accountId);

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.PUT, url, adminAccount);
    }

    /*
     * @desc Partially update certain admin account
     * @param {String} accountId the ID of the admin account to be updated
     * @param {Object} adminAccount the AdminAccount object that is used to update
     * @returns {Object}  the AdminAccount object
     * @throws {Object}  the error object when failing to update
     */
    function partiallyUpdateAdminAccount(accountId, adminAccount) {
    	// validate adminAccount object
        if (REQ_VALIDATOR.NOT_EMPTY(adminAccount) === null) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

    	// assemble URL
        var url = assembleURL(SERVER_URL, accountId);

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.PATCH, url, adminAccount);
    }

    /* Delete */

    /*
     * @desc Delete all admin accounts
     * @returns {Array}  an array containing all the deleted AdminAccount objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteAllAdminAccount() {
    	// assemble URL
        var url = assembleURL(SERVER_URL, '');

        if (!url)
        	throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.DELETE, url, null);
    }

    /*
     * @desc Delete certain admin account
     * @param {String} accountId the ID of the account to be deleted
     * @returns {Object}  the deleted AdminAccount object
     * @throws {Object}  the error object when failing to delete
     */
    function deleteAdminAccount(accountId) {
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

    	var assembledUrl = SERVER_URL + '/accounts/admins';

    	// accountId == ''
    	if (!accountId)
    		return assembledUrl;

    	assembledUrl += '/' + accountId;

    	return assembledUrl;
    }

    /*
     * @desc Get a $http promise based on the HTTP method, url and
     *       the admin account object
     * @param {String} method HTTP method (GET, POST ..., etc)
     * @param {String} url the assembled url
     * @param {Object} adminAccount the admin account object
     * @returns {Object} a $http promise with callbacks set
     */
    function getHttpPromise(method, url, adminAccount) {
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
    		return $http.post(url, adminAccount)
                    	.then(
                    		(function (validateArray, validateObject) {
                    			return function(response) {
                    		    	return REQ_COMPLETED_CALLBACK.POST(response, validateObject);
                    			};
                    		})(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT)
                    	)
                    	.catch(RES_FAILED_CALLBACK);
    	} else if (method === HTTP_METHOD.PUT) {
    		return $http.put(url, adminAccount)
                    	.then(
                    		(function (validateArray, validateObject) {
                    			return function(response) {
                    		    	return REQ_COMPLETED_CALLBACK.PUT(response, validateObject);
                    			};
                    		})(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT)
                    	)
                    	.catch(RES_FAILED_CALLBACK);
    	} else if (method === HTTP_METHOD.PATCH) {
    		return $http.patch(url, adminAccount)
                    	.then(
                    		(function (validateArray, validateObject) {
                    			return function(response) {
                    		    	return REQ_COMPLETED_CALLBACK.PATCH(response, validateObject);
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