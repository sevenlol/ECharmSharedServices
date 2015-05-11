/*
 * Rating Data Service for Blog System
 */

//module getter
angular
    .module('data.blog')
    .factory('blogRatingService', blogRatingService);

blogRatingService.$inject = [
    '$http',
    'blogValidatorService',
    'blogExceptionCatcherService',
    'valueService',
    'Logger'
];

function blogRatingService($http, blogValidatorService, blogExceptionCatcherService, valueService, Logger) {
    // TODO put SERVER_URL in another module
    var SERVER_URL = valueService.SERVER_URL.BLOG;

    // Logger object
    var logger = Logger.getInstance('app - data - blog - rating');

    var service = {
        /* Create */
        createRating           :  createRating,

        /* Read */
        readAllRating          :  readAllRating,
        readRating             :  readRating,

        /* Update */
        updateRating           :  updateRating,
        partiallyUpdateRating  :  partiallyUpdateRating,

        /* Delete*/
        deleteAllRating        :  deleteAllRating,
        deleteRating           :  deleteRating
    };
    return service;

    /*
     * public functions
     */

    /* Create */

    /*
     * @desc Create an rating under an article
     * @param {String} category the category that the article belongs to
     * @param {String} articleId article id that the rating belongs to
     * @param {Object} rating the rating object to be created
     * @returns {Object}  the created rating
     * @throws {Object}  the error object when failing to create
     */
    function createRating(category, articleId, rating) {
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('createRating', 'Invalid input articleId!');
            logger.debug('createRating', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate rating object
        if (blogValidatorService.requestValidator
                                .ratingValidator
                                .validateFilled(rating) === null) {
            logger.error('createRating', 'Invalid input rating!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, '');

        if (!url) {
            logger.error('createRating', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('createRating', 'Validation done. Creating rating ...');
        return $http.post(url, rating)
                    .then(postRequestCompleted)
                    .catch(requestFailed);
    }

    /* Read */

    /*
     * @desc Read all ratings under an article in certain category
     * @param {String} category category to read
     * @param {String} articleId article id that the rating belongs to
     * @returns {Array}  an array containing all the rating objects
     * @throws {Object}  the error object when failing to read
     */
    function readAllRating(category, articleId) {
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('readAllRating', 'Invalid input articleId!');
            logger.debug('readAllRating', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, '');

        if (!url) {
            logger.error('readAllRating', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('readAllRating', 'Validation done. Reading ratings ...');
        return $http.get(url)
                    .then(getRequestCompleted)
                    .catch(requestFailed);
    }

    /*
     * @desc Read certain rating
     * @param {String} category category to read
     * @param {String} articleId article id that the rating belongs to
     * @param {String} ratingId the ID of the rating to be red
     * @returns {Object}  the rating object
     * @throws {Object}  the error object when failing to read
     */
    function readRating(category, articleId, ratingId) {
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('readRating', 'Invalid input articleId!');
            logger.debug('readRating', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, ratingId);

        if (!url) {
            logger.error('readRating', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('readRating', 'Validation done. Reading rating ...');
        return $http.get(url)
                    .then(getRequestCompleted)
                    .catch(requestFailed);
    }

    /* Update */

    /*
     * @desc Update certain rating
     * @param {String} category category of the rating
     * @param {String} articleId article id that the rating belongs to
     * @param {String} ratingId the ID of the rating to be updated
     * @param {Object} rating the rating object to update
     * @returns {Object}  the rating object
     * @throws {Object}  the error object when failing to update
     */
    function updateRating(category, articleId, ratingId, rating) {
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('updateRating', 'Invalid input articleId!');
            logger.debug('updateRating', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate ratingId
        if (!angular.isString(ratingId) || ratingId === '') {
            logger.error('updateRating', 'Invalid input ratingId!');
            logger.debug('updateRating', 'ratingId: {0}, typeof ratingId: {1}', [ ratingId, typeof ratingId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate rating object
        if (blogValidatorService.requestValidator
                                .ratingValidator
                                .validateFilled(rating) === null) {
            logger.error('updateRating', 'Invalid input rating!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, ratingId);

        if (!url) {
            logger.error('updateRating', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('updateRating', 'Validation done. Updating rating ...');
        return $http.put(url, rating)
                    .then(putRequestCompleted)
                    .catch(requestFailed);
    }

    /*
     * @desc Partially update certain rating
     * @param {String} category category of the rating
     * @param {String} articleId article id that the rating belongs to
     * @param {String} ratingId the ID of the rating to be updated
     * @param {Object} rating the rating object to update
     * @returns {Object}  the rating object
     * @throws {Object}  the error object when failing to update
     */
    function partiallyUpdateRating(category, articleId, ratingId, rating) {
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('partiallyUpdateRating', 'Invalid input articleId!');
            logger.debug('partiallyUpdateRating', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate ratingId
        if (!angular.isString(ratingId) || ratingId === '') {
            logger.error('partiallyUpdateRating', 'Invalid input ratingId!');
            logger.debug('partiallyUpdateRating', 'ratingId: {0}, typeof ratingId: {1}', [ ratingId, typeof ratingId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate rating object
        if (blogValidatorService.requestValidator
                                .ratingValidator
                                .validateNotEmpty(rating) === null) {
            logger.error('partiallyUpdateRating', 'Invalid input rating!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, ratingId);

        if (!url) {
            logger.error('partiallyUpdateRating', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('partiallyUpdateRating', 'Validation done. Partially updating rating ...');
        return $http.patch(url, rating)
                    .then(putRequestCompleted)
                    .catch(requestFailed);
    }

    /* Delete */

    /*
     * @desc Delete all ratings under certain article in certain category
     * @param {String} category category to delete
     * @param {String} articleId article id that the rating belongs to
     * @returns {Array}  an array containing all the deleted rating objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteAllRating(category, articleId) {
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('deleteAllRating', 'Invalid input articleId!');
            logger.debug('deleteAllRating', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, '');

        if (!url) {
            logger.error('deleteAllRating', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('deleteAllRating', 'Validation done. Deleting ratings ...');
        return $http.delete(url)
                    .then(deleteRequestCompleted)
                    .catch(requestFailed);
    }

    /*
     * @desc Delete certain rating
     * @param {String} category category to read
     * @param {String} articleId article id that the rating belongs to
     * @param {String} ratingId the ID of the rating to be deleted
     * @returns {Object}  the deleted rating object
     * @throws {Object}  the error object when failing to delete
     */
    function deleteRating(category, articleId, ratingId) {
        // TODO validate category

        // validate articleId
        if (!angular.isString(articleId) || articleId === '') {
            logger.error('deleteRating', 'Invalid input articleId!');
            logger.debug('deleteRating', 'articleId: {0}, typeof articleId: {1}', [ articleId, typeof articleId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        // validate ratingId
        if (!angular.isString(ratingId) || ratingId === '') {
            logger.error('deleteRating', 'Invalid input ratingId!');
            logger.debug('deleteRating', 'ratingId: {0}, typeof ratingId: {1}', [ ratingId, typeof ratingId ]);
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, ratingId);

        if (!url) {
            logger.error('deleteRating', 'Url assemble failed!');
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        logger.log('deleteRating', 'Validation done. Deleting rating ...');
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
     * @param {String} ratingId the rating id. if not needed, set to ''
     * @param {String}  the assembled url
     */
    function assembleURL(SERVER_URL, category, articleId, ratingId) {
        if (!angular.isString(SERVER_URL) ||
            !angular.isString(category)   ||
            !angular.isString(articleId)  ||
            !angular.isString(ratingId)) {
            logger.error('assembleURL', 'Invalid input type!');
            logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, articleId: {2}, ratingId: {3}',
                [typeof SERVER_URL, typeof category, typeof articleId, typeof ratingId]);
            return '';
        }

        // SERVER_URL == '' or category == '' or articleId == ''
        if (!SERVER_URL ||
            !category   ||
            !articleId) {
            logger.error('assembleURL', 'Empty input string!');
            logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, articleId: {2}',
                [SERVER_URL, category, articleId]);
            return '';
        }

        var assembledUrl = SERVER_URL + '/articles';
        assembledUrl += '/' + category;
        assembledUrl += '/' + articleId + '/ratings';

        // ratingId == ''
        if (!ratingId) {
            logger.debug('assembleURL', 'Empty Input String: {0}!', [ 'ratingId' ]);
            logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
            return assembledUrl;
        }
        assembledUrl += '/' + ratingId;

        logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
        return assembledUrl;
    }

    /*
     * @desc Validate the response from a GET request
     * @param {Object} response the response of the request
     * @returns {Object}  the rating object in the json body if validated,
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
                                           .ratingValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // rating object
                logger.log('getRequestCompleted', 'Response data type: article object!');
                return blogValidatorService.responseValidator
                                           .ratingValidator
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
     * @returns {Object}  the rating object in the json body if validated,
     *                    null otherwise
     */
    function postRequestCompleted(response) {
        if (!validateResponse(response))
            return null;

        if (response.status === 201)
            return blogValidatorService.responseValidator
                                       .ratingValidator
                                       .validateObject(response.data);

        return null;
    }

    /*
     * @desc Validate the response from a PUT request
     * @param {Object} response the response of the request
     * @returns {Object}  the rating object in the json body if validated,
     *                    null otherwise
     */
    function putRequestCompleted(response) {
        if (!validateResponse(response)) {
            logger.error('postRequestCompleted', 'Invalid input response');
            return null;
        }

        if (response.status === 200) {
            logger.log('postRequestCompleted', 'Response status: {0} => {1}!', [201, 'Created']);
            return blogValidatorService.responseValidator
                                       .ratingValidator
                                       .validateObject(response.data);
        }

        logger.error('postRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate the response from a PATCH request
     * @param {Object} response the response of the request
     * @returns {Object}  the rating object in the json body if validated,
     *                    null otherwise
     */
    function patchRequestCompleted(response) {
        if (!validateResponse(response)) {
            logger.error('putRequestCompleted', 'Invalid input response');
            return null;
        }

        if (response.status === 200) {
            logger.log('putRequestCompleted', 'Response status: {0} => {1}!', [200, 'Succeeded']);
            return blogValidatorService.responseValidator
                                       .ratingValidator
                                       .validateObject(response.data);
        }

        logger.error('putRequestCompleted', 'Response status: {0}!', [ response.status ]);
        return null;
    }

    /*
     * @desc Validate the response from a DELETE request
     * @param {Object} response the response of the request
     * @returns {Object}  the rating object in the json body if validated,
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
                                           .ratingValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // rating object
                logger.log('deleteRequestCompleted', 'Response data type: article object!');
                return blogValidatorService.responseValidator
                                           .ratingValidator
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