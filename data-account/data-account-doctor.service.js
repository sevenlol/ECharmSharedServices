/*
 * Doctor Account Data Service for Account System
 */

//module getter
angular
    .module('data.account')
    .factory('doctorAccountService', doctorAccountService);

doctorAccountService.$inject = [
	'$http',
	'accountResponseHandlerCatcherService',
	'accountValidatorService',
	'accountExceptionCatcherService',
    'valueService'
];

function doctorAccountService($http, accountResponseHandlerCatcherService, accountValidatorService, accountExceptionCatcherService, valueService) {
    // TODO put SERVER_URL in another module
	// Global Variables
    var SERVER_URL = valueService.SERVER_URL.ACCOUNT;
    var ARBITRARY_CATEGORY = 'Arbitrary';
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
                                   .doctorAccountValidator
                                   .validateFilled,
        NOT_EMPTY : accountValidatorService.requestValidator
                                   .doctorAccountValidator
                                   .validateNotEmpty
    };
    var RES_VALIDATOR = {
    	ARRAY : accountValidatorService
        			.responseValidator
        			.doctorAccountValidator
        			.validateArray,
        OBJECT : accountValidatorService
        			.responseValidator
        			.doctorAccountValidator
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
        createDoctorAccount                   :  createDoctorAccount,

        /* Read */
        readAllDoctorAccount                  :  readAllDoctorAccount,
        readAllDoctorAccountInCategory        :  readAllDoctorAccountInCategory,
        readDoctorAccountByUsername           :  readDoctorAccountByUsername,
        readDoctorAccountByEmail              :  readDoctorAccountByEmail,
        // read by id
        readDoctorAccount                     :  readDoctorAccount,

        /* Update */
        updateDoctorAccount                   :  updateDoctorAccount,
        partiallyUpdateDoctorAccount          :  partiallyUpdateDoctorAccount,

        /* Delete*/
        deleteAllDoctorAccount                :  deleteAllDoctorAccount,
        deleteAllDoctorAccountInCategory      :  deleteAllDoctorAccountInCategory,
        deleteDoctorAccount                   :  deleteDoctorAccount
    };
    return service;

    /*
     * public functions
     */

    /* Create */

    /*
     * @desc Create a doctor account
     * @param {Object} doctorAccount the doctor account to be created
     * @returns {Object}  the created doctor account
     * @throws {Object}  the error object when failing to create
     */
    function createDoctorAccount(category, doctorAccount) {
        // validate doctorAccount object
        if (REQ_VALIDATOR.FILLED(doctorAccount) === null) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        if (!angular.isString(category) || !category) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // TODO validate category

        // assemble URL
        var url = assembleURL(SERVER_URL, category, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.POST, url, doctorAccount);
    }

    /* Read */

    /*
     * @desc Read all doctor accounts
     * @returns {Array}  an array containing all the DoctorAccount objects
     * @throws {Object}  the error object when failing to read
     */
    function readAllDoctorAccount() {
        // assemble URL
        var url = assembleURL(SERVER_URL, '', '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    function readAllDoctorAccountInCategory(category) {
        if (!angular.isString(category) || !category) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // assemble URL
        var url = assembleURL(SERVER_URL, category, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    // set the category to 'Arbitrary' or '' if it is unknown
    function readDoctorAccountByUsername(category, username) {
        // allow category to be ''
        if (!angular.isString(category))
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        if (!angular.isString(username) || !username)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // TODO validate category here

        // assemble URL
        var url = assembleURL(SERVER_URL, category, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        url += '?username=' + username;

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    // set the category to 'Arbitrary' or '' if it is unknown
    function readDoctorAccountByEmail(category, email) {
        // allow category to be ''
        if (!angular.isString(category))
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        if (!angular.isString(email) || !email)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // TODO validate category here

        // assemble URL
        var url = assembleURL(SERVER_URL, category, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        url += '?email=' + email;

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    /*
     * @desc Read certain doctor account
     * @param {String} category the category of the doctor account to be red
     *                          *Note: set category to 'Arbitrary' if it is unknown
     * @param {String} accountId ID of the doctor account to be red
     * @returns {Object}  the DoctorAccount object
     * @throws {Object}  the error object when failing to read
     */
    function readDoctorAccount(category, accountId) {
        if (!angular.isString(category) || !category)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // TODO validate category here

        // validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // assemble URL
        var url = assembleURL(SERVER_URL, category, accountId);

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.GET, url, null);
    }

    /* Update */

    /*
     * @desc Update certain doctor account
     * @param {String} category the category of the doctor account to be updated
     *                          *Note: category is not allowed to be '' or 'Arbitrary'
     * @param {String} accountId the ID of the doctor account to be updated
     * @param {Object} doctorAccount the DoctorAccount object that is used to update
     * @returns {Object}  the DoctorAccount object
     * @throws {Object}  the error object when failing to update
     */
    function updateDoctorAccount(category, accountId, doctorAccount) {
        if (!angular.isString(category) || !category) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate doctorAccount object
        if (REQ_VALIDATOR.FILLED(doctorAccount) === null) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // TODO validate category

        // assemble URL
        var url = assembleURL(SERVER_URL, category, accountId);

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.PUT, url, doctorAccount);
    }

    /*
     * @desc Partially update certain doctor account
     * @param {String} category the category of the doctor account to be updated
     *                          *Note: category is not allowed to be '' or 'Arbitrary'
     * @param {String} accountId the ID of the doctor account to be updated
     * @param {Object} doctorAccount the DoctorAccount object that is used to update
     * @returns {Object}  the DoctorAccount object
     * @throws {Object}  the error object when failing to update
     */
    function partiallyUpdateDoctorAccount(category, accountId, doctorAccount) {
        if (!angular.isString(category) || !category) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate doctorAccount object
        if (REQ_VALIDATOR.NOT_EMPTY(doctorAccount) === null) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // TODO validate category

        // assemble URL
        var url = assembleURL(SERVER_URL, category, accountId);

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.PATCH, url, doctorAccount);
    }

    /* Delete */

    /*
     * @desc Delete all doctor accounts
     * @returns {Array}  an array containing all the deleted DoctorAccount objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteAllDoctorAccount() {
        // assemble URL
        var url = assembleURL(SERVER_URL, '', '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.DELETE, url, null);
    }

    function deleteAllDoctorAccountInCategory(category) {
        if (!angular.isString(category) || !category) {
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // TODO validate category

        // assemble URL
        var url = assembleURL(SERVER_URL, category, '');

        if (!url)
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return getHttpPromise(HTTP_METHOD.DELETE, url, null);
    }

    /*
     * @desc Delete certain doctor account
     * @param {String} category the category of the account to be deleted
     *                          *Note: category cannot be '' or 'Arbitrary'
     * @param {String} accountId the ID of the account to be deleted
     * @returns {Object}  the deleted DoctorAccount object
     * @throws {Object}  the error object when failing to delete
     */
    function deleteDoctorAccount(category, accountId) {
        // validate category
        if (!angular.isString(category) || category === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // validate accountId
        if (!angular.isString(accountId) || accountId === '')
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // TODO validate category

        // assemble URL
        var url = assembleURL(SERVER_URL, category, accountId);

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
     * @param {String} category the category of the doctor. if not needed, set to ''
     * @param {String} accountId the account id. if not needed, set to ''
     * @returns {String}  the assembled url
     */
    function assembleURL(SERVER_URL, category, accountId) {
        if (!angular.isString(SERVER_URL) ||
            !angular.isString(category) ||
            !angular.isString(accountId)) {
            return '';
        }

        // implement category check

        // SERVER_URL == ''
        if (!SERVER_URL)
            return '';

        var assembledUrl = SERVER_URL + '/accounts/doctors';

        // category == ''
        if (!category)
            return assembledUrl;

        assembledUrl += '/' + category;

        // accountId == ''
        if (!accountId)
            return assembledUrl;

        assembledUrl += '/' + accountId;

        return assembledUrl;
    }

    /*
     * @desc Get a $http promise based on the HTTP method, url and
     *       the doctor account object
     * @param {String} method HTTP method (GET, POST ..., etc)
     * @param {String} url the assembled url
     * @param {Object} doctorAccount the doctor account object
     * @returns {Object} a $http promise with callbacks set
     */
    function getHttpPromise(method, url, doctorAccount) {
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
            return $http.post(url, doctorAccount)
                        .then(
                            (function (validateArray, validateObject) {
                                return function(response) {
                                    return REQ_COMPLETED_CALLBACK.POST(response, validateObject);
                                };
                            })(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT)
                        )
                        .catch(RES_FAILED_CALLBACK);
        } else if (method === HTTP_METHOD.PUT) {
            return $http.put(url, doctorAccount)
                        .then(
                            (function (validateArray, validateObject) {
                                return function(response) {
                                    return REQ_COMPLETED_CALLBACK.PUT(response, validateObject);
                                };
                            })(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT)
                        )
                        .catch(RES_FAILED_CALLBACK);
        } else if (method === HTTP_METHOD.PATCH) {
            return $http.patch(url, doctorAccount)
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