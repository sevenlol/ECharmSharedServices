/*
 * Comment Data Service for Ask Doctor System
 */

(function() {
    "use strict";

    //module getter
    angular
        .module('data.askdoctor')
        .factory('askdoctorCommentService', askdoctorCommentService);

    askdoctorCommentService.$inject = [
        '$http',
        'askdoctorResponseHandlerService',
        'askdoctorValidatorService',
        'askdoctorExceptionCatcherService',
        'valueService',
        'Logger'
    ];

    function askdoctorCommentService($http, askdoctorResponseHandlerService, askdoctorValidatorService, askdoctorExceptionCatcherService, valueService, Logger) {
        var SERVER_URL = valueService.SERVER_URL.ASKDOCTOR;
        var HTTP_METHOD = valueService.HTTP_METHOD;
        var REQ_VALIDATOR = {
            FILLED : askdoctorValidatorService.validator.REQ.FILLED.COMMENT,
            NOT_EMPTY : askdoctorValidatorService.validator.REQ.NOT_EMPTY.COMMENT
        };
        var RES_VALIDATOR = {
            ARRAY : askdoctorValidatorService.validator.RES.ARRAY.COMMENT,
            OBJECT : askdoctorValidatorService.validator.RES.OBJECT.COMMENT
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
        var logger = Logger.getInstance('app - data - askdoctor - comment');
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
         * functions
         */

        function createComment(category, questionId, comment) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('createComment', 'Invalid input questionId!');
                logger.debug('createComment', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate comment object
            if (REQ_VALIDATOR.FILLED(comment) === null) {
                logger.error('createComment', 'Invalid input comment!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, '');

            if (!url) {
                logger.error('createComment', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('createComment', 'Validation done. Creating comment ...');
            return getHttpPromise(HTTP_METHOD.POST, url, comment);
        }

        function readAllComment(category, questionId) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('readAllComment', 'Invalid input questionId!');
                logger.debug('readAllComment', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, '');

            if (!url) {
                logger.error('readAllComment', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readAllComment', 'Validation done. Reading comments ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readComment(category, questionId, commentId) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('readComment', 'Invalid input questionId!');
                logger.debug('readComment', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, commentId);

            if (!url) {
                logger.error('readComment', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readComment', 'Validation done. Reading comment ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function updateComment(category, questionId, commentId, comment) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('updateComment', 'Invalid input questionId!');
                logger.debug('updateComment', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate commentId
            if (!angular.isString(commentId) || commentId === '') {
                logger.error('updateComment', 'Invalid input commentId!');
                logger.debug('updateComment', 'commentId: {0}, typeof commentId: {1}', [ commentId, typeof commentId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate comment object
            if (REQ_VALIDATOR.FILLED(comment) === null) {
                logger.error('updateComment', 'Invalid input comment!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, commentId);

            if (!url) {
                logger.error('updateComment', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('updateComment', 'Validation done. Updating comment ...');
            return getHttpPromise(HTTP_METHOD.PUT, url, comment);
        }

        function partiallyUpdateComment(category, questionId, commentId, comment) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('partiallyUpdateComment', 'Invalid input questionId!');
                logger.debug('partiallyUpdateComment', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate commentId
            if (!angular.isString(commentId) || commentId === '') {
                logger.error('partiallyUpdateComment', 'Invalid input commentId!');
                logger.debug('partiallyUpdateComment', 'commentId: {0}, typeof commentId: {1}', [ commentId, typeof commentId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate comment object
            if (REQ_VALIDATOR.NOT_EMPTY(comment) === null) {
                logger.error('partiallyUpdateComment', 'Invalid input comment!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, commentId);

            if (!url) {
                logger.error('partiallyUpdateComment', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('partiallyUpdateComment', 'Validation done. Partially updating comment ...');
            return getHttpPromise(HTTP_METHOD.PATCH, url, comment);
        }

        function deleteAllComment(category, questionId) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('deleteAllComment', 'Invalid input questionId!');
                logger.debug('deleteAllComment', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, '');

            if (!url) {
                logger.error('deleteAllComment', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('deleteAllComment', 'Validation done. Deleting comments ...');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null);
        }

        function deleteComment(category, questionId, commentId) {
            // TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('deleteComment', 'Invalid input questionId!');
                logger.debug('deleteComment', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate commentId
            if (!angular.isString(commentId) || commentId === '') {
                logger.error('deleteComment', 'Invalid input commentId!');
                logger.debug('deleteComment', 'commentId: {0}, typeof commentId: {1}', [ commentId, typeof commentId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, commentId);

            if (!url) {
                logger.error('deleteComment', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('deleteComment', 'Validation done. Deleting comment ...');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null);
        }

        /*
         * private functions
         */

        function assembleURL(SERVER_URL, category, questionId, commentId) {
            if (!angular.isString(SERVER_URL) ||
                !angular.isString(category)   ||
                !angular.isString(questionId)  ||
                !angular.isString(commentId)) {
                logger.error('assembleURL', 'Invalid input type!');
                logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, questionId: {2}, commentId: {3}',
                    [typeof SERVER_URL, typeof category, typeof questionId, typeof commentId]);
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
            assembledUrl += '/' + questionId + '/comments';

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

        function getHttpPromise(method, url, comment) {
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
                            .post(url, comment)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PUT) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PUT(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .put(url, comment)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PATCH) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PATCH(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .patch(url, comment)
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