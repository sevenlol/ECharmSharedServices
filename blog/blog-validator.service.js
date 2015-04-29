/*
 * Validator Service for Blog System
 */

//module getter
angular
    .module('blog')
    .factory('blogValidatorService', blogValidatorService);

function blogValidatorService() {
    var service = {
        requestValidator : {
            articleValidator : {
                validateFilled : validateRequestArticleFilled,
                validateNotEmpty : validateRequestArticleNotEmpty
            },
            commentValidator : {
                validateFilled : validateRequestCommentFilled,
                validateNotEmpty : validateRequestCommentNotEmpty
            },
            ratingValidator : {
                validateFilled : validateRequestRatingFilled,
                validateNotEmpty : validateRequestRatingNotEmpty
            }
        },
        responseValidator : {
            articleValidator : {
                validateArray : validateResponseArticleArray,
                validateObject : validateResponseArticleObject
            },
            commentValidator : {
                validateArray : validateResponseCommentArray,
                validateObject : validateResponseCommentObject
            },
            ratingValidator : {
                validateArray : validateResponseRatingArray,
                validateObject : validateResponseRatingObject
            }
        }
    };
    return service;

    /*
     * public functions
     */

    /* Article validation functions */

    /*
     * @desc Validate if the input article has all fields required
     *       in a HTTP request
     * @param {Object} article the article object to be checked
     * @returns {Object}  the input article object if validated,
     *                    null otherwise
     */
    function validateRequestArticleFilled(article) {
        // check if the article object
        if (!angular.isObject(article) || article === null || angular.isArray(article))
            return null;

        // check number fields
        if (!angular.isNumber(article.rating) ||
            !angular.isNumber(article.rating_count)) {
            return null;
        }

        // check string fields
        if (!angular.isString(article.content_text) || article.content_text === "" ||
            !angular.isString(article.author_id)    || article.author_id    === "" ||
            !angular.isString(article.title)        || article.title        === "" ||
            !angular.isString(article.created_at)   || article.created_at   === "" ||
            !angular.isString(article.updated_at)   || article.updated_at   === "") {
            return null;
        }

        // check array fields
        if (!angular.isArray(article.image_arr) ||
            !angular.isArray(article.tag_arr)) {
            return null;
        }

        return article;
    }

    /*
     * @desc Validate if the input article has at least one field
     *       required in a HTTP request
     * @param {Object} article the article object to be checked
     * @returns {Object}  the input article object if validated,
     *                    null otherwise
     */
    function validateRequestArticleNotEmpty(article) {
        // check if the article object
        if (!angular.isObject(article) || article === null || angular.isArray(article))
            return null;

        // check if any fields are invalid
        if (!angular.isNumber(article.rating)        &&
            !angular.isNumber(article.rating_count)  &&
            (!angular.isString(article.content_text) || article.content_text === "") &&
            (!angular.isString(article.author_id)    || article.author_id    === "") &&
            (!angular.isString(article.title)        || article.title        === "") &&
            (!angular.isString(article.created_at)   || article.created_at   === "") &&
            (!angular.isString(article.updated_at)   || article.updated_at   === "") &&
            !angular.isArray(article.image_arr)      &&
            !angular.isArray(article.tag_arr)) {
            return null;
        }

        return article;
    }

    /*
     * @desc Validate if the input article array has all fields
     *       required in a HTTP response
     * @param {Object} articleArray an array of article objects
     *                              to be checked
     * @returns {Array} an array that only contains the ligit
     *                  articles (others are filtered)
     */
    function validateResponseArticleArray(articleArray) {
        // check the article array
        if (!angular.isArray(articleArray) || articleArray.length <= 0)
            return null;

        for (var i = 0; i < articleArray.length; i++) {
            var article = validateResponseArticleObject(articleArray[i]);
            if (article === null) {
                // remove invalid array
                articleArray.splice(i--, 1);
            }
        }

        if (articleArray.length === 0)
            return null;

        return articleArray;
    }

    /*
     * @desc Validate if the input article has all fields required
     *       in a HTTP response
     * @param {Object} article the article object to be checked
     * @returns {Object}  the input article object if validated,
     *                    null otherwise
     */
    function validateResponseArticleObject(article) {
        // check if the article object
        if (!angular.isObject(article) || article === null  || angular.isArray(article))
            return null;

        // check number fields
        if (!angular.isNumber(article.rating) ||
            !angular.isNumber(article.rating_count)) {
            return null;
        }

        // check string fields
        if (!angular.isString(article.article_id)   || article.article_id   === "" ||
            !angular.isString(article.category)     || article.category     === "" ||
            !angular.isString(article.content_text) || article.content_text === "" ||
            !angular.isString(article.author_id)    || article.author_id    === "" ||
            !angular.isString(article.title)        || article.title        === "" ||
            !angular.isString(article.created_at)   || article.created_at   === "" ||
            !angular.isString(article.updated_at)   || article.updated_at   === "") {
            return null;
        }

        // check array fields
        if (!angular.isArray(article.image_arr) ||
            !angular.isArray(article.tag_arr)) {
            return null;
        }

        return article;
    }


    /* Comment validation functions */

    /*
     * @desc Validate if the input comment has all fields required
     *       in a HTTP request
     * @param {Object} comment the comment object to be checked
     * @returns {Object}  the input comment object if validated,
     *                    null otherwise
     */
    function validateRequestCommentFilled(comment) {
        // check if the comment object is valid
        if (!angular.isObject(comment) || comment === null || angular.isArray(comment))
            return null;

        // check string fields
        if (!angular.isString(comment.commenter_id)           || comment.commenter_id === "" ||
            !angular.isString(comment.comment_text)           || comment.comment_text === "" ||
            !angular.isString(comment.responded_at)           || comment.responded_at === "" ||
            !angular.isString(comment.created_at)             || comment.created_at   === "" ||
            !angular.isString(comment.updated_at)             || comment.updated_at   === "" ||
            !angular.isString(comment.author_response_text)   || comment.author_response_text   === "") {
            return null;
        }

        return comment;
    }

    /*
     * @desc Validate if the input comment has at least one field
     *       required in a HTTP request
     * @param {Object} comment the comment object to be checked
     * @returns {Object}  the input comment object if validated,
     *                    null otherwise
     */
    function validateRequestCommentNotEmpty(comment) {
        // check if the comment object is valid
        if (!angular.isObject(comment) || comment === null || angular.isArray(comment))
            return null;

        // check if any fields are invalid
        if ((!angular.isString(comment.commenter_id)         || comment.commenter_id === "") &&
            (!angular.isString(comment.comment_text)         || comment.comment_text === "") &&
            (!angular.isString(comment.responded_at)         || comment.responded_at === "") &&
            (!angular.isString(comment.created_at)           || comment.created_at   === "") &&
            (!angular.isString(comment.updated_at)           || comment.updated_at   === "") &&
            (!angular.isString(comment.author_response_text) || comment.author_response_text === "")) {
            return null;
        }

        return comment;
    }

    /*
     * @desc Validate if the input comment array has all fields
     *       required in a HTTP response
     * @param {Object} commentArray an array of comment objects
     *                              to be checked
     * @returns {Array} an array that only contains the ligit
     *                  comments (others are filtered)
     */
    function validateResponseCommentArray(commentArray) {
        // check the comment array
        if (!angular.isArray(commentArray) || commentArray.length <= 0)
            return null;

        for (var i = 0; i < commentArray.length; i++) {
            var comment = validateResponseCommentObject(commentArray[i]);
            if (comment === null) {
                // remove invalid array
                commentArray.splice(i--, 1);
            }
        }

        if (commentArray.length === 0)
            return null;

        return commentArray;
    }

    /*
     * @desc Validate if the input comment has all fields required
     *       in a HTTP response
     * @param {Object} comment the comment object to be checked
     * @returns {Object}  the input comment object if validated,
     *                    null otherwise
     */
    function validateResponseCommentObject(comment) {
        // check if the comment object is valid
        if (!angular.isObject(comment) || comment === null || angular.isArray(comment))
            return null;

        // check string fields
        if (!angular.isString(comment.article_id)             || comment.article_id   === "" ||
            !angular.isString(comment.comment_id)             || comment.comment_id   === "" ||
            !angular.isString(comment.category)               || comment.category     === "" ||
            !angular.isString(comment.commenter_id)           || comment.commenter_id === "" ||
            !angular.isString(comment.comment_text)           || comment.comment_text === "" ||
            !angular.isString(comment.responded_at)           || comment.responded_at === "" ||
            !angular.isString(comment.created_at)             || comment.created_at   === "" ||
            !angular.isString(comment.updated_at)             || comment.updated_at   === "" ||
            !angular.isString(comment.author_response_text)   || comment.author_response_text   === "") {
            return null;
        }

        return comment;
    }


    /* Rating validation functions */

    /*
     * @desc Validate if the input rating has all fields required
     *       in a HTTP request
     * @param {Object} rating the rating object to be checked
     * @returns {Object}  the input rating object if validated,
     *                    null otherwise
     */
    function validateRequestRatingFilled(rating) {

    }

    /*
     * @desc Validate if the input rating has at least one field
     *       required in a HTTP request
     * @param {Object} rating the rating object to be checked
     * @returns {Object}  the input rating object if validated,
     *                    null otherwise
     */
    function validateRequestRatingNotEmpty(rating) {

    }

    /*
     * @desc Validate if the input rating array has all fields
     *       required in a HTTP response
     * @param {Object} ratingArray an array of rating objects
     *                              to be checked
     * @returns {Array} an array that only contains the ligit
     *                  ratings (others are filtered)
     */
    function validateResponseRatingArray(ratingArray) {

    }

    /*
     * @desc Validate if the input rating has all fields required
     *       in a HTTP response
     * @param {Object} rating the rating object to be checked
     * @returns {Object}  the input rating object if validated,
     *                    null otherwise
     */
    function validateResponseRatingObject(rating) {

    }
}