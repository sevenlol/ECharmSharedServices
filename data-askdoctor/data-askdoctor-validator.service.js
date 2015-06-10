/*
 *  Validator Service In Q & A Data Services
 */

(function() {
    "use strict";

    // module setter
    angular
        .module('data.askdoctor')
        .factory('askdoctorValidatorService', askdoctorValidatorService);

    askdoctorValidatorService.$inject = [
        'Logger'
    ];

    function askdoctorValidatorService(Logger) {
    	var logger = Logger.getInstance('app - data - askdoctor - validator');
        var service = {
            validator : {
                REQ : {
                    FILLED : {
                        QUESTION : validateRequestQuestionFilled,
                        ANSWER : validateRequestAnswerFilled,
                        COMMENT : validateRequestCommentFilled,
                        RATING : validateRequestRatingFilled
                    },
                    NOT_EMPTY : {
                        QUESTION : validateRequestQuestionNotEmpty,
                        ANSWER : validateRequestAnswerNotEmpty,
                        COMMENT : validateRequestCommentNotEmpty,
                        RATING : validateRequestRatingNotEmpty
                    }
                },
                RES : {
                    ARRAY : {
                        QUESTION : validateResponseQuestionArray,
                        ANSWER : validateResponseAnswerArray,
                        COMMENT : validateResponseCommentArray,
                        RATING : validateResponseRatingArray
                    },
                    OBJECT : {
                        QUESTION : validateResponseQuestionObject,
                        ANSWER : validateResponseAnswerObject,
                        COMMENT : validateResponseCommentObject,
                        RATING : validateResponseRatingObject
                    }
                }
            }
        };
        return service;

        /*
         * public functions
         */

        /* question */

        function validateRequestQuestionFilled(question) {
            logger.debug('validateRequestQuestionFilled', 'input question: {0}', [ JSON.stringify(question, null, 2) ]);

            // check if the question object
            if (!angular.isObject(question) || question === null || angular.isArray(question)) {
                logger.error('validateRequestQuestionFilled', 'Invalid input: question object');
                logger.debug('validateRequestQuestionFilled', 'question type: {0}', [ typeof question ]);
                return null;
            }

            // check number fields
            if (!angular.isNumber(question.rating) ||
                !angular.isNumber(question.rating_count)) {
                logger.error('validateRequestQuestionFilled', 'Invalid number field!');
                logger.debug('validateRequestQuestionFilled', 'question.rating: {0}, question.rating_count: {1}', [ typeof question.rating, typeof question.rating_count]);
                return null;
            }

            // check string fields
            if (!angular.isString(question.content_text)  || question.content_text === "" ||
                !angular.isString(question.questioner_id) || question.questioner_id    === "" ||
                !angular.isString(question.title)         || question.title        === "" ||
                !angular.isString(question.created_at)    || question.created_at   === "" ||
                !angular.isString(question.updated_at)    || question.updated_at   === "") {
                logger.error('validateRequestQuestionFilled', 'Invalid string field!');
                logger.debug('validateRequestQuestionFilled', 'question.content_text: {0}, question.questioner_id: {1}', [ typeof question.content_text, typeof question.questioner_id]);
                logger.debug('validateRequestQuestionFilled', 'question.title: {0}, question.created_at: {1}, question.updated_at: {2}',
                             [ typeof question.title, typeof question.created_at, typeof question.updated_at]);
                return null;
            }

            // check array fields
            if (!angular.isArray(question.image_arr) ||
                !angular.isArray(question.tag_arr)) {
                logger.error('validateRequestQuestionFilled', 'Invalid array field!');
                logger.debug('validateRequestQuestionFilled', 'question.image_arr: {0}, question.tag_arr: {1}', [ typeof question.image_arr, typeof question.tag_arr]);
                return null;
            }

            return question;
        }

        function validateRequestQuestionNotEmpty(question) {
            logger.debug('validateRequestQuestionNotEmpty', 'question: {0}', [ JSON.stringify(question, null, 2) ]);

            // check if the question object
            if (!angular.isObject(question) || question === null || angular.isArray(question)) {
                logger.error('validateRequestQuestionNotEmpty', 'Invalid input: question object');
                logger.debug('validateRequestQuestionNotEmpty', 'question type: {0}', [ typeof question ]);
                return null;
            }

            // check if any fields are invalid
            if (!angular.isNumber(question.rating)         &&
                !angular.isNumber(question.rating_count)   &&
                (!angular.isString(question.content_text)  || question.content_text  === "") &&
                (!angular.isString(question.questioner_id) || question.questioner_id === "") &&
                (!angular.isString(question.title)         || question.title         === "") &&
                (!angular.isString(question.created_at)    || question.created_at    === "") &&
                (!angular.isString(question.updated_at)    || question.updated_at    === "") &&
                !angular.isArray(question.image_arr)       &&
                !angular.isArray(question.tag_arr)) {
                logger.error('validateRequestQuestionNotEmpty', 'Empty input: question object');
                return null;
            }

            return question;
        }

        function validateResponseQuestionArray(questionArray) {
            logger.debug('validateResponseQuestionArray', 'question array: {0}', [ JSON.stringify(questionArray, null, 2) ]);

            // check the question array
            if (!angular.isArray(questionArray) || questionArray.length <= 0) {
                logger.error('validateResponseQuestionArray', 'Invalid input: questionArray');
                logger.debug('validateResponseQuestionArray', 'questionArray type: {0}', [ typeof questionArray ]);
                if (angular.isArray(questionArray))
                    logger.debug('validateResponseQuestionArray', 'questionArray length: {0}', [ questionArray.length ]);

                return null;
            }

            for (var i = 0; i < questionArray.length; i++) {
                var question = validateResponseQuestionObject(questionArray[i]);
                if (question === null) {
                    logger.error('validateResponseQuestionArray', 'Invalid question: questionArray[{0}]', [ i ]);
                    logger.debug('validateResponseQuestionArray', 'questionArray[{0}]: {1}', [ i, JSON.stringify(questionArray[i], null, 2)]);
                    // remove invalid array
                    questionArray.splice(i--, 1);
                }
            }

            if (questionArray.length === 0) {
                logger.error('validateResponseQuestionArray', 'Empty Array!');
                return null;
            }

            return questionArray;
        }

        function validateResponseQuestionObject(question) {
            logger.debug('validateResponseQuestionObject', 'question: {0}', [ JSON.stringify(question, null, 2) ]);

            // check if the question object
            if (!angular.isObject(question) || question === null || angular.isArray(question)) {
                logger.error('validateResponseQuestionObject', 'Invalid input: question object');
                logger.debug('validateResponseQuestionObject', 'question type: {0}', [ typeof question ]);
                return null;
            }

            // check number fields
            if (!angular.isNumber(question.rating) ||
                !angular.isNumber(question.rating_count)) {
                logger.error('validateResponseQuestionObject', 'Invalid number field!');
                logger.debug('validateResponseQuestionObject', 'question.rating: {0}, question.rating_count: {1}', [ typeof question.rating, typeof question.rating_count]);
                return null;
            }

            // check string fields
            if (!angular.isString(question.question_id)   || question.question_id   === "" ||
                !angular.isString(question.category)      || question.category     === "" ||
                !angular.isString(question.content_text)  || question.content_text === "" ||
                !angular.isString(question.questioner_id) || question.questioner_id    === "" ||
                !angular.isString(question.title)         || question.title        === "" ||
                !angular.isString(question.created_at)    || question.created_at   === "" ||
                !angular.isString(question.updated_at)    || question.updated_at   === "") {
                logger.error('validateResponseQuestionObject', 'Invalid string field!');
                logger.debug('validateResponseQuestionObject', 'question.question_id: {0}, question.category: {1}', [ typeof question.question_id, typeof question.category]);
                logger.debug('validateResponseQuestionObject', 'question.content_text: {0}, question.questioner_id: {1}', [ typeof question.content_text, typeof question.questioner_id]);
                logger.debug('validateResponseQuestionObject', 'question.title: {0}, question.created_at: {1}, question.updated_at: {2}',
                             [ typeof question.title, typeof question.created_at, typeof question.updated_at]);
                return null;
            }

            // check array fields
            if (!angular.isArray(question.image_arr) ||
                !angular.isArray(question.tag_arr)) {
                logger.error('validateResponseQuestionObject', 'Invalid array field!');
                logger.debug('validateResponseQuestionObject', 'question.image_arr: {0}, question.tag_arr: {1}', [ typeof question.image_arr, typeof question.tag_arr]);
                return null;
            }

            return question;
        }

        /* answer */

        function validateRequestAnswerFilled(answer) {
            logger.debug('validateRequestAnswerFilled', 'answer: {0}', [ JSON.stringify(answer, null, 2) ]);

            // check if the answer object
            if (!angular.isObject(answer) || answer === null || angular.isArray(answer)) {
                logger.error('validateRequestAnswerFilled', 'Invalid input: answer object');
                logger.debug('validateRequestAnswerFilled', 'answer type: {0}', [ typeof answer ]);
                return null;
            }

            // check string fields
            if (!angular.isString(answer.answer_text)   || answer.answer_text  === "" ||
                !angular.isString(answer.answerer_id)   || answer.answerer_id  === "" ||
                !angular.isString(answer.created_at)    || answer.created_at   === "" ||
                !angular.isString(answer.updated_at)    || answer.updated_at   === "") {
                logger.error('validateRequestAnswerFilled', 'Invalid string field!');
                logger.debug('validateRequestAnswerFilled', 'answer.answer_text: {0}, answer.answerer_id: {1}', [ typeof answer.answer_text, typeof answer.answerer_id]);
                logger.debug('validateRequestAnswerFilled', 'answer.created_at: {0}, answer.updated_at: {1}',
                             [ typeof answer.created_at, typeof answer.updated_at]);
                return null;
            }

            return answer;
        }

        function validateRequestAnswerNotEmpty(answer) {
            logger.debug('validateRequestAnswerNotEmpty', 'answer: {0}', [ JSON.stringify(answer, null, 2) ]);

            // check if the answer object
            if (!angular.isObject(answer) || answer === null || angular.isArray(answer)) {
                logger.error('validateRequestAnswerNotEmpty', 'Invalid input: answer object');
                logger.debug('validateRequestAnswerNotEmpty', 'answer type: {0}', [ typeof answer ]);
                return null;
            }

            // check if any fields are invalid
            if ((!angular.isString(answer.answer_text) || answer.answer_text  === "") &&
                (!angular.isString(answer.answerer_id) || answer.answerer_id  === "") &&
                (!angular.isString(answer.created_at)  || answer.created_at   === "") &&
                (!angular.isString(answer.updated_at)  || answer.updated_at   === "")) {
                logger.error('validateRequestAnswerNotEmpty', 'Empty input: answer object');
                return null;
            }

            return answer;
        }

        function validateResponseAnswerArray(answerArray) {
            logger.debug('validateResponseAnswerArray', 'answer array: {0}', [ JSON.stringify(answerArray, null, 2) ]);

            // check the answer array
            if (!angular.isArray(answerArray) || answerArray.length <= 0) {
                logger.error('validateResponseAnswerArray', 'Invalid input: answerArray');
                logger.debug('validateResponseAnswerArray', 'answerArray type: {0}', [ typeof answerArray ]);
                if (angular.isArray(answerArray))
                    logger.debug('validateResponseAnswerArray', 'answerArray length: {0}', [ answerArray.length ]);

                return null;
            }

            for (var i = 0; i < answerArray.length; i++) {
                var answer = validateResponseAnswerObject(answerArray[i]);
                if (answer === null) {
                    logger.error('validateResponseAnswerArray', 'Invalid answer: answerArray[{0}]', [ i ]);
                    logger.debug('validateResponseAnswerArray', 'answerArray[{0}]: {1}', [ i, JSON.stringify(answerArray[i], null, 2)]);
                    // remove invalid array
                    answerArray.splice(i--, 1);
                }
            }

            if (answerArray.length === 0) {
                logger.error('validateResponseAnswerArray', 'Empty Array!');
                return null;
            }

            return answerArray;
        }

        function validateResponseAnswerObject(answer) {
            logger.debug('validateResponseAnswerObject', 'answer: {0}', [ JSON.stringify(answer, null, 2) ]);

            // check if the answer object
            if (!angular.isObject(answer) || answer === null || angular.isArray(answer)) {
                logger.error('validateResponseAnswerObject', 'Invalid input: answer object');
                logger.debug('validateResponseAnswerObject', 'answer type: {0}', [ typeof answer ]);
                return null;
            }

            // check string fields
            if (!angular.isString(answer.category)      || answer.category  === "" ||
                !angular.isString(answer.question_id)   || answer.question_id  === "" ||
                !angular.isString(answer.answer_text)   || answer.answer_text  === "" ||
                !angular.isString(answer.answerer_id)   || answer.answerer_id  === "" ||
                !angular.isString(answer.created_at)    || answer.created_at   === "" ||
                !angular.isString(answer.updated_at)    || answer.updated_at   === "") {
                logger.error('validateResponseAnswerObject', 'Invalid string field!');
                logger.debug('validateResponseAnswerObject', 'answer.answer_text: {0}, answer.answerer_id: {1}', [ typeof answer.answer_text, typeof answer.answerer_id]);
                logger.debug('validateResponseAnswerObject', 'answer.created_at: {0}, answer.updated_at: {1}',
                             [ typeof answer.created_at, typeof answer.updated_at]);
                return null;
            }

            return answer;
        }

        /* comment */

        function validateRequestCommentFilled(comment) {
            logger.debug('validateRequestCommentFilled', 'comment: {0}', [ JSON.stringify(comment, null, 2) ]);

            // check if the comment object is valid
            if (!angular.isObject(comment) || comment === null || angular.isArray(comment)) {
                logger.error('validateRequestCommentFilled', 'Invalid input: comment object');
                logger.debug('validateRequestCommentFilled', 'comment type: {0}', [ typeof comment ]);
                return null;
            }

            // check string fields
            if (!angular.isString(comment.commenter_id)           || comment.commenter_id === "" ||
                !angular.isString(comment.comment_text)           || comment.comment_text === "" ||
                !angular.isString(comment.created_at)             || comment.created_at   === "" ||
                !angular.isString(comment.updated_at)             || comment.updated_at   === "") {
                logger.error('validateRequestCommentFilled', 'Invalid string field!');
                logger.debug('validateRequestCommentFilled', 'comment.commenter_id: {0}, comment.comment_text: {1}', [ typeof comment.commenter_id, typeof comment.comment_text]);
                logger.debug('validateRequestCommentFilled', 'comment.created_at: {0}, comment.updated_at: {1} ',
                             [ typeof comment.created_at, typeof comment.updated_at ]);
                return null;
            }

            return comment;
        }

        function validateRequestCommentNotEmpty(comment) {
            logger.debug('validateRequestCommentNotEmpty', 'comment: {0}', [ JSON.stringify(comment, null, 2) ]);

            // check if the comment object is valid
            if (!angular.isObject(comment) || comment === null || angular.isArray(comment)) {
                logger.error('validateRequestCommentNotEmpty', 'Invalid input: comment object');
                logger.debug('validateRequestCommentNotEmpty', 'comment type: {0}', [ typeof comment ]);
                return null;
            }

            // check if any fields are invalid
            if ((!angular.isString(comment.commenter_id)         || comment.commenter_id === "") &&
                (!angular.isString(comment.comment_text)         || comment.comment_text === "") &&
                (!angular.isString(comment.created_at)           || comment.created_at   === "") &&
                (!angular.isString(comment.updated_at)           || comment.updated_at   === "")) {
                logger.error('validateRequestCommentNotEmpty', 'Empty input: comment object');
                return null;
            }

            return comment;
        }

        function validateResponseCommentArray(commentArray) {
            logger.debug('validateResponseCommentArray', 'comment array: {0}', [ JSON.stringify(commentArray, null, 2) ]);

            // check the comment array
            if (!angular.isArray(commentArray) || commentArray.length <= 0) {
                logger.error('validateResponseCommentArray', 'Invalid input: commentArray');
                if (angular.isArray(commentArray))
                    logger.debug('validateResponseCommentArray', 'commentArray length: {0}', [ commentArray.length ]);
                else
                    logger.debug('validateResponseCommentArray', 'commentArray type: {0}', [ typeof commentArray ]);
                return null;
            }

            for (var i = 0; i < commentArray.length; i++) {
                var comment = validateResponseCommentObject(commentArray[i]);
                if (comment === null) {
                    // remove invalid array
                    logger.error('validateResponseCommentArray', 'Invalid comment: commentArray[{0}]', [ i ]);
                    logger.debug('validateResponseCommentArray', 'commentArray[{0}]: {1}', [ i, JSON.stringify(commentArray[i], null, 2)]);
                    commentArray.splice(i--, 1);
                }
            }

            if (commentArray.length === 0) {
                logger.error('validateResponseCommentArray', 'Empty Array!');
                return null;
            }

            return commentArray;
        }

        function validateResponseCommentObject(comment) {
            logger.debug('validateResponseCommentObject', 'comment: {0}', [ JSON.stringify(comment, null, 2) ]);

            // check if the comment object is valid
            if (!angular.isObject(comment) || comment === null || angular.isArray(comment)) {
                logger.error('validateResponseCommentObject', 'Invalid input: comment object');
                logger.debug('validateResponseCommentObject', 'comment type: {0}', [ typeof comment ]);
                return null;
            }

            // check string fields
            if (!angular.isString(comment.question_id)            || comment.question_id  === "" ||
                !angular.isString(comment.comment_id)             || comment.comment_id   === "" ||
                !angular.isString(comment.category)               || comment.category     === "" ||
                !angular.isString(comment.commenter_id)           || comment.commenter_id === "" ||
                !angular.isString(comment.comment_text)           || comment.comment_text === "" ||
                !angular.isString(comment.created_at)             || comment.created_at   === "" ||
                !angular.isString(comment.updated_at)             || comment.updated_at   === "") {
                logger.error('validateResponseCommentObject', 'Invalid string field!');
                logger.debug('validateResponseCommentObject', 'comment.commenter_id: {0}, comment.comment_text: {1}, comment.question_id: {2}, comment.comment_id: {3}',
                             [ typeof comment.commenter_id, typeof comment.comment_text, typeof comment.question_id, typeof comment.comment_id]);
                logger.debug('validateResponseCommentObject', 'comment.created_at: {0}, comment.updated_at: {1}',
                             [ typeof comment.created_at, typeof comment.updated_at ]);
                logger.debug('validateResponseCommentObject', 'comment.category: {0}', [ typeof comment.category ]);
                return null;
            }

            return comment;
        }

        /* rating */

        function validateRequestRatingFilled(rating) {
            logger.debug('validateRequestRatingFilled', 'rating: {0}', [ JSON.stringify(rating, null, 2) ]);

            // check if the rating object is valid
            if (!angular.isObject(rating) || rating === null || angular.isArray(rating)) {
                logger.error('validateRequestRatingFilled', 'Invalid input: rating object');
                logger.debug('validateRequestRatingFilled', 'rating type: {0}', [ typeof rating ]);
                return null;
            }

            // check number fields
            if (!angular.isNumber(rating.rating_value)) {
                logger.error('validateRequestRatingFilled', 'Invalid number field!');
                logger.debug('validateRequestRatingFilled', 'rating.rating_value: {0}', [ typeof rating.rating_value ]);
                return null;
            }

            // check string fields
            if (!angular.isString(rating.rater_id)   || rating.rater_id     === "" ||
                !angular.isString(rating.created_at) || rating.created_at   === "" ||
                !angular.isString(rating.updated_at) || rating.updated_at   === "") {
                logger.error('validateRequestRatingFilled', 'Invalid string field!');
                logger.debug('validateRequestRatingFilled', 'rating.rater_id: {0}, rating.created_at: {1}, rating.updated_at: {2}',
                             [ typeof rating.rater_id, typeof rating.created_at, typeof rating.updated_at]);
                return null;
            }

            return rating;
        }

        function validateRequestRatingNotEmpty(rating) {
            logger.debug('validateRequestRatingNotEmpty', 'rating: {0}', [ JSON.stringify(rating, null, 2) ]);

            // check if the rating object
            if (!angular.isObject(rating) || rating === null || angular.isArray(rating)) {
                logger.error('validateRequestRatingNotEmpty', 'Invalid input: rating object');
                logger.debug('validateRequestRatingNotEmpty', 'rating type: {0}', [ typeof rating ]);
                return null;
            }

            // check if any fields are invalid
            if (!angular.isNumber(rating.rating_value)                            &&
               (!angular.isString(rating.rater_id)   || rating.rater_id   === "") &&
               (!angular.isString(rating.created_at) || rating.created_at === "") &&
               (!angular.isString(rating.updated_at) || rating.updated_at === "")) {
                logger.error('validateRequestRatingNotEmpty', 'Empty input: rating object');
                return null;
            }

            return rating;
        }

        function validateResponseRatingArray(ratingArray) {
            logger.debug('validateResponseRatingArray', 'rating array: {0}', [ JSON.stringify(ratingArray, null, 2) ]);

            // check the rating array
            if (!angular.isArray(ratingArray) || ratingArray.length <= 0) {
                logger.error('validateResponseRatingArray', 'Invalid input: ratingArray');
                if (angular.isArray(ratingArray))
                    logger.debug('validateResponseRatingArray', 'ratingArray length: {0}', [ ratingArray.length ]);
                else
                    logger.debug('validateResponseRatingArray', 'ratingArray type: {0}', [ typeof ratingArray ]);

                return null;
            }

            for (var i = 0; i < ratingArray.length; i++) {
                var rating = validateResponseRatingObject(ratingArray[i]);
                if (rating === null) {
                    // remove invalid array
                    logger.error('validateResponseRatingArray', 'Invalid rating: ratingArray[{0}]', [ i ]);
                    logger.debug('validateResponseRatingArray', 'ratingArray[{0}]: {1}', [ i, JSON.stringify(ratingArray[i], null, 2)]);
                    ratingArray.splice(i--, 1);
                }
            }

            if (ratingArray.length === 0) {
                logger.error('validateResponseRatingArray', 'Empty Array!');
                return null;
            }

            return ratingArray;
        }

        function validateResponseRatingObject(rating) {
            logger.debug('validateResponseRatingObject', 'rating: {0}', [ JSON.stringify(rating, null, 2) ]);

            // check if the rating object is valid
            if (!angular.isObject(rating) || rating === null || angular.isArray(rating)) {
                logger.error('validateResponseRatingObject', 'Invalid input: rating object');
                logger.debug('validateResponseRatingObject', 'rating type: {0}', [ typeof rating ]);
                return null;
            }

            // check number fields
            if (!angular.isNumber(rating.rating_value)) {
                logger.error('validateResponseRatingObject', 'Invalid number field!');
                logger.debug('validateResponseRatingObject', 'rating.rating_value: {0}', [ typeof rating.rating_value]);
                return null;
            }

            // check string fields
            if (!angular.isString(rating.category)    || rating.category     === "" ||
                !angular.isString(rating.question_id) || rating.question_id  === "" ||
                !angular.isString(rating.rating_id)   || rating.rating_id    === "" ||
                !angular.isString(rating.rater_id)    || rating.rater_id     === "" ||
                !angular.isString(rating.created_at)  || rating.created_at   === "" ||
                !angular.isString(rating.updated_at)  || rating.updated_at   === "") {
                logger.error('validateResponseRatingObject', 'Invalid string field!');
                logger.debug('validateResponseRatingObject', 'rating.category: {0}, rating.question_id: {1}, rating.rating_id: {2}, rating.rater_id: {3}',
                             [ typeof rating.category, typeof rating.question_id, typeof rating.rating_id, typeof rating.rater_id]);
                logger.debug('validateResponseRatingObject', 'rating.created_at: {0}, rating.updated_at: {1}',
                             [ typeof rating.created_at, typeof rating.updated_at]);
                return null;
            }

            return rating;
        }
    }

})();