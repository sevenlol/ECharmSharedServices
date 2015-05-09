/*
 * Article Data Service for Blog System
 */

//module getter
angular
    .module('data.blog')
    .factory('blogArticleService', blogArticleService);

blogArticleService.$inject = ['$http', 'blogValidatorService', 'blogExceptionCatcherService', 'valueService', 'Logger'];

function blogArticleService($http, blogValidatorService, blogExceptionCatcherService, valueService, Logger) {
    // TODO put SERVER_URL in another module
    var SERVER_URL = valueService.SERVER_URL.BLOG;

    // Logger object
    var logger = Logger.getInstance('app - data - blog - article');

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
            logger.error('createArticle', 'Invalid input article!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, '');

        if (!url) {
            logger.error('createArticle', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('createArticle', 'Validation done. Creating article ...');
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

        if (!url) {
            logger.error('readAllArticle', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('readAllArticle', 'Validation done. Reading all articles ...');
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

        if (!url) {
            logger.error('readArticleInCategory', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('readArticleInCategory', 'Validation done. Reading articles ...');
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

        if (!angular.isString(id) || !id) {
            logger.error('readArticle', 'Invalid input id!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, id);

        if (!url) {
            logger.error('readArticle', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('readArticle', 'Validation done. Reading the article ...');
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
            logger.error('updateArticle', 'Invalid input article!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        if (!angular.isString(id) || !id) {
            logger.error('updateArticle', 'Invalid input id!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, id);

        if (!url) {
            logger.error('updateArticle', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('updateArticle', 'Validation done. Updating the article ...');
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
            logger.error('partiallyUpdateArticle', 'Invalid input article!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        if (!angular.isString(id) || !id) {
            logger.error('partiallyUpdateArticle', 'Invalid input id!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, id);

        if (!url) {
            logger.error('partiallyUpdateArticle', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('partiallyUpdateArticle', 'Validation done. Partially updating the article ...');
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

        if (!url) {
            logger.error('deleteAllArticle', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('deleteAllArticle', 'Validation done. Deleting all articles ...');
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

        if (!url) {
            logger.error('deleteArticleInCategory', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('deleteArticleInCategory', 'Validation done. Deleting the articles ...');
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

        if (!angular.isString(id) || !id) {
            logger.error('deleteArticle', 'Invalid input id!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, id);

        if (!url) {
            logger.error('deleteArticle', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('deleteArticle', 'Validation done. Deleting the article ...');
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
            logger.error('assembleURL', 'Invalid input type!');
            logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, articleId: {2}',
                [typeof SERVER_URL, typeof category, typeof articleId]);
            return '';
        }

        // SERVER_URL == ''
        if (!SERVER_URL) {
            logger.error('assembleURL', 'Empty Input String: {0}!', [ 'SERVER_URL' ]);
            return '';
        }

        var assembledUrl = SERVER_URL + '/articles';

        // category == ''
        if (!category) {
            logger.debug('assembleURL', 'Empty Input String: {0}!', [ 'category' ]);
            logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
            return assembledUrl;
        }
        assembledUrl += '/' + category;

        // articleId == ''
        if (!articleId) {
            logger.debug('assembleURL', 'Empty Input String: {0}!', [ 'articleId' ]);
            logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
            return assembledUrl;
        }
        assembledUrl += '/' + articleId;

        logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
        return assembledUrl;
    }

    /*
     * @desc Validate the response from a GET request
     * @param {Object} response the response of the request
     * @returns {Object}  the json body if validated, null otherwise
     */
    function getRequestCompleted(response) {
        if (!validateResponse(response)) {
            logger.error('getRequestCompleted', 'Invalid input response');
            return null;
        }

        // no content
        if (response.status === 204) {
            logger.log('getRequestCompleted', 'Response status: {0} => {1}!', [204, 'No Content']);
            return null;
        }

        if (response.status === 200) {
            logger.log('getRequestCompleted', 'Response status: {0} => {1}!', [200, 'Succeeded']);
            if (angular.isArray(response.data)) {
                // array
                logger.log('getRequestCompleted', 'Response data type: article array!');
                return blogValidatorService.responseValidator
                                           .articleValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // article object
                logger.log('getRequestCompleted', 'Response data type: article object!');
                return blogValidatorService.responseValidator
                                           .articleValidator
                                           .validateObject(response.data);
            } else {
                logger.error('getRequestCompleted', 'Response data type: {0}!', [ typeof response.data ]);
                return null;
            }
        }

        logger.error('getRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate the response from a POST request
     * @param {Object} response the response of the request
     * @returns {Object}  the article object in the json body if validated,
     *                    null otherwise
     */
    function postRequestCompleted(response) {
        if (!validateResponse(response)) {
            logger.error('postRequestCompleted', 'Invalid input response');
            return null;
        }

        if (response.status === 201) {
            logger.log('postRequestCompleted', 'Response status: {0} => {1}!', [201, 'Created']);
            return blogValidatorService.responseValidator
                                       .articleValidator
                                       .validateObject(response.data);
        }

        logger.error('postRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate the response from a PUT request
     * @param {Object} response the response of the request
     * @returns {Object}  the article object in the json body if validated,
     *                    null otherwise
     */
    function putRequestCompleted(response) {
        if (!validateResponse(response)) {
            logger.error('putRequestCompleted', 'Invalid input response');
            return null;
        }

        if (response.status === 200) {
            logger.log('putRequestCompleted', 'Response status: {0} => {1}!', [200, 'Succeeded']);
            return blogValidatorService.responseValidator
                                       .articleValidator
                                       .validateObject(response.data);
        }

        logger.error('putRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate the response from a PATCH request
     * @param {Object} response the response of the request
     * @returns {Object}  the article object in the json body if validated,
     *                    null otherwise
     */
    function patchRequestCompleted(response) {
        if (!validateResponse(response)) {
            logger.error('patchRequestCompleted', 'Invalid input response');
            return null;
        }

        if (response.status === 200) {
            logger.log('patchRequestCompleted', 'Response status: {0} => {1}!', [200, 'Succeeded']);
            return blogValidatorService.responseValidator
                                       .articleValidator
                                       .validateObject(response.data);
        }

        logger.error('patchRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate the response from a DELETE request
     * @param {Object} response the response of the request
     * @returns {Object}  the article object in the json body if validated,
     *                    null otherwise
     */
    function deleteRequestCompleted(response) {
        if (!validateResponse(response)) {
            logger.error('deleteRequestCompleted', 'Invalid input response');
            return null;
        }

        // no content
        if (response.status === 204) {
            logger.log('deleteRequestCompleted', 'Response status: {0} => {1}!', [204, 'No Content']);
            return null;
        }

        if (response.status === 200) {
            logger.log('deleteRequestCompleted', 'Response status: {0} => {1}!', [200, 'Succeeded']);
            if (angular.isArray(response.data)) {
                // array
                logger.log('deleteRequestCompleted', 'Response data type: article array!');
                return blogValidatorService.responseValidator
                                           .articleValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // article object
                logger.log('deleteRequestCompleted', 'Response data type: article object!');
                return blogValidatorService.responseValidator
                                           .articleValidator
                                           .validateObject(response.data);
            } else {
                logger.error('deleteRequestCompleted', 'Response data type: {0}!', [ typeof response.data ]);
                return null;
            }
        }

        logger.error('deleteRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate if the input object is a response object
     * @param {Object} response the input object to be checked
     * @returns {Boolean} true if the input object is a response object
     *                    false otherwise
     */
    function validateResponse(response) {
        if (!angular.isObject(response) || response === null) {
            logger.error('validateResponse', 'Invalid input response!');
            logger.debug('validateResponse', 'Response type: {0}', [ typeof response ]);
            return false;
        }

        if (!angular.isNumber(response.status)) {
            logger.error('validateResponse', 'Invalid response status!');
            logger.debug('validateResponse', 'Response status type: {0}', [ typeof response.status ]);
            return false;
        }

        return true;
    }

    /*
     * @desc Process the error object from a HTTP request
     * @param {Object} error the error object
     * @returns {Object} the processed error with a custom error message
     */
    function requestFailed(error) {
        logger.error('requestFailed', 'Request failed!');
        var parsedError = blogExceptionCatcherService.catcher(error);

        if (!(parsedError && parsedError instanceof blogExceptionCatcherService.error)) {
            logger.error('requestFailed', 'Unknown error!');
            logger.debug('requestFailed', 'Error object: {0}', [ JSON.stringify(parsedError, null, 2) ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }
        else {
            logger.error('requestFailed', 'Blog error!');
            logger.debug('requestFailed', 'Blog Error object: {0}', [ JSON.stringify(parsedError, null, 2) ]);
            throw parsedError;
        }
    }
}