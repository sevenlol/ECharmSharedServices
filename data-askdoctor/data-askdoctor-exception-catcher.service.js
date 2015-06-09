/*
 *  Exception Catcher Service In Q & A Data Services
 */

(function() {
    "use strict";

    // module setter
    angular
        .module('data.askdoctor')
        .factory('askdoctorExceptionCatcherService', askdoctorExceptionCatcherService);

    askdoctorExceptionCatcherService.$inject = [

    ];

    function askdoctorExceptionCatcherService() {
        var DEFAULT_ERROR_MESSAGE = 'Some Unknown Error Occurred!';
        var service = {
            DEFAULT_ERROR_MESSAGE : DEFAULT_ERROR_MESSAGE,
            error : AskdoctorError,
            catcher : catcher
        };
        return service;

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
                return new AskdoctorError(DEFAULT_ERROR_MESSAGE, error);

            var errorMessage;

            if (error.status === 400) {
                errorMessage = 'Something is wrong with the request!';
            } else if (error.status === 401) {
                errorMessage = 'Please sign in first!';
            } else if (error.status === 403) {
                errorMessage = 'You are not authorized for this action!';
            } else if (error.status === 404) {
                errorMessage = 'Object not found!';
            } else if (error.status === 409) {
                // TODO add more conditions for creating conflict Rating
                errorMessage = 'The answer already exists!';
            } else if (error.status === 500) {
                errorMessage = 'Something is wrong with the server!';
            } else {
                errorMessage = DEFAULT_ERROR_MESSAGE;
            }

            return new AskdoctorError(errorMessage, error);
        }

        /*
         * @desc Custom error object for Askdoctor Data Service
         * @param {String} message the message describing the error
         * @returns
         */
        function AskdoctorError(message, error) {
            if (angular.isFunction(Error.captureStackTrace))
                Error.captureStackTrace(this);
            this.message = message;
            this.name = "AskdoctorError";

            if (!validateError(error))
                return;

            this.status = error.status;

            if (angular.isObject(error.data) && error.data !== null && !angular.isArray(error.data))
                this.errorBody = error.data;
        }
        AskdoctorError.prototype = Object.create(Error.prototype);


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