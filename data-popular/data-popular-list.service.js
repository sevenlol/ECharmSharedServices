(function() {
    'use strict';

    angular
        .module('data.popular')
        .factory('popularListService', popularListService);

    popularListService.$inject = [
        '$http',
        'popularResponseHandlerService',
        'popularValidatorService',
        'popularExceptionCatcherService',
        'valueService',
        'Logger'
    ];

    function popularListService(
        $http,
        popularResponseHandlerService,
        popularValidatorService,
        popularExceptionCatcherService,
        valueService,
        Logger) {

        /* constants */
        var SERVER_URL = valueService.SERVER_URL.POPULAR;
        var HTTP_METHOD = valueService.HTTP_METHOD;
        var POPULAR_ARTICLE_VALIDATOR = popularValidatorService.validator.ARTICLE;
        var POPULAR_QA_VALIDATOR = popularValidatorService.validator.QA;
        var POPULAR_DOCTOR_VALIDATOR = popularValidatorService.validator.DOCTOR;
        var RES_FAILED_CALLBACK = popularResponseHandlerService.requestFailed;
        var REQ_COMPLETED_CALLBACK = {
            GET : popularResponseHandlerService.getRequestCompleted,
            POST : popularResponseHandlerService.postRequestCompleted,
            PUT : popularResponseHandlerService.putRequestCompleted,
            PATCH : popularResponseHandlerService.patchRequestCompleted,
            DELETE : popularResponseHandlerService.deleteRequestCompleted
        };
        var POPULAR_TYPE = {
            ARTICLE : 'articles',
            QA : 'qas',
            DOCTOR: 'doctors'
        };

        // Logger object
        var logger = Logger.getInstance('app - data - popular - list');

        var service = {
            readAllPopularArticleList : readAllPopularArticleList,
            readPopularArticleList    : readPopularArticleList,
            readAllPopularQAList      : readAllPopularQAList,
            readPopularQAList         : readPopularQAList,
            readAllPopularDoctorList  : readAllPopularDoctorList,
            readPopularDoctorList     : readPopularDoctorList
        };
        return service;

        /* public functions */

        function readAllPopularArticleList() {
            var url = assembleURL(SERVER_URL, POPULAR_TYPE.ARTICLE, null);
            if (!url) {
                logger.error('readAllPopularArticleList', 'url assembly failed!');
                throw new Error(popularExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readAllPopularArticleList', 'Validation successfull! Reading popular article list!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, simpleValidator, simpleValidator);
        }

        function readPopularArticleList(category) {
            var url = assembleURL(SERVER_URL, POPULAR_TYPE.ARTICLE, category);
            if (!url) {
                logger.error('readPopularArticleList', 'url assembly failed!');
                throw new Error(popularExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readPopularArticleList', 'Validation successfull! Reading popular article list!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, POPULAR_ARTICLE_VALIDATOR.ARRAY, POPULAR_ARTICLE_VALIDATOR.OBJ);
        }

        function readAllPopularQAList() {
            var url = assembleURL(SERVER_URL, POPULAR_TYPE.QA, null);
            if (!url) {
                logger.error('readAllPopularQAList', 'url assembly failed!');
                throw new Error(popularExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readAllPopularQAList', 'Validation successfull! Reading popular qa list!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, simpleValidator, simpleValidator);
        }

        function readPopularQAList(category) {
            var url = assembleURL(SERVER_URL, POPULAR_TYPE.QA, category);
            if (!url) {
                logger.error('readPopularQAList', 'url assembly failed!');
                throw new Error(popularExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readPopularQAList', 'Validation successfull! Reading popular qa list!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, POPULAR_QA_VALIDATOR.ARRAY, POPULAR_QA_VALIDATOR.OBJ);
        }

        function readAllPopularDoctorList() {
            var url = assembleURL(SERVER_URL, POPULAR_TYPE.DOCTOR, null);
            if (!url) {
                logger.error('readAllPopularDoctorList', 'url assembly failed!');
                throw new Error(popularExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readAllPopularDoctorList', 'Validation successfull! Reading popular doctor list!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, simpleValidator, simpleValidator);
        }

        function readPopularDoctorList(category) {
            var url = assembleURL(SERVER_URL, POPULAR_TYPE.DOCTOR, category);
            if (!url) {
                logger.error('readPopularDoctorList', 'url assembly failed!');
                throw new Error(popularExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readPopularDoctorList', 'Validation successfull! Reading popular doctor list!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, POPULAR_DOCTOR_VALIDATOR.ARRAY, POPULAR_DOCTOR_VALIDATOR.OBJ);
        }

        /* private functions */

        function assembleURL(SERVER_URL, popularType, category) {
            if (!angular.isString(SERVER_URL)) {
                logger.error('assembleURL', 'Invalid input type: SERVER_URL');
                logger.debug('assembleURL', 'SERVER_URL: {0}', [ typeof SERVER_URL ]);
                return '';
            }

            // SERVER_URL == ''
            if (!SERVER_URL || !popularType) {
                logger.error('assembleURL', 'Empty SERVER_URL or popularType!');
                return '';
            }
            if (popularType !== POPULAR_TYPE.ARTICLE && popularType !== POPULAR_TYPE.QA &&
                popularType !== POPULAR_TYPE.DOCTOR) {
                logger.error('assembleURL', 'Invalid popular type: {0}', [ popularType ]);
                return '';
            }

            var assembledUrl = SERVER_URL + '/popular/' + popularType;

            if (category) {
                assembledUrl += '/' + category;
            }

            logger.debug('assembleURL', 'Url assembled successfully, url={0}', [ assembledUrl ]);
            return assembledUrl;
        }

        function simpleValidator(obj) {
            return obj;
        }

        function getHttpPromise(method, url, jsonBody, arrayValidator, objValidator) {
            var reqCompletedCallback;
            if (method === HTTP_METHOD.GET) {
                reqCompletedCallback = (function(validateArray, validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.GET(response, validateArray, validateObject);
                    };
                })(arrayValidator, objValidator);
                return  $http
                            .get(url)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            }

            // wrong HTTP method
            throw new Error(popularExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }
    }

})();
