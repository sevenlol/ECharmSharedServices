/*
 *  Doctor Service In Member Data Services
 */

(function() {
    "use strict";

    // module setter
    angular
        .module('data.member')
        .factory('memberDoctorService', memberDoctorService);

    memberDoctorService.$inject = [
        '$http',
        'memberResponseHandlerService',
        'memberValidatorService',
        'memberExceptionCatcherService',
        'valueService',
        'Logger'
    ];

    function memberDoctorService($http, memberResponseHandlerService, memberValidatorService,
                                 memberExceptionCatcherService, valueService, Logger) {
        var SERVER_URL = valueService.SERVER_URL.MEMBER;
        var HTTP_METHOD = valueService.HTTP_METHOD;
        var REQ_VALIDATOR = memberValidatorService.validator.REQ.DOCTOR;
        var RES_VALIDATOR = memberValidatorService.validator.RES.DOCTOR;
        var RES_FAILED_CALLBACK = memberResponseHandlerService.requestFailed;
        var REQ_COMPLETED_CALLBACK = {
            GET : memberResponseHandlerService.getRequestCompleted,
            POST : memberResponseHandlerService.postRequestCompleted,
            PUT : memberResponseHandlerService.putRequestCompleted,
            PATCH : memberResponseHandlerService.patchRequestCompleted,
            DELETE : memberResponseHandlerService.deleteRequestCompleted
        };
        // Logger object
        var logger = Logger.getInstance('app - data - member - doctor');
        var service = {
            createDoctor          : createDoctor,
            readAllDoctors        : readAllDoctors,
            readDoctorsInCategory : readDoctorsInCategory,
            updateMeDoctor        : updateMeDoctor
        };
        return service;

        /* public functions */

        function createDoctor(doctorAccount) {
            // validate doctorAccount object
            if (REQ_VALIDATOR.POST(doctorAccount) === null) {
                logger.error('createDoctor', 'Invalid input object: {0}', [ 'doctorAccount' ]);
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // assemble URL
            var url = assembleURL(SERVER_URL, '', '');

            if (!url) {
                logger.error('createDoctor', 'url assembly failed!');
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('createDoctor', 'Validation successfull! Updating my user information!');
            return getHttpPromise(HTTP_METHOD.POST, url, doctorAccount);
        }

        function readAllDoctors(idList) {
            var idListStr = buildIdListStr(idList);
            var url = assembleURL(SERVER_URL, '', idListStr);

            if (!url) {
                logger.error('readAllDoctors', 'url assembly failed!');
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readAllDoctors', 'Validation successfull! Reading user information!');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function readDoctorsInCategory(category, idList) {
            if (!angular.isString(category) || !category) {
                logger.error('readDoctorsInCategory', 'Invalid input: category!');
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            var idListStr = buildIdListStr(idList);
            var url = assembleURL(SERVER_URL, category, idListStr);

            if (!url) {
                logger.error('readDoctorsInCategory', 'url assembly failed!');
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('readDoctorsInCategory', 'Validation successfull! Reading user information!');
            return getHttpPromise(HTTP_METHOD.GET, url, null);
        }

        function updateMeDoctor(doctorAccount) {
            // validate doctorAccount object
            if (REQ_VALIDATOR.PUT(doctorAccount) === null) {
                logger.error('updateMeDoctor', 'Invalid input object: {0}', [ 'doctorAccount' ]);
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            // assemble URL
            var url = assembleURL(SERVER_URL, '', '');

            if (!url) {
                logger.error('updateMeDoctor', 'url assembly failed!');
                throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
            }

            logger.log('updateMeDoctor', 'Validation successfull! Updating my user information!');
            return getHttpPromise(HTTP_METHOD.PUT, url, doctorAccount);
        }

        /* private functions */

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

        function assembleURL(SERVER_URL, category, idListStr) {
            if (!angular.isString(SERVER_URL) ||
                !angular.isString(idListStr)  ||
                !angular.isString(category)) {
                logger.error('assembleURL', 'Invalid input type: SERVER_URL, category or idListStr');
                logger.debug('assembleURL', 'SERVER_URL: {0}, category: {1}, idListStr: {2}', [ typeof SERVER_URL, typeof category, typeof idListStr ]);
                return '';
            }

            // SERVER_URL == ''
            if (!SERVER_URL) {
                logger.error('assembleURL', 'Empty SERVER_URL!');
                return '';
            }

            var assembledUrl = SERVER_URL + '/members/doctors';

            // category !== ''
            if (category) {
                logger.debug('assembleURL', 'Non empty variable: category');
                assembledUrl = assembledUrl + '/' + category;
            }

            // idListStr === ''
            if (!idListStr) {
                logger.debug('assembleURL', 'Empty idListStr, assembledUrl={0}', [ assembledUrl ]);
                return assembledUrl;
            }

            assembledUrl += '?id_list=' + idListStr;

            logger.debug('assembleURL', 'Url assembled successfully, url={0}', [ assembledUrl ]);
            return assembledUrl;
        }

        function getHttpPromise(method, url, doctorAccount) {
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
                            .post(url, doctorAccount)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            } else if (method === HTTP_METHOD.PUT) {
                reqCompletedCallback = (function(validateObject) {
                    return function(response) {
                        return REQ_COMPLETED_CALLBACK.PUT(response, validateObject);
                    };
                })(RES_VALIDATOR.OBJECT);
                return  $http
                            .put(url, doctorAccount)
                            .then(reqCompletedCallback)
                            .catch(RES_FAILED_CALLBACK);
            }

            // wrong HTTP method
            throw new Error(memberExceptionCatcherService.DEFAULT_ERROR_MESSAGE);
        }
    }

})();
