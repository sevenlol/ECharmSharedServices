/*
 * Comment Data Service for Ask Doctor System
 */

(function() {
    "use strict";

	//module getter
	angular
	    .module('data.askdoctor')
	    .factory('askdoctorCommentService', askdoctorCommentService);

	askdoctorCommentService.$inject = [
		'$http',
		'askdoctorResponseHandlerService',
		'askdoctorValidatorService',
		'askdoctorExceptionCatcherService',
		'valueService',
        'Logger'
	];

	function askdoctorCommentService($http, blogValidatorService, blogExceptionCatcherService, valueService, Logger) {
	    var SERVER_URL = valueService.SERVER_URL.ASKDOCTOR;
	    var HTTP_METHOD = valueService.HTTP_METHOD;
	    var REQ_VALIDATOR = {
	    	FILLED : askdoctorValidatorService.validator.REQ.FILLED.COMMENT,
	    	NOT_EMPTY : askdoctorValidatorService.validator.REQ.NOT_EMPTY.COMMENT
	    };
	    var RES_VALIDATOR = {
	    	ARRAY : askdoctorValidatorService.validator.RES.ARRAY.COMMENT,
	    	OBJECT : askdoctorValidatorService.validator.RES.OBJECT.COMMENT
	    };
	    var RES_FAILED_CALLBACK = askdoctorResponseHandlerService.requestFailed;
        var REQ_COMPLETED_CALLBACK = {
            GET : askdoctorResponseHandlerService.getRequestCompleted,
            POST : askdoctorResponseHandlerService.postRequestCompleted,
            PUT : askdoctorResponseHandlerService.putRequestCompleted,
            PATCH : askdoctorResponseHandlerService.patchRequestCompleted,
            DELETE : askdoctorResponseHandlerService.deleteRequestCompleted
        };
        // Logger object
        var logger = Logger.getInstance('app - data - askdoctor - comment');
	    var service = {
	    	/* Create */
	        createComment           :  createComment,

	        /* Read */
	        readAllComment          :  readAllComment,
	        readComment             :  readComment,

	        /* Update */
	        updateComment           :  updateComment,
	        partiallyUpdateComment  :  partiallyUpdateComment,

	        /* Delete*/
	        deleteAllComment        :  deleteAllComment,
	        deleteComment           :  deleteComment
	    };
	    return service;

	    /*
	     * functions
	     */
	}

})();