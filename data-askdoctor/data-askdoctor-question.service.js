/*
 * Question Data Service for Ask Doctor System
 */

(function() {
    "use strict";

    //module getter
    angular
        .module('data.askdoctor')
        .factory('askdoctorQuestionService', askdoctorQuestionService);

    askdoctorQuestionService.$inject = [
        '$http',
        'askdoctorResponseHandlerService',
        'askdoctorValidatorService',
        'askdoctorExceptionCatcherService',
        'valueService',
        'Logger'
    ];

    function askdoctorQuestionService($http, askdoctorResponseHandlerService, askdoctorValidatorService,
                                    askdoctorExceptionCatcherService, valueService, Logger) {
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
        var logger = Logger.getInstance('app - data - askdoctor - question');
        var service = {
            /* Create */
            createQuestion          :  createQuestion,

            /* Read */
            readAllQuestion         :  readAllQuestion,
            readQuestionInCategory   :  readQuestionInCategory,
            readQuestion            :  readQuestion,

            /* Read By Field */
            readQuestionByQuestionerId : readQuestionByQuestionerId,

            /* Update */
            updateQuestion          :  updateQuestion,
            partiallyUpdateQuestion :  partiallyUpdateQuestion,

            /* Delete */
            deleteAllQuestion       :  deleteAllQuestion,
            deleteQuestionInCategory :  deleteQuestionInCategory,
            deleteQuestion          :  deleteQuestion
        };
        return service;

        /*
         * functions
         */

        function createQuestion() {
            // body...
        }

        function readAllQuestion() {
            // body...
        }

        function readQuestionInCategory() {
            // body...
        }

        function readQuestion() {
            // body...
        }

        function readQuestionByQuestionerId() {
            // body...
        }

        function updateQuestion() {
            // body...
        }

        function partiallyUpdateQuestion() {
            // body...
        }

        function deleteAllQuestion() {
            // body...
        }

        function deleteQuestionInCategory() {
            // body...
        }

        function deleteQuestion() {
            // body...
        }
    }

})();
