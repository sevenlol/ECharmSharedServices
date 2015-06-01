/*
 * Response Handler Service for Account System
 */

//module getter
angular
    .module('data.account')
    .factory('accountResponseHandlerCatcherService', accountResponseHandlerCatcherService);

accountResponseHandlerCatcherService.$inject = [
	'accountExceptionCatcherService'
];

function accountResponseHandlerCatcherService(accountExceptionCatcherService) {
	var service = {
		getRequestCompleted    : getRequestCompleted,
		postRequestCompleted   : postRequestCompleted,
		putRequestCompleted    : putRequestCompleted,
		patchRequestCompleted  : patchRequestCompleted,
		deleteRequestCompleted : deleteRequestCompleted,
		requestFailed          : requestFailed
	};
	return service;

	/*
	 * public functions
	 */

	function getRequestCompleted(response, validateArray, validateObject) {
		/* check inputs */
		if (!validateResponse(response))
            return null;

        if (!angular.isFunction(validateArray) || !angular.isFunction(validateObject))
        	return null;

        // no content
        if (response.status === 204)
            return null;

        if (response.status === 200) {
            if (angular.isArray(response.data)) {
                // array
                return validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // article object
                return validateObject(response.data);
            } else {
                return null;
            }
        }

        return null;
	}

	function postRequestCompleted(response, validateObject) {
		/* check inputs */
		if (!validateResponse(response))
            return null;

        if (!angular.isFunction(validateObject))
        	return null;

        if (response.status === 201)
            return validateObject(response.data);

        return null;
	}

	function putRequestCompleted(response, validateObject) {
		/* check inputs */
		if (!validateResponse(response))
            return null;

        if (!angular.isFunction(validateObject))
        	return null;

       	if (response.status === 200)
            return validateObject(response.data);

        return null;
	}

	function patchRequestCompleted(response, validateObject) {
		/* check inputs */
		if (!validateResponse(response))
            return null;

        if (!angular.isFunction(validateObject))
        	return null;

        if (response.status === 200)
            return validateObject(response.data);

        return null;
	}

	function deleteRequestCompleted(response, validateArray, validateObject) {
		/* check inputs */
		if (!validateResponse(response))
            return null;

        if (!angular.isFunction(validateArray) || !angular.isFunction(validateObject))
        	return null;

        // no content
        if (response.status === 204)
            return null;

        if (response.status === 200) {
            if (angular.isArray(response.data)) {
                // array
                return validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // article object
                return validateObject(response.data);
            } else {
                return null;
            }
        }

        return null;
	}

	/*
     * @desc Process the error object from a HTTP request
     * @param {Object} error the error object
     * @returns {Object} the processed error with a custom error message
     */
    function requestFailed(error) {
        var parsedError = accountExceptionCatcherService.catcher(error);

        if (!(parsedError && parsedError instanceof accountExceptionCatcherService.error))
            throw new Error(accountExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        else
            throw parsedError;
    }

	/*
	 * private functions
	 */

	/*
     * @desc Validate if the input object is a response object
     * @param {Object} response the input object to be checked
     * @returns {Boolean} true if the input object is a response object
     *                    false otherwise
     */
    function validateResponse(response) {
        if (!angular.isObject(response) || response === null)
            return false;

        if (!angular.isNumber(response.status))
            return false;

        return true;
    }
}