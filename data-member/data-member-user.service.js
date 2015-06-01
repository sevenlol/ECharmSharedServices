/*
 *  User Service In Member Data Services
 */

(function() {
    "use strict";

    // module setter
    angular
        .module('data.member')
        .factory(memberUserService, memberUserService);

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
        var service = {
            updateMeUser : updateMeUser,
            readUsers    : readUsers
        };
        return service;

        /* public functions */

        function updateMeUser(userAccount) {
            // body...
        }

        function readUsers(idList) {
            // body...
        }

        /* private functions */

        function buildIdListStr(idList) {
            if (!angular.isArray(idList) || idList.length <= 0) {
                return null;
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
    }

})();
