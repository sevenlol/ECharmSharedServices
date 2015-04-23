/*
 * Article Data Service for Blog System
 */

//module getter
angular
    .module('blog')
    .factory('blogArticleService', blogArticleService);

blogArticleService.$inject = ['$http'];

function blogArticleService($http) {
    var service = {
        /* Create */
        createArticle           :  createArticle,

        /* Read */
        readAllArticle          :  readAllArticle,
        readArticleInCategory   :  readArticleInCategory,
        readArticle             :  readArticle,

        /* Update */
        updateArticle           :  updateArticle,
        partiallyUpdateArticle  :  partiallyUpdateArticle,

        /* Delete */
        deleteAllArticle        :  deleteAllArticle,
        deleteArticleInCategory :  deleteArticleInCategory,
        deleteArticle           :  deleteArticle
    };
    return service;

    /*
     * public functions
     */

    /* Create */

    /*
     * @desc Create an article
     * @param {String} category the category that the article belongs to
     * @param {Object} article  the article object to be created
     * @returns {Object}  the created article
     * @throws {Object}  the error object when failing to create
     */
    function createArticle(category, article) {

    }


    /* Read */

    /*
     * @desc Read all articles
     * @returns {Array}  an array containing all the article objects
     * @throws {Object}  the error object when failing to read
     */
    function readAllArticle() {

    }

    /*
     * @desc Read all articles in certain category
     * @param {String} category category to read
     * @returns {Array}  an array containing all the article objects
     * @throws {Object}  the error object when failing to read
     */
    function readArticleInCategory(category) {

    }

    /*
     * @desc Read certain article
     * @param {String} category category to read
     * @param {String} id the ID of the article to be red
     * @returns {Object}  the article object
     * @throws {Object}  the error object when failing to read
     */
    function readArticle(category, id) {

    }


    /* Update*/

    /*
     * @desc Update certain article
     * @param {String} category category to update
     * @param {String} id the ID of the article to be updated
     * @returns {Object}  the article object
     * @throws {Object}  the error object when failing to update
     */
    function updateArticle(category, id, article) {

    }

    /*
     * @desc Partially update certain article
     * @param {String} category category to update
     * @param {String} id the ID of the article to be updated
     * @returns {Object}  the article object
     * @throws {Object}  the error object when failing to update
     */
    function partiallyUpdateArticle(category, id, article) {

    }


    /* Delete */

    /*
     * @desc Delete all articles
     * @returns {Array}  an array containing all the deleted article objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteAllArticle() {

    }

    /*
     * @desc Delete all articles in certain category
     * @param {String} category category to delete
     * @returns {Array}  an array containing all the deleted article objects
     * @throws {Object}  the error object when failing to delete
     */
    function deleteArticleInCategory(category) {

    }

    /*
     * @desc Delete certain article
     * @param {String} category category to read
     * @param {String} id the ID of the article to be deleted
     * @returns {Object}  the deleted article object
     * @throws {Object}  the error object when failing to delete
     */
    function deleteArticle(category, id) {

    }


    /*
     * private functions
     */

    function getRequestCompleted(response, dataType, status) {

    }

    function postRequestCompleted(response, article, status) {

    }

    function putRequestCompleted(response, article, status) {

    }

    function patchRequestCompleted(response, article, status) {

    }

    function deleteRequestCompleted(response, dataType, status) {

    }
}