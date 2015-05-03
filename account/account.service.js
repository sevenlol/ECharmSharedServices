/*
 * Account Data Service for Blog System
 */

//module getter
angular
    .module('data.account')
    .factory('accountService', accountService);

accountService.$inject = [
    '$http',
    'accountResponseHandlerCatcherService',
    'accountValidatorService',
    'accountExceptionCatcherService'
];

function accountService($http, accountResponseHandlerCatcherService, accountValidatorService, accountExceptionCatcherService) {
    var service = {
        readArbitraryAccount            :  readArbitraryAccount,
        readArbitraryAccountByUsername  :  readArbitraryAccountByUsername,
        readArbitraryAccountByEmail     :  readArbitraryAccountByEmail
    };
    return service;

    /*
     * public functions
     */

    /*
     * private functions
     */
}