/*
 *  Doctor Service In Member Data Services
 */

(function() {
    "use strict";

    // module setter
    angular
        .module('data.member')
        .factory(memberDoctorService, memberDoctorService);

    memberDoctorService.$inject = [

    ];

    function memberDoctorService() {
        var service = {
            createDoctor          : createDoctor,
            readAllDoctors        : readAllDoctors,
            readDoctorsInCategory : readDoctorsInCategory,
            updateMeDoctor        : updateMeDoctor
        };
        return service;

        /* public functions */

        function createDoctor() {
            // body...
        }

        function readAllDoctors() {
            // body...
        }

        function readDoctorsInCategory() {
            // body...
        }

        function updateMeDoctor() {
            // body...
        }
    }

})();
