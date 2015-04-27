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
            }
        },
        responseValidator : {
            articleValidator : {
                validateArray : validateResponseArticleArray,
                validateObject : validateResponseArticleObject
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
        if (!angular.isObject(article) || article === null)
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
        if (!angular.isObject(article) || article === null)
            return null;

        // check if all fields are invalid
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
                articleArray.splice(i, 1);
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
        if (!angular.isObject(article) || article === null)
            return null;

        // check number fields
        if (!angular.isNumber(article.rating) ||
            !angular.isNumber(article.rating_count)) {
            return null;
        }

        // check string fields
        if (!angular.isString(article.category)     || article.category     === "" ||
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

}