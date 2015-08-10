/*
 * Value Service
 */

//module getter
angular
    .module('app.value')
    .factory('valueService', valueService);

valueService.$inject = [
    /* Server */
    'SERVER_URL_AUTH',
    'SERVER_URL_BLOG',
    'SERVER_URL_ASKDOCTOR',
    'SERVER_URL_ACCOUNT',
    'SERVER_URL_MEMBER',
    'SERVER_URL_FAVORITE',
    'SERVER_URL_POPULAR',

    'HTTP_METHOD_GET',
    'HTTP_METHOD_POST',
    'HTTP_METHOD_PUT',
    'HTTP_METHOD_PATCH',
    'HTTP_METHOD_DELETE',

    /* Account System */
    'USER_TYPE_USER',
    'USER_TYPE_DOCTOR',
    'USER_TYPE_ADMIN',
    'ACCOUNT_TYPE_ECHARM'
];

function valueService(
    SERVER_URL_AUTH,
    SERVER_URL_BLOG,
    SERVER_URL_ASKDOCTOR,
    SERVER_URL_ACCOUNT,
    SERVER_URL_MEMBER,
    SERVER_URL_FAVORITE,
    SERVER_URL_POPULAR,
    HTTP_METHOD_GET,
    HTTP_METHOD_POST,
    HTTP_METHOD_PUT,
    HTTP_METHOD_PATCH,
    HTTP_METHOD_DELETE,
    USER_TYPE_USER,
    USER_TYPE_DOCTOR,
    USER_TYPE_ADMIN,
    ACCOUNT_TYPE_ECHARM) {

    var service = {
        /* Server */
        SERVER_URL : {
            AUTH      : SERVER_URL_AUTH,
            BLOG      : SERVER_URL_BLOG,
            ASKDOCTOR : SERVER_URL_ASKDOCTOR,
            ACCOUNT   : SERVER_URL_ACCOUNT,
            MEMBER    : SERVER_URL_MEMBER,
            FAVORITE  : SERVER_URL_FAVORITE,
            POPULAR   : SERVER_URL_POPULAR
        },
        HTTP_METHOD : {
            GET    : HTTP_METHOD_GET,
            POST   : HTTP_METHOD_POST,
            PUT    : HTTP_METHOD_PUT,
            PATCH  : HTTP_METHOD_PATCH,
            DELETE : HTTP_METHOD_DELETE
        },

        /* Account System */
        USER_TYPE : {
            USER   : USER_TYPE_USER,
            DOCTOR : USER_TYPE_DOCTOR,
            ADMIN  : USER_TYPE_ADMIN
        },
        ACCOUNT_TYPE : {
            ECHARM : ACCOUNT_TYPE_ECHARM
        }
    };
    return service;
}