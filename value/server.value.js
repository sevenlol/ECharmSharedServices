/*
 * Server-related values
 */

//module getter
angular
    .module('app.value')
    .constant('SERVER_URL', 'http://localhost:8080')
    .value('HTTP_METHOD_GET', 'GET')
    .value('HTTP_METHOD_POST', 'POST')
    .value('HTTP_METHOD_PUT', 'PUT')
    .value('HTTP_METHOD_PATCH', 'PATCH')
    .value('HTTP_METHOD_DELETE', 'DELETE');