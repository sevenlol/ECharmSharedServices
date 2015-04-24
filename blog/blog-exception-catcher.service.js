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

    }

    /*
     * @desc Custom error object for Blog system
     * @param {String} message the message describing the error
     * @returns
     */
    function BlogError(message) {
        Error.captureStackTrace(this);
        this.message = message;
        this.name = "BlogError";
    }
    BlogError.prototype = Object.create(Error.prototype);
}