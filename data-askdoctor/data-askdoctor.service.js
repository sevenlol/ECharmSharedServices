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
        var service = {
            readEmbeddedQuestion : readEmbeddedQuestion,
            readEmbeddedQuestionInCategory : readEmbeddedQuestionInCategory,
            readAllEmbeddedQuestion : readAllEmbeddedQuestion,
            readEmbeddedQuestionByQuestionerId : readEmbeddedQuestionByQuestionerId,
            readEmbeddedQuestionByAnswererId : readEmbeddedQuestionByAnswererId
        };
        return service;

        /*
         * public functions
         */

        function readEmbeddedQuestion(category, questionId, withAnswer, withComments, withRatings) {
            // body...
        }

        function readEmbeddedQuestionInCategory(category, isAnswered, withAnswer, withComments, withRatings) {
            // body...
        }

        function readAllEmbeddedQuestion(isAnswered, withAnswer, withComments, withRatings) {
            // body...
        }

        function readEmbeddedQuestionByQuestionerId(questionerId, isAnswered, withAnswer, withComments, withRatings) {
            // body...
        }

        function readEmbeddedQuestionByAnswererId(AnswererId, isAnswered, withAnswer, withComments, withRatings) {
            // body...
        }
    }

})();