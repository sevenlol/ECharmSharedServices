/*
 * Comment Data Service for Blog System
 */

//module getter
angular
    .module('data.blog')
    .factory('blogCommentService', blogCommentService);

blogCommentService.$inject = [
    '$http',
    'blogValidatorService',
    'blogExceptionCatcherService',
    'valueService',
    'Logger'
];

function blogCommentService($http, blogValidatorService, blogExceptionCatcherService, valueService, Logger) {
    // TODO put SERVER_URL in another module
    var SERVER_URL = valueService.SERVER_URL.BLOG;

    // Logger object
    var logger = Logger.getInstance('app - data - blog - comment');

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
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('createComment', 'Invalid input articleId!');
            logger.debug('createComment', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate comment object
        if (blogValidatorService.requestValidator
                                .commentValidator
                                .validateFilled(comment) === null) {
            logger.error('createComment', 'Invalid input comment!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, '');

        if (!url) {
            logger.error('createComment', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('createComment', 'Validation done. Creating comment ...');
        return $http.post(url, comment)
                    .then(postRequestCompleted)
                    .catch(requestFailed);
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
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('readAllComment', 'Invalid input articleId!');
            logger.debug('readAllComment', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, '');

        if (!url) {
            logger.error('readAllComment', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('readAllComment', 'Validation done. Reading comments ...');
        return $http.get(url)
                    .then(getRequestCompleted)
                    .catch(requestFailed);
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
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('readComment', 'Invalid input articleId!');
            logger.debug('readComment', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, commentId);

        if (!url) {
            logger.error('readComment', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('readComment', 'Validation done. Reading comment ...');
        return $http.get(url)
                    .then(getRequestCompleted)
                    .catch(requestFailed);
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
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('updateComment', 'Invalid input articleId!');
            logger.debug('updateComment', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate commentId
        if (!angular.isString(commentId) || commentId === '') {
            logger.error('updateComment', 'Invalid input commentId!');
            logger.debug('updateComment', 'commentId: {0}, typeof commentId: {1}', [ commentId, typeof commentId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate comment object
        if (blogValidatorService.requestValidator
                                .commentValidator
                                .validateFilled(comment) === null) {
            logger.error('updateComment', 'Invalid input comment!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, commentId);

        if (!url) {
            logger.error('updateComment', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('updateComment', 'Validation done. Reading comment ...');
        return $http.put(url, comment)
                    .then(putRequestCompleted)
                    .catch(requestFailed);
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
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('partiallyUpdateComment', 'Invalid input articleId!');
            logger.debug('partiallyUpdateComment', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate commentId
        if (!angular.isString(commentId) || commentId === '') {
            logger.error('partiallyUpdateComment', 'Invalid input commentId!');
            logger.debug('partiallyUpdateComment', 'commentId: {0}, typeof commentId: {1}', [ commentId, typeof commentId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate comment object
        if (blogValidatorService.requestValidator
                                .commentValidator
                                .validateNotEmpty(comment) === null) {
            logger.error('partiallyUpdateComment', 'Invalid input comment!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, commentId);

        if (!url) {
            logger.error('partiallyUpdateComment', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('partiallyUpdateComment', 'Validation done. Reading comment ...');
        return $http.patch(url, comment)
                    .then(putRequestCompleted)
                    .catch(requestFailed);
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
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('deleteAllComment', 'Invalid input articleId!');
            logger.debug('deleteAllComment', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, '');

        if (!url) {
            logger.error('deleteAllComment', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('deleteAllComment', 'Validation done. Deleting comments ...');
        return $http.delete(url)
                    .then(deleteRequestCompleted)
                    .catch(requestFailed);
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
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('deleteComment', 'Invalid input articleId!');
            logger.debug('deleteComment', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate commentId
        if (!angular.isString(commentId) || commentId === '') {
            logger.error('deleteComment', 'Invalid input commentId!');
            logger.debug('deleteComment', 'commentId: {0}, typeof commentId: {1}', [ commentId, typeof commentId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, commentId);

        if (!url) {
            logger.error('deleteComment', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('deleteComment', 'Validation done. Deleting comment ...');
        return $http.delete(url)
                    .then(deleteRequestCompleted)
                    .catch(requestFailed);
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
     * @returns {String}  the assembled url
     */
    function assembleURL(SERVER_URL, category, articleId, commentId) {
        if (!angular.isString(SERVER_URL) ||
            !angular.isString(category)   ||
            !angular.isString(articleId)  ||
            !angular.isString(commentId)) {
            logger.error('assembleURL', 'Invalid input type!');
            logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, articleId: {2}, commentId: {3}',
                [typeof SERVER_URL, typeof category, typeof articleId, typeof commentId]);
            return '';
        }

        // SERVER_URL == '' or category == '' or articleId == ''
        if (!SERVER_URL ||
            !category   ||
            !articleId) {
            logger.error('assembleURL', 'Empty input string!');
            logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, articleId: {2}, commentId: {3}',
                [SERVER_URL, category, articleId, commentId]);
            return '';
        }

        var assembledUrl = SERVER_URL + '/articles';
        assembledUrl += '/' + category;
        assembledUrl += '/' + articleId + '/comments';

        // commentId == ''
        if (!commentId) {
            logger.debug('assembleURL', 'Empty Input String: {0}!', [ 'commentId' ]);
            logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
            return assembledUrl;
        }
        assembledUrl += '/' + commentId;

        logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
        return assembledUrl;
    }

    /*
     * @desc Validate the response from a GET request
     * @param {Object} response the response of the request
     * @returns {Object}  the comment object in the json body if validated,
     *                    null otherwise
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
                                           .commentValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // comment object
                logger.log('getRequestCompleted', 'Response data type: article object!');
                return blogValidatorService.responseValidator
                                           .commentValidator
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
     * @returns {Object}  the comment object in the json body if validated,
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
                                       .commentValidator
                                       .validateObject(response.data);
        }

        logger.error('postRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate the response from a PUT request
     * @param {Object} response the response of the request
     * @returns {Object}  the comment object in the json body if validated,
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
                                       .commentValidator
                                       .validateObject(response.data);
        }

        logger.error('putRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate the response from a PATCH request
     * @param {Object} response the response of the request
     * @returns {Object}  the comment object in the json body if validated,
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
                                       .commentValidator
                                       .validateObject(response.data);
        }

        logger.error('patchRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate the response from a DELETE request
     * @param {Object} response the response of the request
     * @returns {Object}  the comment object in the json body if validated,
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
                                           .commentValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // comment object
                logger.log('deleteRequestCompleted', 'Response data type: article object!');
                return blogValidatorService.responseValidator
                                           .commentValidator
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