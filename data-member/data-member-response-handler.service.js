/*
 *  Response Handler Service In Member Data Services
 */

(function() {
    "use strict";

    // module setter
    angular
        .module('data.member')
        .factory('memberResponseHandlerService', memberResponseHandlerService);

    memberResponseHandlerService.$inject = [
        'memberExceptionCatcherService',
        'Logger'
    ];

    function memberResponseHandlerService(memberExceptionCatcherService, Logger) {
        // Logger object
        var logger = Logger.getInstance('app - data - member - response - handler');
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
            if (!validateResponse(response)) {
                logger.error('getRequestCompleted', 'Invalid input: response');
                return null;
            }

            if (!angular.isFunction(validateArray) || !angular.isFunction(validateObject)) {
                logger.error('getRequestCompleted', 'Invalid input type: validateArray or validateObject');
                logger.debug('getRequestCompleted', 'validateArray type: {0}, validateObject type: {1}',
                                                    [ typeof validateArray,
                                                      typeof validateObject ]);
                return null;
            }

            // no content
            if (response.status === 204) {
                logger.log('getRequestCompleted', 'Response status: 204, No Content!');
                return null;
            }

            if (response.status === 200) {
                logger.log('getRequestCompleted', 'Response status: 200, Operation Succeeded!');
                if (angular.isArray(response.data)) {
                    // array
                    logger.debug('getRequestCompleted', 'Response data type: array!');
                    return validateArray(response.data);
                } else if (angular.isObject(response.data)) {
                    // object
                    logger.debug('getRequestCompleted', 'Response data type: object!');
                    return validateObject(response.data);
                } else {
                    logger.error('getRequestCompleted', 'Response data type: {0}!', [typeof response.data ]);
                    return null;
                }
            }

            logger.error('getRequestCompleted', 'Response status: {0}', [ response.status ]);
            return null;
        }

        function postRequestCompleted(response, validateObject) {
            /* check inputs */
            if (!validateResponse(response)) {
                logger.error('postRequestCompleted', 'Invalid input: response');
                return null;
            }

            if (!angular.isFunction(validateObject)) {
                logger.error('postRequestCompleted', 'Invalid input type: validateObject');
                logger.debug('postRequestCompleted', 'validateObject type: {0}', [ typeof validateObject ]);
                return null;
            }

            if (response.status === 201) {
                logger.log('postRequestCompleted', 'Response status: 201, Created!');
                return validateObject(response.data);
            }

            logger.error('postRequestCompleted', 'Response status: {0}', [ response.status ]);
            return null;
        }

        function putRequestCompleted(response, validateObject) {
            /* check inputs */
            if (!validateResponse(response)) {
                logger.error('putRequestCompleted', 'Invalid input: response');
                return null;
            }

            if (!angular.isFunction(validateObject)) {
                logger.error('putRequestCompleted', 'Invalid input type: validateObject');
                logger.debug('putRequestCompleted', 'validateObject type: {0}', [ typeof validateObject ]);
                return null;
            }

            if (response.status === 200) {
                logger.log('putRequestCompleted', 'Response status: 200, Operation Succeeded!');
                return validateObject(response.data);
            }

            logger.error('putRequestCompleted', 'Response status: {0}', [ response.status ]);
            return null;
        }

        function patchRequestCompleted(response, validateObject) {
            /* check inputs */
            if (!validateResponse(response)) {
                logger.error('patchRequestCompleted', 'Invalid input: response');
                return null;
            }

            if (!angular.isFunction(validateObject)) {
                logger.error('patchRequestCompleted', 'Invalid input type: validateObject');
                logger.debug('patchRequestCompleted', 'validateObject type: {0}', [ typeof validateObject ]);
                return null;
            }

            if (response.status === 200) {
                logger.log('patchRequestCompleted', 'Response status: 200, Operation Succeeded!');
                return validateObject(response.data);
            }

            logger.error('patchRequestCompleted', 'Response status: {0}', [ response.status ]);
            return null;
        }

        function deleteRequestCompleted(response, validateArray, validateObject) {
            /* check inputs */
            if (!validateResponse(response)) {
                logger.error('deleteRequestCompleted', 'Invalid input: response');
                return null;
            }

            if (!angular.isFunction(validateArray) || !angular.isFunction(validateObject)) {
                logger.error('deleteRequestCompleted', 'Invalid input type: validateArray or validateObject');
                logger.debug('deleteRequestCompleted', 'validateArray type: {0}, validateObject type: {1}',
                                                    [ typeof validateArray,
                                                      typeof validateObject ]);
                return null;
            }

            // No Content
            if (response.status === 204) {
                logger.log('deleteRequestCompleted', 'Response status: 204, No Content!');
                return null;
            }

            if (response.status === 200) {
                logger.log('deleteRequestCompleted', 'Response status: 200, Operation Succeeded!');
                if (angular.isArray(response.data)) {
                    // array
                    logger.debug('deleteRequestCompleted', 'Response data type: array!');
                    return validateArray(response.data);
                } else if (angular.isObject(response.data)) {
                    // object
                    logger.debug('deleteRequestCompleted', 'Response data type: object!');
                    return validateObject(response.data);
                } else {
                    logger.error('deleteRequestCompleted', 'Response data type: {0}!', [typeof response.data ]);
                    return null;
                }
            }

            logger.error('deleteRequestCompleted', 'Response status: {0}', [ response.status ]);
            return null;
        }

        /*
         * @desc Process the error object from a HTTP request
         * @param {Object} error the error object
         * @returns {Object} the processed error with a custom error message
         */
        function requestFailed(error) {
            var parsedError = memberExceptionCatcherService.catcher(error);

            if (!(parsedError && parsedError instanceof memberExceptionCatcherService.error)) {
                logger.error('requestFailed', 'Request Failed: Default Error!');
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }
            else {
                logger.error('requestFailed', 'Request Failed: Member Error!');
                logger.debug('requestFailed', 'Error Message: {0}', [ error.message ]);
                throw parsedError;
            }
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
            if (!angular.isObject(response) || response === null) {
                logger.error('validateResponse', 'Invalid response object type');
                logger.debug('validateResponse', 'response type: {0}', [ typeof response ]);
                return false;
            }

            if (!angular.isNumber(response.status)) {
                logger.error('validateResponse', 'response.status is not a number');
                logger.debug('validateResponse', '')
                return false;
            }

            logger.log('validateResponse', 'Validate response succeeded!');
            return true;
        }
    }

})();
