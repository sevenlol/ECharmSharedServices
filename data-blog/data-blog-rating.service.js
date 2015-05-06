/*
 * Rating Data Service for Blog System
 */

//module getter
angular
    .module('data.blog')
    .factory('blogRatingService', blogRatingService);

blogRatingService.$inject = ['$http', 'blogValidatorService', 'blogExceptionCatcherService', 'valueService'];

function blogRatingService($http, blogValidatorService, blogExceptionCatcherService, valueService) {
    // TODO put SERVER_URL in another module
    var SERVER_URL = valueService.SERVER_URL;
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
        if (!angular.isString(articleId) || articleId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // validate rating object
        if (blogValidatorService.requestValidator
                                .ratingValidator
                                .validateFilled(rating) === null) {
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, '');

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

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
        if (!angular.isString(articleId) || articleId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        var url = assembleURL(SERVER_URL, category, articleId, '');

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

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
        if (!angular.isString(articleId) || articleId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        var url = assembleURL(SERVER_URL, category, articleId, ratingId);

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

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
        if (!angular.isString(articleId) || articleId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // validate ratingId
        if (!angular.isString(ratingId) || ratingId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // validate rating object
        if (blogValidatorService.requestValidator
                                .ratingValidator
                                .validateFilled(rating) === null) {
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, ratingId);

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

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
        if (!angular.isString(articleId) || articleId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // validate ratingId
        if (!angular.isString(ratingId) || ratingId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // validate rating object
        if (blogValidatorService.requestValidator
                                .ratingValidator
                                .validateNotEmpty(rating) === null) {
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }

        var url = assembleURL(SERVER_URL, category, articleId, ratingId);

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

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
        if (!angular.isString(articleId) || articleId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        var url = assembleURL(SERVER_URL, category, articleId, '');

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

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
        if (!angular.isString(articleId) || articleId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        // validate ratingId
        if (!angular.isString(ratingId) || ratingId === '')
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

        var url = assembleURL(SERVER_URL, category, articleId, ratingId);

        if (!url)
            throw new Error(blogExceptionCatcherService.DEFAULT_ERROR_MESSAGE);

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
            return '';
        }

        // SERVER_URL == '' or category == '' or articleId == ''
        if (!SERVER_URL ||
            !category   ||
            !articleId)
            return '';

        var assembledUrl = SERVER_URL + '/articles';
        assembledUrl += '/' + category;
        assembledUrl += '/' + articleId + '/ratings';

        // ratingId == ''
        if (!ratingId) {
            return assembledUrl;
        }
        assembledUrl += '/' + ratingId;

        return assembledUrl;
    }

    /*
     * @desc Validate the response from a GET request
     * @param {Object} response the response of the request
     * @returns {Object}  the rating object in the json body if validated,
     *                    null otherwise
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
                                           .ratingValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // rating object
                return blogValidatorService.responseValidator
                                           .ratingValidator
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
        if (!validateResponse(response))
            return null;

        if (response.status === 200)
            return blogValidatorService.responseValidator
                                       .ratingValidator
                                       .validateObject(response.data);

        return null;
    }

    /*
     * @desc Validate the response from a PATCH request
     * @param {Object} response the response of the request
     * @returns {Object}  the rating object in the json body if validated,
     *                    null otherwise
     */
    function patchRequestCompleted(response) {
        if (!validateResponse(response))
            return null;

        if (response.status === 200)
            return blogValidatorService.responseValidator
                                       .ratingValidator
                                       .validateObject(response.data);

        return null;
    }

    /*
     * @desc Validate the response from a DELETE request
     * @param {Object} response the response of the request
     * @returns {Object}  the rating object in the json body if validated,
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
                                           .ratingValidator
                                           .validateArray(response.data);
            } else if (angular.isObject(response.data)) {
                // rating object
                return blogValidatorService.responseValidator
                                           .ratingValidator
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