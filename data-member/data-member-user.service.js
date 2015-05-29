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

    ];

    function memberUserService() {
        var service = {
            updateMeUser : updateMeUser,
            readUsers    : readUsers
        };
        return service;

        /* public functions */

        function updateMeUser() {
            // body...
        }

        function readUsers() {
            // body...
        }
    }

})();
