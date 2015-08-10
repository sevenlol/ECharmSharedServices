/*
 * Server-related values
 */

//module getter
angular
    .module('app.value')
    .constant('SERVER_URL_AUTH', 'http://localhost:8080')
    .constant('SERVER_URL_BLOG', 'http://localhost:8080')
    .constant('SERVER_URL_ASKDOCTOR', 'http://localhost:8080')
    .constant('SERVER_URL_ACCOUNT', 'http://localhost:8080')
    .constant('SERVER_URL_MEMBER', 'http://localhost:8080')
    .constant('SERVER_URL_FAVORITE', 'http://localhost:8080')
    .constant('SERVER_URL_POPULAR', 'http://localhost:8080')
    .value('HTTP_METHOD_GET', 'GET')
    .value('HTTP_METHOD_POST', 'POST')
    .value('HTTP_METHOD_PUT', 'PUT')
    .value('HTTP_METHOD_PATCH', 'PATCH')
    .value('HTTP_METHOD_DELETE', 'DELETE');