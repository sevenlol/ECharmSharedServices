(function() {
    'use strict';

    // module setter
    angular
        .module('data.popular')
        .factory('popularValidatorService', popularValidatorService);

    popularValidatorService.$inject = [
        'Logger'
    ];

    function popularValidatorService(Logger) {
    	// Logger object
        var logger = Logger.getInstance('app - data - popular - validator');

    	var service = {
    		validator : {
    			ARTICLE : {
    				ARRAY : validatePopularArticleList,
    				OBJ   : validatePopularArticle
    			},
    			DOCTOR : {
    				ARRAY : validatePopularDoctorList,
    				OBJ   : validatePopularDoctor
    			},
    			QA : {
    				ARRAY : validatePopularQAList,
    				OBJ   : validatePopularQA
    			}
    		}
    	};
    	return service;

    	/* public functions */

    	function validatePopularArticleList(articleList) {
    		// check the article array
            if (!angular.isArray(articleList) || articleList.length <= 0) {
                logger.error('validatePopularArticleList', 'Invalid input: articleList!');
                logger.debug('validatePopularArticleList', 'Input type: {0}', [ typeof articleList ]);
                return null;
            }

            for (var i = 0; i < articleList.length; i++) {
                var article = validatePopularArticle(articleList[i]);
                if (article === null) {
                    // remove invalid array
                    logger.error('validatePopularArticleList', 'Invalid article object at index: {0}!', [ i ]);
                    articleList.splice(i--, 1);
                }
            }

            if (articleList.length === 0) {
                logger.error('validatePopularArticleList', 'All article objects are invalid (empty result array)!');
                return null;
            }

            logger.debug('validatePopularArticleList', 'Validation succeeded!');
            return articleList;
    	}

    	function validatePopularArticle(article) {
    		// check the article object
            if (!angular.isObject(article) || article === null  || angular.isArray(article)) {
                logger.error('validatePopularArticle', 'Invalid input popular article object!');
                logger.debug('validatePopularArticle', 'Input object type: {0}', [ typeof article]);
                return null;
            }

            // check string fields
            if (!angular.isString(article.article_category)   || !article.article_category   ||
                !angular.isString(article.article_id)         || !article.article_id         ||
                !angular.isString(article.article_title)      || !article.article_title      ||
                !angular.isString(article.author_category)    || !article.author_category    ||
                !angular.isString(article.author_id)          || !article.author_id          ||
                !angular.isString(article.author_name)        || !article.author_name) {
                logger.error('validatePopularArticle', 'Missing fields!');
                return null;
            }

            logger.debug('validatePopularArticle', 'Validation succeeded!');
            return article;
    	}

    	function validatePopularDoctorList(doctorList) {
    		// check the doctor array
            if (!angular.isArray(doctorList) || doctorList.length <= 0) {
                logger.error('validatePopularDoctorList', 'Invalid input: doctorList!');
                logger.debug('validatePopularDoctorList', 'Input type: {0}', [ typeof doctorList ]);
                return null;
            }

            for (var i = 0; i < doctorList.length; i++) {
                var doctor = validatePopularDoctor(doctorList[i]);
                if (doctor === null) {
                    // remove invalid array
                    logger.error('validatePopularDoctorList', 'Invalid doctor object at index: {0}!', [ i ]);
                    doctorList.splice(i--, 1);
                }
            }

            if (doctorList.length === 0) {
                logger.error('validatePopularDoctorList', 'All doctor objects are invalid (empty result array)!');
                return null;
            }

            logger.debug('validatePopularDoctorList', 'Validation succeeded!');
            return doctorList;
    	}

    	function validatePopularDoctor(doctor) {
    		// check the doctor object
            if (!angular.isObject(doctor) || !doctor || angular.isArray(doctor)) {
                logger.error('validatePopularDoctor', 'Invalid input popular doctor object!');
                logger.debug('validatePopularDoctor', 'Input object type: {0}', [ typeof doctor]);
                return null;
            }

            // check string fields
            if (!angular.isString(doctor.doctor_name)          || !doctor.doctor_name        ||
            	!angular.isString(doctor.doctor_id)            || !doctor.doctor_id          ||
            	!angular.isString(doctor.doctor_sticker_url)   || !doctor.doctor_sticker_url ||
                !angular.isString(doctor.doctor_category)      || !doctor.doctor_category) {
                logger.error('validatePopularDoctor', 'Missing fields!');
                return null;
            }

            logger.debug('validatePopularDoctor', 'Validation succeeded!');
            return doctor;
    	}

    	function validatePopularQAList(qaList) {
    		// check the qa array
            if (!angular.isArray(qaList) || qaList.length <= 0) {
                logger.error('validatePopularQAList', 'Invalid input: qaList!');
                logger.debug('validatePopularQAList', 'Input type: {0}', [ typeof qaList ]);
                return null;
            }

            for (var i = 0; i < qaList.length; i++) {
                var qa = validatePopularQA(qaList[i]);
                if (qa === null) {
                    // remove invalid array
                    logger.error('validatePopularQAList', 'Invalid qa object at index: {0}!', [ i ]);
                    qaList.splice(i--, 1);
                }
            }

            if (qaList.length === 0) {
                logger.error('validatePopularQAList', 'All qa objects are invalid (empty result array)!');
                return null;
            }

            logger.debug('validatePopularQAList', 'Validation succeeded!');
            return qaList;
    	}

    	function validatePopularQA(qa) {
    		// check the qa object
            if (!angular.isObject(qa) || !qa || angular.isArray(qa)) {
                logger.error('validatePopularQA', 'Invalid input popular qa object!');
                logger.debug('validatePopularQA', 'Input object type: {0}', [ typeof qa]);
                return null;
            }

            // check string fields
            if (!angular.isString(qa.question_category)   || !qa.question_category   ||
                !angular.isString(qa.question_id)         || !qa.question_id         ||
                !angular.isString(qa.question_content)    || !qa.question_content    ||
                !angular.isString(qa.answerer_id)         || !qa.answerer_id         ||
                !angular.isString(qa.answerer_name)       || !qa.answerer_name       ||
                !angular.isString(qa.questioner_id)       || !qa.questioner_id       ||
                !angular.isString(qa.questioner_name)     || !qa.questioner_name     ||
                !angular.isString(qa.answer_id)           || !qa.answer_id           ||
                !angular.isString(qa.answer_content)      || !qa.answer_content) {
                logger.error('validatePopularQA', 'Missing fields!');
                return null;
            }

            logger.debug('validatePopularQA', 'Validation succeeded!');
            return qa;
    	}

    	/* private functions */
  	}
})();
