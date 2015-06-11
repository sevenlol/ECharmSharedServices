/*
 * Question Data Service for Ask Doctor System
 */

(function() {
    "use strict";

    //module getter
    angular
        .module('data.askdoctor')
        .factory('askdoctorQuestionService', askdoctorQuestionService);

    askdoctorQuestionService.$inject = [
        '$http',
        'askdoctorResponseHandlerService',
        'askdoctorValidatorService',
        'askdoctorExceptionCatcherService',
        'valueService',
        'Logger'
    ];

    function askdoctorQuestionService($http, askdoctorResponseHandlerService, askdoctorValidatorService,
                                    askdoctorExceptionCatcherService, valueService, Logger) {
        var SERVER_URL = valueService.SERVER_URL.ASKDOCTOR;
        var HTTP_METHOD = valueService.HTTP_METHOD;
        var REQ_VALIDATOR = {
            FILLED : askdoctorValidatorService.validator.REQ.FILLED.QUESTION,
            NOT_EMPTY : askdoctorValidatorService.validator.REQ.NOT_EMPTY.QUESTION
        };
        var RES_VALIDATOR = {
            ARRAY : askdoctorValidatorService.validator.RES.ARRAY.QUESTION,
            OBJECT : askdoctorValidatorService.validator.RES.OBJECT.QUESTION
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
        var logger = Logger.getInstance('app - data - askdoctor - question');
        var service = {
            /* Create */
            createQuestion          :  createQuestion,

            /* Read */
            readAllQuestion         :  readAllQuestion,
            readQuestionInCategory   :  readQuestionInCategory,
            readQuestion            :  readQuestion,

            /* Read By Field */
            readQuestionByQuestionerId : readQuestionByQuestionerId,

            /* Update */
            updateQuestion          :  updateQuestion,
            partiallyUpdateQuestion :  partiallyUpdateQuestion,

            /* Delete */
            deleteAllQuestion       :  deleteAllQuestion,
            deleteQuestionInCategory :  deleteQuestionInCategory,
            deleteQuestion          :  deleteQuestion
        };
        return service;

        /*
         * functions
         */

        function createQuestion(category, question) {
            // TODO validate category

            // validate question object
            if (REQ_VALIDATOR.FILLED(question) === null) {
                logger.error('createQuestion', 'Invalid input question!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, '');

            if (!url) {
                logger.error('createQuestion', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('createQuestion', 'Validation done. Creating question ...');
            return getHttpPromise(HTTP_METHOD.POST, url, question);
        }

        function readAllQuestion() {
            var url = assembleURL(SERVER_URL, '', '');

            if (!url) {
                logger.error('readAllQuestion', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readAllQuestion', 'Validation done. Reading all questions ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readQuestionInCategory(category) {
            // TODO validate category

            var url = assembleURL(SERVER_URL, category, '');

            if (!url) {
                logger.error('readQuestionInCategory', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readQuestionInCategory', 'Validation done. Reading questions ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readQuestion(category, questionId) {
            // TODO validate category

            if (!angular.isString(questionId) || !questionId) {
                logger.error('readQuestion', 'Invalid input questionId!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId);

            if (!url) {
                logger.error('readQuestion', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readQuestion', 'Validation done. Reading the question ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readQuestionByQuestionerId(category, questionerId) {
            // TODO validate category
            // NOTE category is allowed to be empty

            if (!angular.isString(questionerId) || !questionerId) {
                logger.error('readQuestionByQuestionerId', 'questionerId is not a string or is an empty string!');
                logger.debug('readQuestionByQuestionerId', 'questionerId: {0}', [ questionerId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, '');

            if (!url) {
                logger.error('readQuestionByQuestionerId', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // add questioner_id filtering
            url += '?questioner_id=' + questionerId;

            logger.log('readQuestionByQuestionerId', 'Validation done. Reading questions ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function updateQuestion(category, questionId, question) {
            // TODO validate category

            // validate question object
            if (REQ_VALIDATOR.FILLED(question) === null) {
                logger.error('updateQuestion', 'Invalid input question!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            if (!angular.isString(questionId) || !questionId) {
                logger.error('updateQuestion', 'Invalid input questionId!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId);

            if (!url) {
                logger.error('updateQuestion', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('updateQuestion', 'Validation done. Updating the question ...');
            return getHttpPromise(HTTP_METHOD.PUT, url, question);
        }

        function partiallyUpdateQuestion(category, questionId, question) {
            // TODO validate category

            // validate question object
            if (REQ_VALIDATOR.NOT_EMPTY(question) === null) {
                logger.error('partiallyUpdateQuestion', 'Invalid input question!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            if (!angular.isString(questionId) || !questionId) {
                logger.error('partiallyUpdateQuestion', 'Invalid input questionId!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId);

            if (!url) {
                logger.error('partiallyUpdateQuestion', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('partiallyUpdateQuestion', 'Validation done. Updating the question ...');
            return getHttpPromise(HTTP_METHOD.PATCH, url, question);
        }

        function deleteAllQuestion() {
            var url = assembleURL(SERVER_URL, '', '');

            if (!url) {
                logger.error('deleteAllQuestion', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('deleteAllQuestion', 'Validation done. Deleting all questions ...');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null);
        }

        function deleteQuestionInCategory(category) {
            // TODO validate category

            var url = assembleURL(SERVER_URL, category, '');

            if (!url) {
                logger.error('deleteQuestionInCategory', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('deleteQuestionInCategory', 'Validation done. Deleting the questions ...');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null);
        }

        function deleteQuestion(category, questionId) {
            // TODO validate category

            if (!angular.isString(questionId) || !questionId) {
                logger.error('deleteQuestion', 'Invalid input questionId!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId);

            if (!url) {
                logger.error('deleteQuestion', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('deleteQuestion', 'Validation done. Deleting the question ...');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null);
        }

        /*
         * private functions
         */

        function assembleURL(SERVER_URL, category, questionId) {
            if (!angular.isString(SERVER_URL) ||
                !angular.isString(category)   ||
                !angular.isString(questionId)) {
                logger.error('assembleURL', 'Invalid input type!');
                logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, questionId: {2}',
                    [typeof SERVER_URL, typeof category, typeof questionId]);
                return '';
            }

            // SERVER_URL == ''
            if (!SERVER_URL) {
                logger.error('assembleURL', 'Empty Input String: {0}!', [ 'SERVER_URL' ]);
                return '';
            }

            var assembledUrl = SERVER_URL + '/questions';

            // category == ''
            if (!category) {
                logger.debug('assembleURL', 'Empty Input String: {0}!', [ 'category' ]);
                logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
                return assembledUrl;
            }
            assembledUrl += '/' + category;

            // questionId == ''
            if (!questionId) {
                logger.debug('assembleURL', 'Empty Input String: {0}!', [ 'questionId' ]);
                logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
                return assembledUrl;
            }
            assembledUrl += '/' + questionId;

            logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
            return assembledUrl;
        }

        function getHttpPromise(method, url, question) {
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
                            .post(url, question)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PUT) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PUT(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .put(url, question)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PATCH) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PATCH(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .patch(url, question)
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
