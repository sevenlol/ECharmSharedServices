/*
 * Article Data Service for Blog System
 */

//module getter
angular
    .module('blog')
    .factory('blogArticleService', blogArticleService);

blogArticleService.$inject = ['$http', 'blogValidatorService', 'blogExceptionCatcherService'];

function blogArticleService($http, blogValidatorService, blogExceptionCatcherService) {
    var METHOD = {
        GET    : 'GET',
        POST   : 'POST',
        PUT    : 'PUT',
        PATCH  : 'PATCH',
        DELETE : 'DELETE'
    };
    var service = {
        /* Create */
        createArticle           :  createArticle,

        /* Read */
        readAllArticle          :  readAllArticle,
        readArticleInCategory   :  readArticleInCategory,
        readArticle             :  readArticle,

        /* Update */
        updateArticle           :  updateArticle,
        partiallyUpdateArticle  :  partiallyUpdateArticle,

        /* Delete */
        deleteAllArticle        :  deleteAllArticle,
        deleteArticleInCategory :  deleteArticleInCategory,
        deleteArticle           :  deleteArticle
    };
    return service;

    /*
     * public functions
     */

    /* Create */

    /*
     * @desc Create an article
     * @param {String} category the category that the article belongs to
     * @param {Object} article  the article object to be created
     * @returns {Object}  the created article
     * @throws {Object}  the error object when failing to create
     */
    function createArticle(category, article) {

    }


    /* Read */

    /*
     * @desc Read all articles
     * @returns {Array}  an array containing all the article objects
     * @throws {Object}  the error object when failing to read
     */
    function readAllArticle() {

    }

    /*
     * @desc Read all articles in certain category
     * @param {String} category category to read
     * @returns {Array}  an array containing all the article objects
     * @throws {Object}  the error object when failing to read
     */
    function readArticleInCategory(category) {

    }

    /*
     * @desc Read certain article
     * @param {String} category category to read
     * @param {String} id the ID of the article to be red
     * @returns {Object}  the article object
     * @throws {Object}  the error object when failing to read
     */
    function readArticle(category, id) {

    }


    /* Update*/

    /*
     * @desc Update certain article
     * @param {String} category category to update
     * @param {String} id the ID of the article to be updated
     * @returns {Object}  the article object
     * @throws {Object}  the error object when failing to update
     */
    function updateArticle(category, id, article) {

    }

    /*
     * @desc Partially update certain article
     * @param {String} category category to update
     * @param {String} id the ID of the article to be updated
     * @returns {Object}  the article object
     * @throws {Object}  the error object when failing to update
     */
    function partiallyUpdateArticle(category, id, article) {

    }


    /* Delete */

    /*
     * @desc Delete all articles
     * @returns {Array}  an array containing all the deleted article objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteAllArticle() {

    }

    /*
     * @desc Delete all articles in certain category
     * @param {String} category category to delete
     * @returns {Array}  an array containing all the deleted article objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteArticleInCategory(category) {

    }

    /*
     * @desc Delete certain article
     * @param {String} category category to read
     * @param {String} id the ID of the article to be deleted
     * @returns {Object}  the deleted article object
     * @throws {Object}  the error object when failing to delete
     */
    function deleteArticle(category, id) {

    }


    /*
     * private functions
     */

    /*
     * @desc Validate the response from a http request
     * @param {Object} response the response of the request
     * @param {String} method the HTTP method of the request
     * @returns {Object}  the article object in the json body if validated,
     *                    null otherwise
     */
    function requestCompleted(response, method) {
        if (!angular.isString(method))
            return null;

        if (method === METHOD.GET)
            return getRequestCompleted(response);
        else if (method === METHOD.POST)
            return postRequestCompleted(response);
        else if (method === METHOD.PUT)
            return putRequestCompleted(response);
        else if (method === METHOD.PATCH)
            return patchRequestCompleted(response);
        else if (method === METHOD.DELETE)
            return deleteRequestCompleted(response);
        else
            return null;
    }

    /*
     * @desc Validate the response from a GET request
     * @param {Object} response the response of the request
     * @returns {Object}  the json body if validated, null otherwise
     */
    function getRequestCompleted(response) {
        if (!validateResponse(response))
            return null;

        // no content
        if (response.status === 204)
            return null;

        if (response.status === 200) {
            if (angular.isArray(response.data)) {
                // array
                return blogValidatorService.responseValidator
                                           .articleValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // article object
                return blogValidatorService.responseValidator
                                           .articleValidator
                                           .validateObject(response.data);
            } else {
                return null;
            }
        }

        return null;
    }

    /*
     * @desc Validate the response from a POST request
     * @param {Object} response the response of the request
     * @returns {Object}  the article object in the json body if validated,
     *                    null otherwise
     */
    function postRequestCompleted(response) {
        if (!validateResponse(response))
            return null;

        if (response.status === 201)
            return blogValidatorService.responseValidator
                                       .articleValidator
                                       .validateObject(response.data);

        return null;
    }

    /*
     * @desc Validate the response from a PUT request
     * @param {Object} response the response of the request
     * @returns {Object}  the article object in the json body if validated,
     *                    null otherwise
     */
    function putRequestCompleted(response) {
        if (!validateResponse(response))
            return null;

        if (response.status === 200)
            return blogValidatorService.responseValidator
                                       .articleValidator
                                       .validateObject(response.data);

        return null;
    }

    /*
     * @desc Validate the response from a PATCH request
     * @param {Object} response the response of the request
     * @returns {Object}  the article object in the json body if validated,
     *                    null otherwise
     */
    function patchRequestCompleted(response) {
        if (!validateResponse(response))
            return null;

        if (response.status === 200)
            return blogValidatorService.responseValidator
                                       .articleValidator
                                       .validateObject(response.data);

        return null;
    }

    /*
     * @desc Validate the response from a DELETE request
     * @param {Object} response the response of the request
     * @returns {Object}  the article object in the json body if validated,
     *                    null otherwise
     */
    function deleteRequestCompleted(response) {
        if (!validateResponse(response))
            return null;

        // no content
        if (response.status === 204)
            return null;

        if (response.status === 200) {
            if (angular.isArray(response.data)) {
                // array
                return blogValidatorService.responseValidator
                                           .articleValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // article object
                return blogValidatorService.responseValidator
                                           .articleValidator
                                           .validateObject(response.data);
            } else {
                return null;
            }
        }

        return null;
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