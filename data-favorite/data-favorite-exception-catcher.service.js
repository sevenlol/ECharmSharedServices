/*
 *  Exception Catcher Service In Favorite Data Services
 */

(function() {
    "use strict";

    // module setter
    angular
        .module('data.favorite')
        .factory('FavoriteExceptionCatcherService', FavoriteExceptionCatcherService);

    FavoriteExceptionCatcherService.$inject = [

    ];

    function FavoriteExceptionCatcherService() {
        var DEFAULT_ERROR_MESSAGE = 'Some Unknown Error Occurred!';
        var service = {
            DEFAULT_ERROR_MESSAGE : DEFAULT_ERROR_MESSAGE,
            error : FavoriteError,
            catcher : catcher
        };

        /* public functions */

        /*
         * @desc Create a custom error object based on the input
         *       error object
         * @param {Object} error input error object from a HTTP req
         * @returns {Object} the custom error object with predefined
         *                   error message
         */
        function catcher(error) {
            if (!validateError(error) || error.status === 0)
                return new FavoriteError(DEFAULT_ERROR_MESSAGE, error);

            var errorMessage;

            if (error.status === 400) {
                errorMessage = 'Something is wrong with the request!';
            } else if (error.status === 401) {
                errorMessage = 'Please sign in first!';
            } else if (error.status === 403) {
                errorMessage = 'You are not authorized for this action!';
            } else if (error.status === 404) {
                errorMessage = 'Object not found!';
            } else if (error.status === 500) {
                errorMessage = 'Something is wrong with the server!';
            } else {
                errorMessage = DEFAULT_ERROR_MESSAGE;
            }

            return new FavoriteError(errorMessage, error);
        }

        /*
         * @desc Custom error object for Favorite Data Service
         * @param {String} message the message describing the error
         * @returns
         */
        function FavoriteError(message, error) {
            if (angular.isFunction(Error.captureStackTrace))
                Error.captureStackTrace(this);
            this.message = message;
            this.name = "FavoriteError";

            if (!validateError(error))
                return;

            this.status = error.status;

            if (angular.isObject(error.data) && error.data !== null && !angular.isArray(error.data))
                this.errorBody = error.data;
        }
        FavoriteError.prototype = Object.create(Error.prototype);

        // change return here
        return service;

        /*
         * Private functions
         */

        /*
         * @desc Validate if the error object is legit
         * @param {Object} error the error object from the HTTP request
         * @returns {Boolean} return true if the error object is legit
         *                    return false otherwise
         */
        function validateError(error) {
            if (!angular.isObject(error) || error === null || angular.isArray(error))
                return false;

            if (!angular.isNumber(error.status))
                return false;

            return true;
        }
    }

})();
