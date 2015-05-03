/*
 * Doctor Account Data Service for Account System
 */

//module getter
angular
    .module('data.account')
    .factory('doctorAccountService', doctorAccountService);

doctorAccountService.$inject = [
	'$http',
	'accountResponseHandlerCatcherService',
	'accountValidatorService',
	'accountExceptionCatcherService'
];

function doctorAccountService($http, accountResponseHandlerCatcherService, accountValidatorService, accountExceptionCatcherService) {
    // TODO put SERVER_URL in another module
	// Global Variables
    var SERVER_URL = 'http://localhost:8080';
    var HTTP_METHOD = {
    	GET : 'GET',
    	POST : 'POST',
    	PUT : 'PUT',
    	PATCH : 'PATCH',
    	DELETE : 'DELETE'
    };

    // set functions/callbacks
    var REQ_VALIDATOR = {
    	FILLED : accountValidatorService.requestValidator
                                   .doctorAccountValidator
                                   .validateFilled,
        NOT_EMPTY : accountValidatorService.requestValidator
                                   .doctorAccountValidator
                                   .validateNotEmpty
    };
    var RES_VALIDATOR = {
    	ARRAY : accountValidatorService
        			.responseValidator
        			.doctorAccountValidator
        			.validateArray,
        OBJECT : accountValidatorService
        			.responseValidator
        			.doctorAccountValidator
        			.validateObject
    };
    var RES_FAILED_CALLBACK = accountResponseHandlerCatcherService.requestFailed;
    var REQ_COMPLETED_CALLBACK = {
    	GET : accountResponseHandlerCatcherService.getRequestCompleted,
    	POST : accountResponseHandlerCatcherService.postRequestCompleted,
    	PUT : accountResponseHandlerCatcherService.putRequestCompleted,
    	PATCH : accountResponseHandlerCatcherService.patchRequestCompleted,
    	DELETE : accountResponseHandlerCatcherService.deleteRequestCompleted
    };

    var service = {
    	/* Create */
        createDoctorAccount           :  createDoctorAccount,

        /* Read */
        readAllDoctorAccount          :  readAllDoctorAccount,
        readDoctorAccountByUsername   :  readDoctorAccountByUsername,
        readDoctorAccountByEmail      :  readDoctorAccountByEmail,
        // read by id
        readDoctorAccount             :  readDoctorAccount,

        /* Update */
        updateDoctorAccount           :  updateDoctorAccount,
        partiallyUpdateDoctorAccount  :  partiallyUpdateDoctorAccount,

        /* Delete*/
        deleteAllDoctorAccount        :  deleteAllDoctorAccount,
        deleteDoctorAccount           :  deleteDoctorAccount
    };
    return service;

    /*
     * public functions
     */

    /*
     * private functions
     */
}