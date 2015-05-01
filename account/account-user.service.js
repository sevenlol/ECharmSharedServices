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
	'accountValidatorService'
];

function userAccountService($http, accountResponseHandlerCatcherService, accountValidatorService) {
	// TODO put SERVER_URL in another module
    var SERVER_URL = 'http://localhost:8080';
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

    function createUserAccount(userAccount) {
    	// validate userAccount object
        if (accountValidatorService.requestValidator
                                   .userAccountValidator
                                   .validateFilled(userAccount) === null) {
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // assemble URL
        var url = assembledUrl(SERVER_URL, '');

        if (!url)
        	throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // set callbacks
        var resCallBack = accountResponseHandlerCatcherService.getRequestCompleted;
        var resFailedCallBack = accountResponseHandlerCatcherService.requestFailed;
        var validateArray = accountValidatorService
        				    .responseValidator
        					.userAccountValidator
        					.validateArray;
        var validateObject = accountValidatorService
        					 .responseValidator
        					 .userAccountValidator
        					 .validateObject;

        return $http.post(url, userAccount)
                    .then(
                    	(function (validateArray, validateObject) {
                    		return function(response) {
                    		    return resCallBack(response, validateArray, validateObject);
                    		};
                    	})(validateArray, validateObject);
                    )
                    .catch(resFailedCallBack);
    }

    /* Read */

    function readAllUserAccount(argument) {
    	// body...
    }

    function readUserAccount(argument) {
    	// body...
    }

    /* Update */

    function updateUserAccount(argument) {
    	// body...
    }

    function partiallyUpdateUserAccount(argument) {
    	// body...
    }

    /* Delete */

    function deleteAllUserAccount(argument) {
    	// body...
    }

    function deleteUserAccount(argument) {
    	// body...
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

    	var assembledUrl = SERVER_URL + 'accounts/users';

    	// accountId == ''
    	if (!accountId)
    		return assembledUrl;

    	assembledUrl += '/' + accountId;

    	return assembledUrl;
    }
}