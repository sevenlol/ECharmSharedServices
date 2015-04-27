/*
 * Exception Catcher Service for Blog System
 */

//module getter
angular
    .module('blog')
    .factory('blogExceptionCatcherService', blogExceptionCatcherService);

function blogExceptionCatcherService() {
    var service = {
        error : BlogError,
        catcher : catcher
    };
    return service;

    /*
     * Public functions
     */

    /*
     * @desc Create a custom error object based on the input
     *       error and HTTP method
     * @param {Object} error input error object from a HTTP req
     * @param {String} method the HTTP method of the request
     * @returns {Object} the custom error object with predefined
     *                   error message
     */
    function catcher(error, method) {
        if (!validateError(error) || error.status === 0)
            return new BlogError('Some Unknown Error Occurred!', error);

        var errorMessage;

        if (error.status === 400) {
            errorMessage = 'Something is wrong with the request!';
        } else if (error.status === 401) {
            errorMessage = 'Please sign in first!';
        } else if (error.status === 403) {
            errorMessage = 'You are not authorized for this action!';
        } else if (error.status === 409) {
            // TODO add more conditions for creating conflict Rating
            errorMessage = 'You already rated this article!';
        } else if (error.status === 500) {
            errorMessage = 'Something is wrong with the server!';
        } else {
            errorMessage = 'Some Unknown Error Occurred!';
        }

        return new BlogError(errorMessage, error);
    }

    /*
     * @desc Custom error object for Blog system
     * @param {String} message the message describing the error
     * @returns
     */
    function BlogError(message, error) {
        Error.captureStackTrace(this);
        this.message = message;
        this.name = "BlogError";

        if (angular.isObject(error.data) && error.data !== null)
            this.errorBody = error.data;
    }
    BlogError.prototype = Object.create(Error.prototype);


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
        if (!angular.isObject(error))
            return false;

        if (!angular.isNumber(error.status))
            return false;

        return true;
    }
}