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

    }

    /*
     * @desc Validate if the input article has at least one field
     *       required in a HTTP request
     * @param {Object} article the article object to be checked
     * @returns {Object}  the input article object if validated,
     *                    null otherwise
     */
    function validateRequestArticleNotEmpty(article) {

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

    }

    /*
     * @desc Validate if the input article has all fields required
     *       in a HTTP response
     * @param {Object} article the article object to be checked
     * @returns {Object}  the input article object if validated,
     *                    null otherwise
     */
    function validateResponseArticleObject(article) {

    }

}