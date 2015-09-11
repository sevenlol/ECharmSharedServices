/*
 * Exception Catcher Service for Account System
 */

//module getter
angular
    .module('data.account')
    .factory('accountExceptionCatcherService', accountExceptionCatcherService);

function accountExceptionCatcherService() {
    var DEFAULT_ERROR_MESSAGE = 'Some Unknown Error Occurred!';
    var service = {
        DEFAULT_ERROR_MESSAGE : DEFAULT_ERROR_MESSAGE,
        error : AccountError,
        catcher : catcher
    };
    return service;

    /*
     * Public functions
     */

    /*
     * @desc Create a custom error object based on the input
     *       error object
     * @param {Object} error input error object from a HTTP req
     * @returns {Object} the custom error object with predefined
     *                   error message
     */
    function catcher(error) {
        if (!validateError(error) || error.status === 0)
            return new AccountError(DEFAULT_ERROR_MESSAGE, error);

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
            errorMessage = '使用者帳號或信箱已經存在!';
        } else if (error.status === 500) {
            errorMessage = '伺服器發生錯誤，請稍後重新嘗試!';
        } else {
            errorMessage = DEFAULT_ERROR_MESSAGE;
        }

        return new AccountError(errorMessage, error);
    }

    /*
     * @desc Custom error object for Account system
     * @param {String} message the message describing the error
     * @returns
     */
    function AccountError(message, error) {
        if (angular.isFunction(Error.captureStackTrace))
            Error.captureStackTrace(this);
        this.message = message;
        this.name = "AccountError";

        if (!validateError(error))
            return;

        this.status = error.status;

        if (angular.isObject(error.data) && error.data !== null && !angular.isArray(error.data))
            this.errorBody = error.data;
    }
    AccountError.prototype = Object.create(Error.prototype);


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