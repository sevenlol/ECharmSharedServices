/*
 * Rating Data Service for Ask Doctor System
 */

(function() {
    "use strict";

    //module getter
    angular
        .module('data.askdoctor')
        .factory('askdoctorRatingService', askdoctorRatingService);

    askdoctorRatingService.$inject = [
        '$http',
        'askdoctorResponseHandlerService',
        'askdoctorValidatorService',
        'askdoctorExceptionCatcherService',
        'valueService',
        'Logger'
    ];

    function askdoctorRatingService($http, askdoctorResponseHandlerService, askdoctorValidatorService,
                                    askdoctorExceptionCatcherService, valueService, Logger) {
        var SERVER_URL = valueService.SERVER_URL.ASKDOCTOR;
        var HTTP_METHOD = valueService.HTTP_METHOD;
        var REQ_VALIDATOR = {
            FILLED : askdoctorValidatorService.validator.REQ.FILLED.RATING,
            NOT_EMPTY : askdoctorValidatorService.validator.REQ.NOT_EMPTY.RATING
        };
        var RES_VALIDATOR = {
            ARRAY : askdoctorValidatorService.validator.RES.ARRAY.RATING,
            OBJECT : askdoctorValidatorService.validator.RES.OBJECT.RATING
        };
        var RES_FAILED_CALLBACK = askdoctorResponseHandlerService.requestFailed;
        var REQ_COMPLETED_CALLBACK = {
            GET : askdoctorResponseHandlerService.getRequestCompleted,
            POST : askdoctorResponseHandlerService.postRequestCompleted,
            PUT : askdoctorResponseHandlerService.putRequestCompleted,
            PATCH : askdoctorResponseHandlerService.patchRequestCompleted,
            DELETE : askdoctorResponseHandlerService.deleteRequestCompleted
        };
        // Logger object
        var logger = Logger.getInstance('app - data - askdoctor - rating');
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
         * functions
         */

        function createRating(category, questionId, rating) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('createRating', 'Invalid input questionId!');
                logger.debug('createRating', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate rating object
            if (REQ_VALIDATOR.FILLED(rating) === null) {
                logger.error('createRating', 'Invalid input rating!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, '');

            if (!url) {
                logger.error('createRating', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('createRating', 'Validation done. Creating rating ...');
            return getHttpPromise(HTTP_METHOD.POST, url, rating);
        }

        function readAllRating(category, questionId) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('readAllRating', 'Invalid input questionId!');
                logger.debug('readAllRating', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, '');

            if (!url) {
                logger.error('readAllRating', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readAllRating', 'Validation done. Reading ratings ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readRating(category, questionId, ratingId) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('readRating', 'Invalid input questionId!');
                logger.debug('readRating', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, ratingId);

            if (!url) {
                logger.error('readRating', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readRating', 'Validation done. Reading rating ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function updateRating(category, questionId, ratingId, rating) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('updateRating', 'Invalid input questionId!');
                logger.debug('updateRating', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate ratingId
            if (!angular.isString(ratingId) || ratingId === '') {
                logger.error('updateRating', 'Invalid input ratingId!');
                logger.debug('updateRating', 'ratingId: {0}, typeof ratingId: {1}', [ ratingId, typeof ratingId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate rating object
            if (REQ_VALIDATOR.FILLED(rating) === null) {
                logger.error('updateRating', 'Invalid input rating!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, ratingId);

            if (!url) {
                logger.error('updateRating', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('updateRating', 'Validation done. Updating rating ...');
            return getHttpPromise(HTTP_METHOD.PUT, url, rating);
        }

        function partiallyUpdateRating(category, questionId, ratingId, rating) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('partiallyUpdateRating', 'Invalid input questionId!');
                logger.debug('partiallyUpdateRating', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate ratingId
            if (!angular.isString(ratingId) || ratingId === '') {
                logger.error('partiallyUpdateRating', 'Invalid input ratingId!');
                logger.debug('partiallyUpdateRating', 'ratingId: {0}, typeof ratingId: {1}', [ ratingId, typeof ratingId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate rating object
            if (REQ_VALIDATOR.NOT_EMPTY(rating) === null) {
                logger.error('partiallyUpdateRating', 'Invalid input rating!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, ratingId);

            if (!url) {
                logger.error('partiallyUpdateRating', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('partiallyUpdateRating', 'Validation done. Partially updating rating ...');
            return getHttpPromise(HTTP_METHOD.PATCH, url, rating);
        }

        function deleteAllRating(category, questionId) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('deleteAllRating', 'Invalid input questionId!');
                logger.debug('deleteAllRating', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, '');

            if (!url) {
                logger.error('deleteAllRating', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('deleteAllRating', 'Validation done. Deleting ratings ...');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null);
        }

        function deleteRating(category, questionId, ratingId) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('deleteRating', 'Invalid input questionId!');
                logger.debug('deleteRating', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate ratingId
            if (!angular.isString(ratingId) || ratingId === '') {
                logger.error('deleteRating', 'Invalid input ratingId!');
                logger.debug('deleteRating', 'ratingId: {0}, typeof ratingId: {1}', [ ratingId, typeof ratingId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, ratingId);

            if (!url) {
                logger.error('deleteRating', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('deleteRating', 'Validation done. Deleting rating ...');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null);
        }

        function assembleURL(SERVER_URL, category, questionId, ratingId) {
            if (!angular.isString(SERVER_URL) ||
                !angular.isString(category)   ||
                !angular.isString(questionId)  ||
                !angular.isString(ratingId)) {
                logger.error('assembleURL', 'Invalid input type!');
                logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, questionId: {2}, ratingId: {3}',
                    [typeof SERVER_URL, typeof category, typeof questionId, typeof ratingId]);
                return '';
            }

            // SERVER_URL == '' or category == '' or questionId == ''
            if (!SERVER_URL ||
                !category   ||
                !questionId) {
                logger.error('assembleURL', 'Empty input string!');
                logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, questionId: {2}',
                    [SERVER_URL, category, questionId]);
                return '';
            }

            var assembledUrl = SERVER_URL + '/questions';
            assembledUrl += '/' + category;
            assembledUrl += '/' + questionId + '/ratings';

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

        function getHttpPromise(method, url, rating) {
            var reqCompletedCallback;
            if (method === HTTP_METHOD.GET) {
                reqCompletedCallback = (function(validateArray, validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.GET(response, validateArray, validateObject);
                    };
                })(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT);
                return  $http
                            .get(url)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.POST) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.POST(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .post(url, rating)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PUT) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PUT(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .put(url, rating)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PATCH) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PATCH(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .patch(url, rating)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.DELETE) {
                reqCompletedCallback = (function(validateArray, validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.DELETE(response, validateArray, validateObject);
                    };
                })(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT);
                return  $http
                            .delete(url)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            }

            // wrong HTTP method
            throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }
    }

})();