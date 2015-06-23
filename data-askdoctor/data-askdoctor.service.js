/*
 * Embedded Data Service for Ask Doctor System
 *
 * Note: no validation on embedded objects atm, fix later
 */

(function() {
    "use strict";

    //module getter
    angular
        .module('data.askdoctor')
        .factory('askdoctorService', askdoctorService);

    askdoctorService.$inject = [
        '$http',
        'askdoctorResponseHandlerService',
        'askdoctorValidatorService',
        'askdoctorExceptionCatcherService',
        'valueService',
        'Logger'
    ];

    function askdoctorService($http, askdoctorResponseHandlerService, askdoctorValidatorService, askdoctorExceptionCatcherService, valueService, Logger) {
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
        var logger = Logger.getInstance('app - data - askdoctor');
        var service = {
            readEmbeddedQuestion : readEmbeddedQuestion,
            readEmbeddedQuestionInCategory : readEmbeddedQuestionInCategory,
            readAllEmbeddedQuestion : readAllEmbeddedQuestion,
            readAllEmbeddedQuestionByQuestionerId : readAllEmbeddedQuestionByQuestionerId,
            readEmbeddedQuestionInCategoryByQuestionerId : readEmbeddedQuestionInCategoryByQuestionerId,
            readAllEmbeddedQuestionByAnswererId : readAllEmbeddedQuestionByAnswererId,
            readEmbeddedQuestionInCategoryByAnswererId : readEmbeddedQuestionInCategoryByAnswererId
        };
        return service;

        /*
         * public functions
         */

        function readEmbeddedQuestion(category, questionId, withAnswers, withComments, withRatings) {
            // TODO validate category

            if (!angular.isString(questionId) || !questionId) {
                logger.error('readEmbeddedQuestion', 'Invalid input questionId!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, questionId);
            if (!url) {
                logger.error('readEmbeddedQuestion', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var queryUrl = getEmbeddedQueryUrl(withAnswers, withComments, withRatings);
            if (queryUrl) {
                url += queryUrl;
            }
            logger.debug('readEmbeddedQuestion', 'Assembled Url: {0}', [ url ]);

            logger.log('readEmbeddedQuestion', 'Validation done. Reading the question ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readEmbeddedQuestionInCategory(category, isAnswered, withAnswers, withComments, withRatings) {
            // TODO validate category

            var url = assembleURL(SERVER_URL, category, '');

            if (!url) {
                logger.error('readEmbeddedQuestionInCategory', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var queryUrl = getEmbeddedQueryUrl(withAnswers, withComments, withRatings);
            if (queryUrl) {
                url += queryUrl;
            }

            if (isAnswered) {
                if (!queryUrl) {
                    url += '?';
                } else {
                    url += '&';
                }

                url += 'is_answered=true';
            }

            logger.debug('readEmbeddedQuestionInCategory', 'Assembled Url: {0}', [ url ]);

            logger.log('readEmbeddedQuestionInCategory', 'Validation done. Reading questions ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readAllEmbeddedQuestion(isAnswered, withAnswers, withComments, withRatings) {
            var url = assembleURL(SERVER_URL, '', '');

            if (!url) {
                logger.error('readAllEmbeddedQuestion', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var queryUrl = getEmbeddedQueryUrl(withAnswers, withComments, withRatings);
            if (queryUrl) {
                url += queryUrl;
            }

            if (isAnswered) {
                if (!queryUrl) {
                    url += '?';
                } else {
                    url += '&';
                }

                url += 'is_answered=true';
            }

            logger.debug('readAllEmbeddedQuestion', 'Assembled Url: {0}', [ url ]);

            logger.log('readAllEmbeddedQuestion', 'Validation done. Reading all questions ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readAllEmbeddedQuestionByQuestionerId(questionerId, isAnswered, withAnswers, withComments, withRatings) {
            if (!angular.isString(questionerId) || !questionerId) {
                logger.error('readAllEmbeddedQuestionByQuestionerId', 'Invalid input questionerId!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, '', '');

            if (!url) {
                logger.error('readAllEmbeddedQuestionByQuestionerId', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var isFirst = true;
            var queryUrl = getEmbeddedQueryUrl(withAnswers, withComments, withRatings);
            if (queryUrl) {
                url += queryUrl;
                isFirst = false;
            }

            if (isAnswered) {
                if (isFirst) {
                    url += '?';
                } else {
                    url += '&';
                }

                url += 'is_answered=true';
                isFirst = false;
            }

            if (isFirst) {
                url += '?';
            } else {
                url += '&';
            }
            url += 'questioner_id=' + questionerId;

            logger.debug('readAllEmbeddedQuestionByQuestionerId', 'Assembled Url: {0}', [ url ]);

            logger.log('readAllEmbeddedQuestionByQuestionerId', 'Validation done. Reading all questions ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readEmbeddedQuestionInCategoryByQuestionerId(category, questionerId, isAnswered, withAnswers, withComments, withRatings) {
            if (!angular.isString(questionerId) || !questionerId) {
                logger.error('readEmbeddedQuestionInCategoryByQuestionerId', 'Invalid input questionerId!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, '');

            if (!url) {
                logger.error('readEmbeddedQuestionInCategoryByQuestionerId', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var isFirst = true;
            var queryUrl = getEmbeddedQueryUrl(withAnswers, withComments, withRatings);
            if (queryUrl) {
                url += queryUrl;
                isFirst = false;
            }

            if (isAnswered) {
                if (isFirst) {
                    url += '?';
                } else {
                    url += '&';
                }

                url += 'is_answered=true';
                isFirst = false;
            }

            if (isFirst) {
                url += '?';
            } else {
                url += '&';
            }
            url += 'questioner_id=' + questionerId;

            logger.debug('readEmbeddedQuestionInCategoryByQuestionerId', 'Assembled Url: {0}', [ url ]);

            logger.log('readEmbeddedQuestionInCategoryByQuestionerId', 'Validation done. Reading all questions ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readAllEmbeddedQuestionByAnswererId(answererId, isAnswered, withAnswers, withComments, withRatings) {
            if (!angular.isString(answererId) || !answererId) {
                logger.error('readAllEmbeddedQuestionByAnswererId', 'Invalid input answererId!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, '', '');

            if (!url) {
                logger.error('readAllEmbeddedQuestionByAnswererId', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var isFirst = true;
            var queryUrl = getEmbeddedQueryUrl(withAnswers, withComments, withRatings);
            if (queryUrl) {
                url += queryUrl;
                isFirst = false;
            }

            if (isAnswered) {
                if (isFirst) {
                    url += '?';
                } else {
                    url += '&';
                }

                url += 'is_answered=true';
                isFirst = false;
            }

            if (isFirst) {
                url += '?';
            } else {
                url += '&';
            }
            url += 'answerer_id=' + answererId;

            logger.debug('readAllEmbeddedQuestionByAnswererId', 'Assembled Url: {0}', [ url ]);

            logger.log('readAllEmbeddedQuestionByAnswererId', 'Validation done. Reading all questions ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readEmbeddedQuestionInCategoryByAnswererId(category, answererId, isAnswered, withAnswers, withComments, withRatings) {
            // TODO check category

            if (!angular.isString(answererId) || !answererId) {
                logger.error('readEmbeddedQuestionInCategoryByAnswererId', 'Invalid input answererId!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, category, '');

            if (!url) {
                logger.error('readEmbeddedQuestionInCategoryByAnswererId', 'Url assemble failed!');
                throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var isFirst = true;
            var queryUrl = getEmbeddedQueryUrl(withAnswers, withComments, withRatings);
            if (queryUrl) {
                url += queryUrl;
                isFirst = false;
            }

            if (isAnswered) {
                if (isFirst) {
                    url += '?';
                } else {
                    url += '&';
                }

                url += 'is_answered=true';
                isFirst = false;
            }

            if (isFirst) {
                url += '?';
            } else {
                url += '&';
            }
            url += 'answerer_id=' + answererId;

            logger.debug('readEmbeddedQuestionInCategoryByAnswererId', 'Assembled Url: {0}', [ url ]);

            logger.log('readEmbeddedQuestionInCategoryByAnswererId', 'Validation done. Reading all questions ...');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
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

        function getEmbeddedQueryUrl(withAnswers, withComments, withRatings) {
            if (!withAnswers && !withComments && !withRatings) {
                return '';
            }

            logger.debug('getEmbeddedQueryUrl', 'Adding embedded query parameter ...');
            var url = '?embedded=';

            var isFirst = true;
            if (withAnswers) {
                url += 'answers';
                isFirst = false;
            }

            if (withComments) {
                if (!isFirst) {
                    url += ',';
                }

                url += 'comments';
                isFirst = false;
            }

            if (withRatings) {
                if (!isFirst) {
                    url += ',';
                }

                url += 'ratings';
            }
            logger.debug('getEmbeddedQueryUrl', 'Embedded query url: {0}', [ url ]);
            return url;
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
            }

            // wrong HTTP method
            throw new Error(askdoctorExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }
    }

})();