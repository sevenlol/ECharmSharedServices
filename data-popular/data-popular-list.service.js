(function() {
	'use strict';

	angular
		.module('data.popular')
		.factory('popularListService', popularListService);

	popularListService.$inject = [
		'$http',
        'popularResponseHandlerService',
        'popularValidatorService',
        'popularExceptionCatcherService',
        'valueService',
        'Logger'
	];

	function popularListService(
		$http,
        popularResponseHandlerService,
        popularValidatorService,
        popularExceptionCatcherService,
        valueService,
        Logger) {

		// Logger object
        var logger = Logger.getInstance('app - data - popular - list');

		var service = {
			readPopularArticleList : readPopularArticleList,
			readPopularQAList      : readPopularQAList,
			readPopularDoctorList  : readPopularDoctorList
		};
		return service;

		/* public functions */

		function readPopularArticleList(category) {
			// body...
		}

		function readPopularQAList(category) {
			// body...
		}

		function readPopularDoctorList(category) {
			// body...
		}

		/* private functions */
	}

})();
