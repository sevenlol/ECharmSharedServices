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
    }

})();
