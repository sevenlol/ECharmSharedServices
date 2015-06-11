/*
 * Answer Data Service for Ask Doctor System
 */

(function() {
    "use strict";

	//module getter
	angular
	    .module('data.askdoctor')
	    .factory('askdoctorAnswerService', askdoctorAnswerService);

	askdoctorAnswerService.$inject = [
		'$http',
        'askdoctorResponseHandlerService',
        'askdoctorValidatorService',
        'askdoctorExceptionCatcherService',
        'valueService',
        'Logger'
	];

	function askdoctorAnswerService($http, askdoctorResponseHandlerService, askdoctorValidatorService, askdoctorExceptionCatcherService, valueService, Logger) {
	    var SERVER_URL = valueService.SERVER_URL.ASKDOCTOR;
        var HTTP_METHOD = valueService.HTTP_METHOD;
        var REQ_VALIDATOR = {
            FILLED : askdoctorValidatorService.validator.REQ.FILLED.ANSWER,
            NOT_EMPTY : askdoctorValidatorService.validator.REQ.NOT_EMPTY.ANSWER
        };
        var RES_VALIDATOR = {
            ARRAY : askdoctorValidatorService.validator.RES.ARRAY.ANSWER,
            OBJECT : askdoctorValidatorService.validator.RES.OBJECT.ANSWER
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
        var logger = Logger.getInstance('app - data - askdoctor - answer');
	    var service = {
	    	/* Create */
            createAnswer           :  createAnswer,

            /* Read */
            readAllAnswer          :  readAllAnswer,
            readAnswer             :  readAnswer,

            /* Update */
            updateAnswer           :  updateAnswer,
            partiallyUpdateAnswer  :  partiallyUpdateAnswer,

            /* Delete*/
            deleteAllAnswer        :  deleteAllAnswer,
            deleteAnswer           :  deleteAnswer
	    };
	    return service;

	    /*
	     * public functions
	     */

	    function createAnswer(category, questionId, answer) {
	    	// TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('createAnswer', 'Invalid input questionId!');
                logger.debug('createAnswer', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate answer object
            if (REQ_VALIDATOR.FILLED(answer) === null) {
                logger.error('createAnswer', 'Invalid input answer!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, '');

            if (!url) {
                logger.error('createAnswer', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('createAnswer', 'Validation done. Creating answer ...');
            return getHttpPromise(HTTP_METHOD.POST, url, answer);
	    }

	    function readAllAnswer(category, questionId) {
	    	// TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('readAllAnswer', 'Invalid input questionId!');
                logger.debug('readAllAnswer', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, '');

            if (!url) {
                logger.error('readAllAnswer', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readAllAnswer', 'Validation done. Reading answers ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
	    }

	    function readAnswer(category, questionId, answerId) {
	    	// TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('readAnswer', 'Invalid input questionId!');
                logger.debug('readAnswer', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, answerId);

            if (!url) {
                logger.error('readAnswer', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readAnswer', 'Validation done. Reading answers ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
	    }

	    function updateAnswer(category, questionId, answerId, answer) {
	    	// TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('updateAnswer', 'Invalid input questionId!');
                logger.debug('updateAnswer', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate answerId
            if (!angular.isString(answerId) || answerId === '') {
                logger.error('updateAnswer', 'Invalid input answerId!');
                logger.debug('updateAnswer', 'answerId: {0}, typeof answerId: {1}', [ answerId, typeof answerId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate answer object
            if (REQ_VALIDATOR.FILLED(answer) === null) {
                logger.error('updateAnswer', 'Invalid input answer!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, answerId);

            if (!url) {
                logger.error('updateAnswer', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('updateAnswer', 'Validation done. Updating answer ...');
            return getHttpPromise(HTTP_METHOD.PUT, url, answer);
	    }

	    function partiallyUpdateAnswer(category, questionId, answerId, answer) {
	    	// TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('partiallyUpdateAnswer', 'Invalid input questionId!');
                logger.debug('partiallyUpdateAnswer', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate answerId
            if (!angular.isString(answerId) || answerId === '') {
                logger.error('partiallyUpdateAnswer', 'Invalid input answerId!');
                logger.debug('partiallyUpdateAnswer', 'answerId: {0}, typeof answerId: {1}', [ answerId, typeof answerId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate answer object
            if (REQ_VALIDATOR.NOT_EMPTY(answer) === null) {
                logger.error('partiallyUpdateAnswer', 'Invalid input answer!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, answerId);

            if (!url) {
                logger.error('partiallyUpdateAnswer', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('partiallyUpdateAnswer', 'Validation done. Partially updating answer ...');
            return getHttpPromise(HTTP_METHOD.PATCH, url, answer);
	    }

	    function deleteAllAnswer(category, questionId) {
	    	// TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('deleteAllAnswer', 'Invalid input questionId!');
                logger.debug('deleteAllAnswer', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, '');

            if (!url) {
                logger.error('deleteAllAnswer', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('deleteAllAnswer', 'Validation done. Deleting answers ...');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null);
	    }

	    function deleteAnswer(category, questionId, answerId) {
	    	// TODO validate category

            // validate questionId
            if (!angular.isString(questionId) || questionId === '') {
                logger.error('deleteAnswer', 'Invalid input questionId!');
                logger.debug('deleteAnswer', 'questionId: {0}, typeof questionId: {1}', [ questionId, typeof questionId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // validate answerId
            if (!angular.isString(answerId) || answerId === '') {
                logger.error('deleteAnswer', 'Invalid input answerId!');
                logger.debug('deleteAnswer', 'answerId: {0}, typeof answerId: {1}', [ answerId, typeof answerId ]);
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId, answerId);

            if (!url) {
                logger.error('deleteAnswer', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('deleteAnswer', 'Validation done. Deleting answer ...');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null);
	    }

	    /*
	     * private functions
	     */

	    function assembleURL(SERVER_URL, category, questionId, answerId) {
            if (!angular.isString(SERVER_URL) ||
                !angular.isString(category)   ||
                !angular.isString(questionId)  ||
                !angular.isString(answerId)) {
                logger.error('assembleURL', 'Invalid input type!');
                logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, questionId: {2}, answerId: {3}',
                    [typeof SERVER_URL, typeof category, typeof questionId, typeof answerId]);
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
            assembledUrl += '/' + questionId + '/answers';

            // answerId == ''
            if (!answerId) {
                logger.debug('assembleURL', 'Empty Input String: {0}!', [ 'answerId' ]);
                logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
                return assembledUrl;
            }
            assembledUrl += '/' + answerId;

            logger.debug('assembleURL', 'Assembled Url: {0}!', [ assembledUrl ]);
            return assembledUrl;
        }

        function getHttpPromise(method, url, answer) {
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
                            .post(url, answer)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PUT) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PUT(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .put(url, answer)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PATCH) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PATCH(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .patch(url, answer)
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