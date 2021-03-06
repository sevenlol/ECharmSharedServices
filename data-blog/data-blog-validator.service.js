/*
 * Validator Service for Blog System
 */

//module getter
angular
    .module('data.blog')
    .factory('blogValidatorService', blogValidatorService);

blogValidatorService.$inject = [
    'Logger'
];

function blogValidatorService(Logger) {
    // Logger instance
    var logger = Logger.getInstance('app - data - blog - validator');

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
        logger.debug('validateRequestArticleFilled', 'article: {0}', [ JSON.stringify(article, null, 2) ]);

        // check if the article object
        if (!angular.isObject(article) || article === null || angular.isArray(article)) {
            logger.error('validateRequestArticleFilled', 'Invalid input: article object');
            logger.debug('validateRequestArticleFilled', 'article type: {0}', [ typeof article ]);
            return null;
        }

        // check number fields
        if (!angular.isNumber(article.rating) ||
            !angular.isNumber(article.rating_count)) {
            logger.error('validateRequestArticleFilled', 'Invalid number field!');
            logger.debug('validateRequestArticleFilled', 'article.rating: {0}, article.rating_count: {1}', [ typeof article.rating, typeof article.rating_count]);
            return null;
        }

        // check string fields
        if (!angular.isString(article.content_text) || article.content_text === "" ||
            !angular.isString(article.author_id)    || article.author_id    === "" ||
            !angular.isString(article.title)        || article.title        === "" ||
            !angular.isString(article.created_at)   || article.created_at   === "" ||
            !angular.isString(article.updated_at)   || article.updated_at   === "") {
            logger.error('validateRequestArticleFilled', 'Invalid string field!');
            logger.debug('validateRequestArticleFilled', 'article.content_text: {0}, article.author_id: {1}', [ typeof article.content_text, typeof article.author_id]);
            logger.debug('validateRequestArticleFilled', 'article.title: {0}, article.created_at: {1}, article.updated_at: {2}',
                         [ typeof article.title, typeof article.created_at, typeof article.updated_at]);
            return null;
        }

        // check array fields
        if (!angular.isArray(article.image_arr) ||
            !angular.isArray(article.tag_arr)) {
            logger.error('validateRequestArticleFilled', 'Invalid array field!');
            logger.debug('validateRequestArticleFilled', 'article.image_arr: {0}, article.tag_arr: {1}', [ typeof article.image_arr, typeof article.tag_arr]);
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
        logger.debug('validateRequestArticleNotEmpty', 'article: {0}', [ JSON.stringify(article, null, 2) ]);

        // check if the article object
        if (!angular.isObject(article) || article === null || angular.isArray(article)) {
            logger.error('validateRequestArticleNotEmpty', 'Invalid input: article object');
            logger.debug('validateRequestArticleNotEmpty', 'article type: {0}', [ typeof article ]);
            return null;
        }

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
            logger.error('validateRequestArticleNotEmpty', 'Empty input: article object');
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
        logger.debug('validateResponseArticleArray', 'article array: {0}', [ JSON.stringify(articleArray, null, 2) ]);

        // check the article array
        if (!angular.isArray(articleArray) || articleArray.length <= 0) {
            logger.error('validateResponseArticleArray', 'Invalid input: articleArray');
            logger.debug('validateResponseArticleArray', 'articleArray type: {0}', [ typeof articleArray ]);
            if (angular.isArray(articleArray))
                logger.debug('validateResponseArticleArray', 'articleArray length: {0}', [ articleArray.length ]);

            return null;
        }

        for (var i = 0; i < articleArray.length; i++) {
            var article = validateResponseArticleObject(articleArray[i]);
            if (article === null) {
                logger.error('validateResponseArticleArray', 'Invalid article: articleArray[{0}]', [ i ]);
                logger.debug('validateResponseArticleArray', 'articleArray[{0}]: {1}', [ i, JSON.stringify(articleArray[i], null, 2)]);
                // remove invalid array
                articleArray.splice(i--, 1);
            }
        }

        if (articleArray.length === 0) {
            logger.error('validateResponseArticleArray', 'Empty Array!');
            return null;
        }

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
        logger.debug('validateResponseArticleObject', 'article: {0}', [ JSON.stringify(article, null, 2) ]);

        // check if the article object
        if (!angular.isObject(article) || article === null  || angular.isArray(article)) {
            logger.error('validateResponseArticleObject', 'Invalid input: article object');
            logger.debug('validateResponseArticleObject', 'article type: {0}', [ typeof article ]);
            return null;
        }

        // check number fields
        if (!angular.isNumber(article.rating) ||
            !angular.isNumber(article.rating_count)) {
            logger.error('validateResponseArticleObject', 'Invalid number field!');
            logger.debug('validateResponseArticleObject', 'article.rating: {0}, article.rating_count: {1}', [ typeof article.rating, typeof article.rating_count]);
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
            logger.error('validateResponseArticleObject', 'Invalid string field!');
            logger.debug('validateResponseArticleObject', 'article.content_text: {0}, article.author_id: {1}, article.article_id: {2}, article.category: {3}',
                         [ typeof article.content_text, typeof article.author_id, typeof article.article_id, typeof article.category]);
            logger.debug('validateResponseArticleObject', 'article.title: {0}, article.created_at: {1}, article.updated_at: {2}',
                         [ typeof article.title, typeof article.created_at, typeof article.updated_at]);
            return null;
        }

        // check array fields
        if (!angular.isArray(article.image_arr) ||
            !angular.isArray(article.tag_arr)) {
            logger.error('validateResponseArticleObject', 'Invalid array field!');
            logger.debug('validateResponseArticleObject', 'article.image_arr: {0}, article.tag_arr: {1}', [ typeof article.image_arr, typeof article.tag_arr]);
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
            !angular.isString(comment.responded_at)           || comment.responded_at === "" ||
            !angular.isString(comment.created_at)             || comment.created_at   === "" ||
            !angular.isString(comment.updated_at)             || comment.updated_at   === "" ||
            !angular.isString(comment.author_response_text)   || comment.author_response_text   === "") {
            logger.error('validateRequestCommentFilled', 'Invalid string field!');
            logger.debug('validateRequestCommentFilled', 'comment.commenter_id: {0}, comment.comment_text: {1}', [ typeof comment.commenter_id, typeof comment.comment_text]);
            logger.debug('validateRequestCommentFilled', 'comment.responded_at: {0}, comment.created_at: {1}, comment.updated_at: {2}, comment.author_response_text: {3}',
                         [ typeof comment.responded_at, typeof comment.created_at, typeof comment.updated_at, comment.author_response_text]);
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
            (!angular.isString(comment.responded_at)         || comment.responded_at === "") &&
            (!angular.isString(comment.created_at)           || comment.created_at   === "") &&
            (!angular.isString(comment.updated_at)           || comment.updated_at   === "") &&
            (!angular.isString(comment.author_response_text) || comment.author_response_text === "")) {
            logger.error('validateRequestCommentNotEmpty', 'Empty input: comment object');
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

    /*
     * @desc Validate if the input comment has all fields required
     *       in a HTTP response
     * @param {Object} comment the comment object to be checked
     * @returns {Object}  the input comment object if validated,
     *                    null otherwise
     */
    function validateResponseCommentObject(comment) {
        logger.debug('validateResponseCommentObject', 'comment: {0}', [ JSON.stringify(comment, null, 2) ]);

        // check if the comment object is valid
        if (!angular.isObject(comment) || comment === null || angular.isArray(comment)) {
            logger.error('validateResponseCommentObject', 'Invalid input: comment object');
            logger.debug('validateResponseCommentObject', 'comment type: {0}', [ typeof comment ]);
            return null;
        }

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
            logger.error('validateResponseCommentObject', 'Invalid string field!');
            logger.debug('validateResponseCommentObject', 'comment.commenter_id: {0}, comment.comment_text: {1}, comment.article_id: {2}, comment.comment_id: {3}',
                         [ typeof comment.commenter_id, typeof comment.comment_text, typeof comment.article_id, typeof comment.comment_id]);
            logger.debug('validateResponseCommentObject', 'comment.responded_at: {0}, comment.created_at: {1}, comment.updated_at: {2}, comment.author_response_text: {3}',
                         [ typeof comment.responded_at, typeof comment.created_at, typeof comment.updated_at, comment.author_response_text]);
            logger.debug('validateResponseCommentObject', 'comment.category: {0}', [ typeof comment.category ]);
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

    /*
     * @desc Validate if the input rating has at least one field
     *       required in a HTTP request
     * @param {Object} rating the rating object to be checked
     * @returns {Object}  the input rating object if validated,
     *                    null otherwise
     */
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

    /*
     * @desc Validate if the input rating array has all fields
     *       required in a HTTP response
     * @param {Object} ratingArray an array of rating objects
     *                              to be checked
     * @returns {Array} an array that only contains the ligit
     *                  ratings (others are filtered)
     */
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

    /*
     * @desc Validate if the input rating has all fields required
     *       in a HTTP response
     * @param {Object} rating the rating object to be checked
     * @returns {Object}  the input rating object if validated,
     *                    null otherwise
     */
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
        if (!angular.isString(rating.category)   || rating.category     === "" ||
            !angular.isString(rating.article_id) || rating.article_id   === "" ||
            !angular.isString(rating.rating_id)  || rating.rating_id    === "" ||
            !angular.isString(rating.rater_id)   || rating.rater_id     === "" ||
            !angular.isString(rating.created_at) || rating.created_at   === "" ||
            !angular.isString(rating.updated_at) || rating.updated_at   === "") {
            logger.error('validateResponseRatingObject', 'Invalid string field!');
            logger.debug('validateResponseRatingObject', 'rating.category: {0}, rating.article_id: {1}, rating.rating_id: {2}, rating.rater_id: {3}',
                         [ typeof rating.category, typeof rating.article_id, typeof rating.rating_id, typeof rating.rater_id]);
            logger.debug('validateResponseRatingObject', 'rating.created_at: {0}, rating.updated_at: {1}',
                         [ typeof rating.created_at, typeof rating.updated_at]);
            return null;
        }

        return rating;
    }
}