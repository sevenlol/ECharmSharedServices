/*
 *  User Service In Member Data Services
 */

(function() {
    "use strict";

    // module setter
    angular
        .module('data.member')
        .factory('memberUserService', memberUserService);

    memberUserService.$inject = [
        '$http',
        'memberResponseHandlerService',
        'memberValidatorService',
        'memberExceptionCatcherService',
        'valueService',
        'Logger'
    ];

    function memberUserService($http, memberResponseHandlerService, memberValidatorService,
                               memberExceptionCatcherService, valueService, Logger) {
        var SERVER_URL = valueService.SERVER_URL.MEMBER;
        var HTTP_METHOD = valueService.HTTP_METHOD;
        var REQ_VALIDATOR = memberValidatorService.validator.REQ.USER;
        var RES_VALIDATOR = memberValidatorService.validator.RES.USER;
        var RES_FAILED_CALLBACK = memberResponseHandlerService.requestFailed;
        var REQ_COMPLETED_CALLBACK = {
            GET : memberResponseHandlerService.getRequestCompleted,
            POST : memberResponseHandlerService.postRequestCompleted,
            PUT : memberResponseHandlerService.putRequestCompleted,
            PATCH : memberResponseHandlerService.patchRequestCompleted,
            DELETE : memberResponseHandlerService.deleteRequestCompleted
        };
        var service = {
            updateMeUser : updateMeUser,
            readUsers    : readUsers
        };
        return service;

        /* public functions */

        function updateMeUser(userAccount) {
            // validate userAccount object
            if (REQ_VALIDATOR.PUT(userAccount) === null) {
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // assemble URL
            var url = assembleURL(SERVER_URL, '');

            if (!url) {
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            return getHttpPromise(HTTP_METHOD.PUT, url, userAccount);
        }

        function readUsers(idList) {
            var idListStr = buildIdListStr(idList);
            var url = assembleURL(SERVER_URL, idListStr);

            if (!url) {
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        /* private functions */

        function buildIdListStr(idList) {
            // return empty string for the assembleURL function
            if (!angular.isArray(idList) || idList.length <= 0) {
                return '';
            }

            var idListStr = '';

            for (var i = 0; i < idList.length; i++) {
                if (!angular.isString(idList[i]) || idList[i] === '') {
                    continue;
                }

                if (i !== 0)
                    idListStr += ',';

                idListStr += idList[i];
            }

            return idListStr;
        }

        function assembleURL(SERVER_URL, idListStr) {
            if (!angular.isString(SERVER_URL) ||
                !angular.isString(idListStr)) {
                return '';
            }

            // SERVER_URL == ''
            if (!SERVER_URL)
                return '';

            var assembledUrl = SERVER_URL + '/members/users';

            // idListStr == ''
            if (!idListStr)
                return assembledUrl;

            assembledUrl += '?id_list=' + idListStr;

            return assembledUrl;
        }

        function getHttpPromise(method, url, userAccount) {
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
                reqCompletedCallback = (function(validateArray, validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.POST(response, validateArray, validateObject);
                    };
                })(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT);
                return  $http
                            .post(url, userAccount)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PUT) {
                reqCompletedCallback = (function(validateArray, validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PUT(response, validateArray, validateObject);
                    };
                })(RES_VALIDATOR.ARRAY, RES_VALIDATOR.OBJECT);
                return  $http
                            .put(url, userAccount)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            }

            // wrong HTTP method
            throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }
    }

})();
