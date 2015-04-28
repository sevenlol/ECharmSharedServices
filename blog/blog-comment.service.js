/*
 * Comment Data Service for Blog System
 */

//module getter
angular
    .module('blog')
    .factory('blogCommentService', blogCommentService);

blogCommentService.$inject = ['$http', 'blogValidatorService', 'blogExceptionCatcherService'];

function blogCommentService() {
    // TODO put SERVER_URL in another module
    var SERVER_URL = 'http://localhost:8080';
    var service = {
        /* Create */
        createComment           :  createComment,

        /* Read */
        readAllComment          :  readAllComment,
        readComment             :  readComment,

        /* Update */
        updateComment           :  updateComment,
        partiallyUpdateComment  :  partiallyUpdateComment,

        /* Delete*/
        deleteAllComment        :  deleteAllComment,
        deleteComment           :  deleteComment
    };
    return service;

    /*
     * public functions
     */

    /* Create */

    /*
     * @desc Create an comment under an article
     * @param {String} category the category that the article belongs to
     * @param {String} articleId article id that the comment belongs to
     * @param {Object} comment the comment object to be created
     * @returns {Object}  the created comment
     * @throws {Object}  the error object when failing to create
     */
    function createComment(category, articleId, comment) {

    }

    /* Read */

    /*
     * @desc Read all comments under an article in certain category
     * @param {String} category category to read
     * @param {String} articleId article id that the comment belongs to
     * @returns {Array}  an array containing all the comment objects
     * @throws {Object}  the error object when failing to read
     */
    function readAllComment(category, articleId) {

    }

    /*
     * @desc Read certain comment
     * @param {String} category category to read
     * @param {String} articleId article id that the comment belongs to
     * @param {String} commentId the ID of the comment to be red
     * @returns {Object}  the comment object
     * @throws {Object}  the error object when failing to read
     */
    function readComment(category, articleId, commentId) {

    }

    /* Update */

    /*
     * @desc Update certain comment
     * @param {String} category category of the comment
     * @param {String} articleId article id that the comment belongs to
     * @param {String} commentId the ID of the comment to be updated
     * @param {Object} comment the comment object to update
     * @returns {Object}  the comment object
     * @throws {Object}  the error object when failing to update
     */
    function updateComment(category, articleId, commentId, comment) {

    }

    /*
     * @desc Partially update certain comment
     * @param {String} category category of the comment
     * @param {String} articleId article id that the comment belongs to
     * @param {String} commentId the ID of the comment to be updated
     * @param {Object} comment the comment object to update
     * @returns {Object}  the comment object
     * @throws {Object}  the error object when failing to update
     */
    function partiallyUpdateComment(category, articleId, commentId, comment) {

    }

    /* Delete */

    /*
     * @desc Delete all comments under certain article in certain category
     * @param {String} category category to delete
     * @param {String} articleId article id that the comment belongs to
     * @returns {Array}  an array containing all the deleted comment objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteAllComment(category, articleId) {

    }

    /*
     * @desc Delete certain comment
     * @param {String} category category to read
     * @param {String} articleId article id that the comment belongs to
     * @param {String} commentId the ID of the comment to be deleted
     * @returns {Object}  the deleted comment object
     * @throws {Object}  the error object when failing to delete
     */
    function deleteComment(category, articleId, commentId) {

    }

    /*
     * private functions
     */

    // TODO combine private functions in Blog system to another service
    //      named as 'blogResponseHandlerService' or something

    /*
     * @desc Assemble url based on server's url, category and article id
     * @param {String} SERVER_URL server's url
     * @param {String} category the category. if not needed, set to ''
     * @param {String} articleId the article id. if not needed, set to ''
     * @param {String} commentId the comment id. if not needed, set to ''
     * @param {String}  the assembled url
     */
    function assembleURL(SERVER_URL, category, articleId, commentId) {

    }

    /*
     * @desc Validate the response from a GET request
     * @param {Object} response the response of the request
     * @returns {Object}  the comment object in the json body if validated,
     *                    null otherwise
     */
    function getRequestCompleted(response) {

    }

    /*
     * @desc Validate the response from a POST request
     * @param {Object} response the response of the request
     * @returns {Object}  the comment object in the json body if validated,
     *                    null otherwise
     */
    function postRequestCompleted(response) {

    }

    /*
     * @desc Validate the response from a PUT request
     * @param {Object} response the response of the request
     * @returns {Object}  the comment object in the json body if validated,
     *                    null otherwise
     */
    function putRequestCompleted(response) {

    }

    /*
     * @desc Validate the response from a PATCH request
     * @param {Object} response the response of the request
     * @returns {Object}  the comment object in the json body if validated,
     *                    null otherwise
     */
    function patchRequestCompleted(response) {

    }

    /*
     * @desc Validate the response from a DELETE request
     * @param {Object} response the response of the request
     * @returns {Object}  the comment object in the json body if validated,
     *                    null otherwise
     */
    function deleteRequestCompleted(response) {

    }

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

    /*
     * @desc Process the error object from a HTTP request
     * @param {Object} error the error object
     * @returns {Object} the processed error with a custom error message
     */
    function requestFailed(error) {
        var parsedError = blogExceptionCatcherService.catcher(error);

        if (!(parsedError && parsedError instanceof blogExceptionCatcherService.error))
            throw new Error('Some Unknown Error Occurred!');
        else
            throw parsedError;
    }
}