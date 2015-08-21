(function() {
    'use strict';

    // module setter
    angular
        .module('data.favorite')
        .factory('favoriteValidatorService', favoriteValidatorService);

    favoriteValidatorService.$inject = [
        'Logger'
    ];

    function favoriteValidatorService(Logger) {
        // Logger object
        var logger = Logger.getInstance('app - data - favorite - validator');

        var service = {
            validator : {
                ARTICLE : {
                    ARRAY : validateFavArticleList,
                    OBJ   : validateFavArticle
                },
                QA : {
                    ARRAY : validateFavQAList,
                    OBJ   : validateFavQA
                },
                FAV_LIST  : validateFavList
            }
        };
        return service;

        /* public functions */

        function validateFavArticleList(articleList) {
            // check the article array
            if (!angular.isArray(articleList) || articleList.length <= 0) {
                logger.error('validateReqFavArticleList', 'Invalid input: articleList!');
                logger.debug('validateReqFavArticleList', 'Input type: {0}', [ typeof articleList ]);
                return null;
            }

            for (var i = 0; i < articleList.length; i++) {
                var article = validateFavArticle(articleList[i]);
                if (article === null) {
                    // remove invalid array
                    logger.error('validateReqFavArticleList', 'Invalid article object at index: {0}!', [ i ]);
                    articleList.splice(i--, 1);
                }
            }

            if (articleList.length === 0) {
                logger.error('validateReqFavArticleList', 'All article objects are invalid (empty result array)!');
                return null;
            }

            logger.debug('validateReqFavArticleList', 'Validation succeeded!');
            return articleList;
        }

        function validateFavArticle(article) {
            // check the article object
            if (!angular.isObject(article) || article === null  || angular.isArray(article)) {
                logger.error('validateFavArticle', 'Invalid input favorite article object!');
                logger.debug('validateFavArticle', 'Input object type: {0}', [ typeof article]);
                return null;
            }

            // check string fields
            if (!angular.isString(article.article_category)   || !article.article_category   ||
                !angular.isString(article.article_id)         || !article.article_id         ||
                !angular.isString(article.article_title)      || !article.article_title      ||
                !angular.isString(article.article_created_at) || !article.article_created_at ||
                !angular.isString(article.author_category)    || !article.author_category    ||
                !angular.isString(article.author_id)          || !article.author_id          ||
                !angular.isString(article.author_name)        || !article.author_name        ||
                !angular.isString(article.favorite_at)        || !article.favorite_at) {
                logger.error('validateFavArticle', 'Missing fields!');
                return null;
            }

            logger.debug('validateFavArticle', 'Validation succeeded!');
            return article;
        }

        function validateFavQAList(qaList) {
            // check the qa array
            if (!angular.isArray(qaList) || qaList.length <= 0) {
                logger.error('validateFavQAList', 'Invalid input: qaList!');
                logger.debug('validateFavQAList', 'Input type: {0}', [ typeof qaList ]);
                return null;
            }

            for (var i = 0; i < qaList.length; i++) {
                var qa = validateFavQA(qaList[i]);
                if (qa === null) {
                    // remove invalid array
                    logger.error('validateFavQAList', 'Invalid qa object at index: {0}!', [ i ]);
                    qaList.splice(i--, 1);
                }
            }

            if (qaList.length === 0) {
                logger.error('validateFavQAList', 'All qa objects are invalid (empty result array)!');
                return null;
            }

            logger.debug('validateFavQAList', 'Validation succeeded!');
            return qaList;
        }

        function validateFavQA(qa) {
            // check the qa object
            if (!angular.isObject(qa) || qa === null  || angular.isArray(qa)) {
                logger.error('validateReqFavQA', 'Invalid input favorite qa object!');
                logger.debug('validateReqFavQA', 'Input object type: {0}', [ typeof qa]);
                return null;
            }

            // check string fields
            if (!angular.isString(qa.question_category)   || !qa.question_category   ||
                !angular.isString(qa.question_id)         || !qa.question_id         ||
                !angular.isString(qa.question_content)    || !qa.question_content    ||
                !angular.isString(qa.question_created_at) || !qa.question_created_at ||
                !angular.isString(qa.answerer_category)   || !qa.answerer_category   ||
                !angular.isString(qa.answerer_id)         || !qa.answerer_id         ||
                !angular.isString(qa.answerer_name)       || !qa.answerer_name       ||
                !angular.isString(qa.questioner_id)       || !qa.questioner_id       ||
                !angular.isString(qa.questioner_name)     || !qa.questioner_name     ||
                !angular.isString(qa.answer_id)           || !qa.answer_id           ||
                !angular.isString(qa.answer_content)      || !qa.answer_content      ||
                !angular.isString(qa.answer_created_at)   || !qa.answer_created_at   ||
                !angular.isString(qa.favorite_at)         || !qa.favorite_at) {
                logger.error('validateReqFavQA', 'Missing fields!');
                return null;
            }

            logger.debug('validateReqFavQA', 'Validation succeeded!');
            return qa;
        }

        function validateFavList(favoriteList) {

            // check the favoriteList object
            if (!angular.isObject(favoriteList) || !favoriteList || angular.isArray(favoriteList)) {
                logger.error('validateFavList', 'Invalid input favorite list object!');
                logger.debug('validateFavList', 'Input object type: {0}', [ typeof favoriteList]);
                return null;
            }

            if (!favoriteList.favorite_articles && !favoriteList.favorite_qas) {
                logger.error('validateFavList', 'Empty fav_articles and fav_qas fields in list!');
                return null;
            }

            if (!validateFavArticleList(favoriteList.favorite_articles) &&
                !validateFavQAList(favoriteList.favorite_qas)) {
                return null;
            }

            return favoriteList;
        }

        /* private functions */
    }

})();
