/*
 * Article Data Service for Blog System
 */

//module getter
angular
    .module('data.blog')
    .factory('blogArticleService', blogArticleService);

blogArticleService.$inject = ['$http', 'blogValidatorService', 'blogExceptionCatcherService'];

function blogArticleService($http, blogValidatorService, blogExceptionCatcherService) {
    // TODO put SERVER_URL in another module
    var SERVER_URL = 'http://localhost:8080';
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
        // TODO validate category

        // validate article object
        if (blogValidatorService.requestValidator
                                .articleValidator
                                .validateFilled(article) === null) {
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, '');

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return $http.post(url, article)
                    .then(postRequestCompleted)
                    .catch(requestFailed);
    }


    /* Read */

    /*
     * @desc Read all articles
     * @returns {Array}  an array containing all the article objects
     * @throws {Object}  the error object when failing to read
     */
    function readAllArticle() {
        var url = assembleURL(SERVER_URL, '', '');

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return $http.get(url)
                    .then(getRequestCompleted)
                    .catch(requestFailed);
    }

    /*
     * @desc Read all articles in certain category
     * @param {String} category category to read
     * @returns {Array}  an array containing all the article objects
     * @throws {Object}  the error object when failing to read
     */
    function readArticleInCategory(category) {
        // TODO validate category

        var url = assembleURL(SERVER_URL, category, '');

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return $http.get(url)
                    .then(getRequestCompleted)
                    .catch(requestFailed);
    }

    /*
     * @desc Read certain article
     * @param {String} category category to read
     * @param {String} id the ID of the article to be red
     * @returns {Object}  the article object
     * @throws {Object}  the error object when failing to read
     */
    function readArticle(category, id) {
        // TODO validate category

        var url = assembleURL(SERVER_URL, category, id);

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return $http.get(url)
                    .then(getRequestCompleted)
                    .catch(requestFailed);
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
        // TODO validate category

        // validate article object
        if (blogValidatorService.requestValidator
                                .articleValidator
                                .validateFilled(article) === null) {
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, id);

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return $http.put(url, article)
                    .then(putRequestCompleted)
                    .catch(requestFailed);
    }

    /*
     * @desc Partially update certain article
     * @param {String} category category to update
     * @param {String} id the ID of the article to be updated
     * @returns {Object}  the article object
     * @throws {Object}  the error object when failing to update
     */
    function partiallyUpdateArticle(category, id, article) {
        // TODO validate category

        // validate article object
        if (blogValidatorService.requestValidator
                                .articleValidator
                                .validateNotEmpty(article) === null) {
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, id);

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return $http.patch(url, article)
                    .then(patchRequestCompleted)
                    .catch(requestFailed);
    }


    /* Delete */

    /*
     * @desc Delete all articles
     * @returns {Array}  an array containing all the deleted article objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteAllArticle() {
        var url = assembleURL(SERVER_URL, '', '');

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return $http.delete(url)
                    .then(deleteRequestCompleted)
                    .catch(requestFailed);
    }

    /*
     * @desc Delete all articles in certain category
     * @param {String} category category to delete
     * @returns {Array}  an array containing all the deleted article objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteArticleInCategory(category) {
        // TODO validate category

        var url = assembleURL(SERVER_URL, category, '');

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return $http.delete(url)
                    .then(deleteRequestCompleted)
                    .catch(requestFailed);
    }

    /*
     * @desc Delete certain article
     * @param {String} category category to read
     * @param {String} id the ID of the article to be deleted
     * @returns {Object}  the deleted article object
     * @throws {Object}  the error object when failing to delete
     */
    function deleteArticle(category, id) {
        // TODO validate category

        var url = assembleURL(SERVER_URL, category, id);

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        return $http.delete(url)
                    .then(deleteRequestCompleted)
                    .catch(requestFailed);
    }


    /*
     * private functions
     */

    /*
     * @desc Assemble url based on server's url, category and article id
     * @param {String} SERVER_URL server's url
     * @param {String} category the category. if not needed, set to ''
     * @param {String} articleId the article id. if not needed, set to ''
     * @param {String}  the assembled url
     */
    function assembleURL(SERVER_URL, category, articleId) {
        if (!angular.isString(SERVER_URL) ||
            !angular.isString(category)   ||
            !angular.isString(articleId)) {
            return '';
        }

        // SERVER_URL == ''
        if (!SERVER_URL)
            return '';

        var assembledUrl = SERVER_URL + '/articles';

        // category == ''
        if (!category) {
            return assembledUrl;
        }
        assembledUrl += '/' + category;

        // articleId == ''
        if (!articleId) {
            return assembledUrl;
        }
        assembledUrl += '/' + articleId;

        return assembledUrl;
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
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        else
            throw parsedError;
    }
}