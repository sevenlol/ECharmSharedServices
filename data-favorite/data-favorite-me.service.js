(function() {
    'use strict';

    // module setter
    angular
        .module('data.favorite')
        .factory('favoriteMeService', favoriteMeService);

    favoriteMeService.$inject = [
        '$http',
        'favoriteResponseHandlerService',
        'favoriteValidatorService',
        'favoriteExceptionCatcherService',
        'valueService',
        'Logger'
    ];

    function favoriteMeService(
        $http,
        favoriteResponseHandlerService,
        favoriteValidatorService,
        favoriteExceptionCatcherService,
        valueService,
        Logger) {

        /* constants */
        var SERVER_URL = valueService.SERVER_URL.FAVORITE;
        var HTTP_METHOD = valueService.HTTP_METHOD;
        var FAV_ARTICLE_VALIDATOR = favoriteValidatorService.validator.ARTICLE;
        var FAV_QA_VALIDATOR = favoriteValidatorService.validator.QA;
        var FAV_LIST_VALIDATOR = favoriteValidatorService.validator.FAV_LIST;
        var RES_FAILED_CALLBACK = favoriteResponseHandlerService.requestFailed;
        var REQ_COMPLETED_CALLBACK = {
            GET : favoriteResponseHandlerService.getRequestCompleted,
            POST : favoriteResponseHandlerService.postRequestCompleted,
            PUT : favoriteResponseHandlerService.putRequestCompleted,
            PATCH : favoriteResponseHandlerService.patchRequestCompleted,
            DELETE : favoriteResponseHandlerService.deleteRequestCompleted
        };
        var FAVORITE_TYPE = {
            ARTICLE : 'articles',
            QA : 'qas'
        };

        // Logger object
        var logger = Logger.getInstance('app - data - favorite - me');

        /* service object */
        var service = {
            /* favorite list */
            readMyFavoriteList        : readMyFavoriteList,
            /* favorite article list */
            createMyFavoriteArticles  : createMyFavoriteArticles,
            deleteMyFavoriteArticles  : deleteMyFavoriteArticles,
            readMyFavoriteArticleList : readMyFavoriteArticleList,
            readMyFavoriteArticle     : readMyFavoriteArticle,
            /* favorite qa list */
            createMyFavoriteQAs       : createMyFavoriteQAs,
            deleteMyFavoriteQAs       : deleteMyFavoriteQAs,
            readMyFavoriteQAList      : readMyFavoriteQAList,
            readMyFavoriteQA          : readMyFavoriteQA
        };
        return service;

        /* public functions */

        function readMyFavoriteList() {
            var url = assembleURL(SERVER_URL, null, null);

            if (!url) {
                logger.error('readMyFavoriteList', 'url assembly failed!');
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readMyFavoriteList', 'Validation successfull! Reading favorite list!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, FAV_LIST_VALIDATOR, FAV_LIST_VALIDATOR);
        }

        function createMyFavoriteArticles(articleList) {
            // validate articleList object
            if (!angular.isArray(articleList) || !articleList || articleList.length === 0) {
                logger.error('createMyFavoriteArticles', 'Invalid input object: {0}', [ 'articleList' ]);
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }
            for (var i in articleList) {
                if (!FAV_ARTICLE_VALIDATOR.OBJ(articleList[i])) {
                    logger.error('createMyFavoriteArticles', 'Invalid article object (index:{0}) in {1}', [ i, 'articleList' ]);
                    throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
                }
            }

            var url = assembleURL(SERVER_URL, FAVORITE_TYPE.ARTICLE, null);
            if (!url) {
                logger.error('createMyFavoriteArticles', 'url assembly failed!');
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('createMyFavoriteArticles', 'Validation successfull! Creating favorite articles!');
            return getHttpPromise(HTTP_METHOD.POST, url, articleList, simpleValidator, simpleValidator);
        }

        function deleteMyFavoriteArticles(idList) {
            var idListStr = buildIdListStr(idList);
            if (!idListStr) {
                logger.error('deleteMyFavoriteArticles', 'Invalid input object: {0}', [ 'idList' ]);
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, FAVORITE_TYPE.ARTICLE, null);
            if (!url) {
                logger.error('deleteMyFavoriteArticles', 'url assembly failed!');
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }
            url += '?id_list=' + idListStr;

            logger.log('deleteMyFavoriteArticles', 'Validation successfull! Deleting favorite articles!');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null, simpleValidator, simpleValidator);
        }

        function readMyFavoriteArticleList() {
            var url = assembleURL(SERVER_URL, FAVORITE_TYPE.ARTICLE, null);
            if (!url) {
                logger.error('readMyFavoriteArticleList', 'url assembly failed!');
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readMyFavoriteArticleList', 'Validation successfull! Reading favorite article list!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, FAV_ARTICLE_VALIDATOR.ARRAY, FAV_ARTICLE_VALIDATOR.OBJ);
        }

        function readMyFavoriteArticle(articleId) {
            var url = assembleURL(SERVER_URL, FAVORITE_TYPE.ARTICLE, articleId);
            if (!url) {
                logger.error('readMyFavoriteArticle', 'url assembly failed!');
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readMyFavoriteArticle', 'Validation successfull! Reading favorite article!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, FAV_ARTICLE_VALIDATOR.ARRAY, FAV_ARTICLE_VALIDATOR.OBJ);
        }

        function createMyFavoriteQAs(qaList) {
            // validate qaList object
            if (!angular.isArray(qaList) || !qaList || qaList.length === 0) {
                logger.error('createMyFavoriteQAs', 'Invalid input object: {0}', [ 'qaList' ]);
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }
            for (var i in qaList) {
                if (!FAV_QA_VALIDATOR.OBJ(qaList[i])) {
                    logger.error('createMyFavoriteQAs', 'Invalid qa object (index:{0}) in {1}', [ i, 'qaList' ]);
                    throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
                }
            }

            var url = assembleURL(SERVER_URL, FAVORITE_TYPE.QA, null);
            if (!url) {
                logger.error('createMyFavoriteQAs', 'url assembly failed!');
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('createMyFavoriteQAs', 'Validation successfull! Creating favorite qas!');
            return getHttpPromise(HTTP_METHOD.POST, url, qaList, simpleValidator, simpleValidator);
        }

        function deleteMyFavoriteQAs(idList) {
            var idListStr = buildIdListStr(idList);
            if (!idListStr) {
                logger.error('deleteMyFavoriteQAs', 'Invalid input object: {0}', [ 'idList' ]);
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var url = assembleURL(SERVER_URL, FAVORITE_TYPE.QA, null);
            if (!url) {
                logger.error('deleteMyFavoriteQAs', 'url assembly failed!');
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }
            url += '?id_list=' + idListStr;

            logger.log('deleteMyFavoriteQAs', 'Validation successfull! Deleting favorite qas!');
            return getHttpPromise(HTTP_METHOD.DELETE, url, null, simpleValidator, simpleValidator);
        }

        function readMyFavoriteQAList() {
            var url = assembleURL(SERVER_URL, FAVORITE_TYPE.QA, null);
            if (!url) {
                logger.error('readMyFavoriteQAList', 'url assembly failed!');
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readMyFavoriteQAList', 'Validation successfull! Reading favorite qa list!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, FAV_QA_VALIDATOR.ARRAY, FAV_QA_VALIDATOR.OBJ);
        }

        function readMyFavoriteQA(questionId) {
            var url = assembleURL(SERVER_URL, FAVORITE_TYPE.QA, questionId);
            if (!url) {
                logger.error('readMyFavoriteQA', 'url assembly failed!');
                throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readMyFavoriteQA', 'Validation successfull! Reading favorite qa!');
            return getHttpPromise(HTTP_METHOD.GET, url, null, FAV_QA_VALIDATOR.ARRAY, FAV_QA_VALIDATOR.OBJ);
        }

        /* private functions */

        function assembleURL(SERVER_URL, favoriteType, id) {
            if (!angular.isString(SERVER_URL) ||
                (id && !angular.isString(id))) {
                logger.error('assembleURL', 'Invalid input type: SERVER_URL or id');
                logger.debug('assembleURL', 'SERVER_URL: {0}, id: {1}', [ typeof SERVER_URL, typeof id ]);
                return '';
            }

            // SERVER_URL == ''
            if (!SERVER_URL) {
                logger.error('assembleURL', 'Empty SERVER_URL!');
                return '';
            }

            var assembledUrl = SERVER_URL + '/favorite/me';

            if (!favoriteType) {
                logger.debug('assembleURL', 'Url assembled successfully, url={0}', [ assembledUrl ]);
                return assembledUrl;
            }

            if (favoriteType !== FAVORITE_TYPE.ARTICLE && favoriteType !== FAVORITE_TYPE.QA) {
                logger.debug('assembleURL', 'Invalid favorite type: {0}', [ favoriteType ]);
                return '';
            }
            assembledUrl += '/' + favoriteType;

            if (!id) {
                logger.debug('assembleURL', 'Url assembled successfully, url={0}', [ assembledUrl ]);
                return assembledUrl;
            }
            assembledUrl += '/' + id;

            logger.debug('assembleURL', 'Url assembled successfully, url={0}', [ assembledUrl ]);
            return assembledUrl;
        }

        function buildIdListStr(idList) {
            // return empty string for the assembleURL function
            if (!angular.isArray(idList) || idList.length <= 0) {
                logger.error('buildIdListStr', 'Invalid input: idList');
                logger.debug('buildIdListStr', 'idList type: {0}', [ typeof idList ]);
                return '';
            }

            var idListStr = '';

            for (var i = 0; i < idList.length; i++) {
                if (!angular.isString(idList[i]) || idList[i] === '') {
                    logger.error('buildIdListStr', 'Invalid string item: index={0}', [ i ]);
                    continue;
                }

                if (i !== 0)
                    idListStr += ',';

                idListStr += idList[i];
            }

            logger.debug('buildIdListStr', 'Build string succeeded, idListStr={0}', [ idListStr ]);
            return idListStr;
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
            } else if (method === HTTP_METHOD.POST) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.POST(response, validateObject);
                    };
                })(objValidator);
                return  $http
                            .post(url, jsonBody)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.DELETE) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.DELETE(response, validateArray, validateObject);
                    };
                })(objValidator);
                return  $http
                            .delete(url, jsonBody)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            }

            // wrong HTTP method
            throw new Error(favoriteExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }
    }

})();
