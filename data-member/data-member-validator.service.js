/*
 *  Validator Service In Member Data Services
 */

(function() {
    "use strict";

    // module setter
    angular
        .module('data.member')
        .factory('memberValidatorService', memberValidatorService);

    memberValidatorService.$inject = [
        'Logger'
    ];

    function memberValidatorService(Logger) {
        // TODO move user type to another service
        var USER_TYPE = {
            USER   : 'USER',
            DOCTOR : 'DOCTOR',
            ADMIN  : 'ADMIN'
        };
        // Logger object
        var logger = Logger.getInstance('app - data - member - validator');

        var service = {
            validator : {
                REQ : {
                    USER : {
                        POST   : validatePostRequestUser,
                        PUT    : validatePutRequestUser
                    },
                    DOCTOR : {
                        POST   : validatePostRequestDoctor,
                        PUT    : validatePutRequestDoctor
                    }
                },
                RES : {
                    USER : {
                        ARRAY  : validateResponseUserArray,
                        OBJECT : validateResponseUserObject
                    },
                    DOCTOR : {
                        ARRAY  : validateResponseDoctorArray,
                        OBJECT : validateResponseDoctorObject
                    }
                }
            }
        };
        return service;

        /*
         * public functions
         */

        /* request validator functions */

        function validatePostRequestUser(user) {
            // check the user object
            if (!angular.isObject(user) || user === null  || angular.isArray(user)) {
                logger.error('validatePostRequestUser', 'Invalid input user object!');
                logger.debug('validatePostRequestUser', 'Input object type: {0}', [ typeof user]);
                return null;
            }

            // check credential fields
            if (!angular.isString(user.email)        || user.email        === "" ||
                !angular.isString(user.username)     || user.username     === "" ||
                !angular.isString(user.password)     || user.password     === "") {
                logger.error('validatePostRequestUser', 'Missing credential fields!');
                return null;
            }

            logger.debug('validatePostRequestUser', 'Validation succeeded!');
            return user;
        }

        function validatePutRequestUser(user) {
            // check the user object
            if (!angular.isObject(user) || user === null  || angular.isArray(user)) {
                logger.error('validatePutRequestUser', 'Invalid input type: user!');
                logger.debug('validatePutRequestUser', 'Input object type: {0}', [ typeof user]);
                return null;
            }

            var userInfo = user.user_info;

            // check the user_info object
            if (!angular.isObject(userInfo) || userInfo === null  || angular.isArray(userInfo)) {
                logger.error('validatePutRequestUser', 'Invalid input field type: user.user_info!');
                logger.debug('validatePutRequestUser', 'Input field (user_info) type: {0}', [ typeof user.user_info]);
                return null;
            }

            // check if all fields in user_info are empty
            if (!userInfo.name && !userInfo.gender && !userInfo.phone_number && !userInfo.address) {
                logger.error('validatePutRequestUser', 'Empty input field: user.user_info!');
                return null;
            }

            if ((!angular.isString(userInfo.name)              ||  userInfo.name              === "") &&
                (!angular.isString(userInfo.gender)            ||  userInfo.gender            === "") &&
                (!angular.isString(userInfo.phone_number)      ||  userInfo.phone_number      === "") &&
                (!angular.isString(userInfo.address)           ||  userInfo.address           === "")) {
                logger.error('validatePutRequestUser', 'Empty string in input field (user.user_info)!');
                return null;
            }

            logger.debug('validatePutRequestUser', 'Validation succeeded!');
            return user;
        }

        function validatePostRequestDoctor(doctor) {
            // check the doctor object
            if (!angular.isObject(doctor) || doctor === null  || angular.isArray(doctor)) {
                logger.error('validatePutRequestUser', 'Invalid input type: doctor!');
                logger.debug('validatePutRequestUser', 'Input object type: {0}', [ typeof doctor]);
                return null;
            }

            // check credential fields
            if (!angular.isString(doctor.email)        || doctor.email        === "" ||
                !angular.isString(doctor.username)     || doctor.username     === "" ||
                !angular.isString(doctor.password)     || doctor.password     === "") {
                logger.error('validatePostRequestDoctor', 'Missing credential fields!');
                return null;
            }

            var doctorInfo = doctor.user_info;

            // check the doctorInfo object
            if (!angular.isObject(doctorInfo) || doctorInfo === null  || angular.isArray(doctorInfo)) {
                logger.error('validatePostRequestDoctor', 'Invalid input field type: doctor.user_info!');
                logger.debug('validatePostRequestDoctor', 'Input field (user_info) type: {0}', [ typeof doctor.user_info]);
                return null;
            }

            // check doctor info's string fields
            if (!angular.isString(doctorInfo.name)              || doctorInfo.name              === "" ||
                !angular.isString(doctorInfo.gender)            || doctorInfo.gender            === "" ||
                !angular.isString(doctorInfo.phone_number)      || doctorInfo.phone_number      === "" ||
                !angular.isString(doctorInfo.address)           || doctorInfo.address           === "" ||
                !angular.isString(doctorInfo.category)          || doctorInfo.category          === "" ||
                !angular.isString(doctorInfo.current_hospital)  || doctorInfo.current_hospital  === "" ||
                !angular.isString(doctorInfo.college)           || doctorInfo.college           === "" ||
                !angular.isString(doctorInfo.title)             || doctorInfo.title             === "" ||
                !angular.isString(doctorInfo.specialty)         || doctorInfo.specialty         === "" ||
                !angular.isString(doctorInfo.available_time)    || doctorInfo.available_time    === "" ||
                !angular.isString(doctorInfo.facebook_account)  || /*doctorInfo.facebook_account   === "" ||*/
                !angular.isString(doctorInfo.blog_url)  /*doctorInfo.blog_url   === "" ||*/) {
                logger.error('validatePostRequestDoctor', 'Empty string(s) in input field (doctor.user_info)!');
                return null;
            }

            logger.debug('validatePostRequestDoctor', 'Validation succeeded!');
            return doctor;
        }

        function validatePutRequestDoctor(doctor) {
            // check the doctor object
            if (!angular.isObject(doctor) || doctor === null  || angular.isArray(doctor)) {
                logger.error('validatePutRequestDoctor', 'Invalid input type: doctor!');
                logger.debug('validatePutRequestDoctor', 'Input object type: {0}', [ typeof doctor]);
                return null;
            }

            var doctorInfo = doctor.user_info;

            // check the doctorInfo object
            if (!angular.isObject(doctorInfo) || doctorInfo === null  || angular.isArray(doctorInfo)) {
                logger.error('validatePutRequestDoctor', 'Invalid input field type: doctor.user_info!');
                logger.debug('validatePutRequestDoctor', 'Input field (user_info) type: {0}', [ typeof doctor.user_info]);
                return null;
            }

            // check if all fields in user_info are empty
            // Note: not allowed to update category atm
            if (!doctorInfo.name && !doctorInfo.gender && !doctorInfo.phone_number && !doctorInfo.address &&
                !doctorInfo.current_hospital && !doctorInfo.college && !doctorInfo.title && !doctorInfo.specialty &&
                !doctorInfo.available_time && !doctorInfo.facebook_account && !doctorInfo.blog_url) {
                logger.error('validatePutRequestDoctor', 'Invalid input field (Empty Object): doctor.user_info!');
                return null;
            }

            // check doctor info's fields
            if ((!angular.isString(doctorInfo.name)              ||  doctorInfo.name             === "") &&
                (!angular.isString(doctorInfo.gender)            ||  doctorInfo.gender           === "") &&
                (!angular.isString(doctorInfo.phone_number)      || doctorInfo.phone_number      === "") &&
                (!angular.isString(doctorInfo.address)           || doctorInfo.address           === "") &&
                (!angular.isString(doctorInfo.current_hospital)  ||  doctorInfo.current_hospital === "") &&
                (!angular.isString(doctorInfo.college)           || doctorInfo.college           === "") &&
                (!angular.isString(doctorInfo.title)             || doctorInfo.title             === "") &&
                (!angular.isString(doctorInfo.specialty)         || doctorInfo.specialty         === "") &&
                (!angular.isString(doctorInfo.available_time)    || doctorInfo.available_time    === "") &&
                (!angular.isString(doctorInfo.facebook_account)  /*|| doctorInfo.facebook_account   === ""*/) &&
                (!angular.isString(doctorInfo.blog_url)  /*doctorInfo.blog_url   === "" ||*/)            /*&&
                (!angular.isNumber(doctorInfo.average_rating))                                           &&
                (!angular.isNumber(doctorInfo.rating_count))*/) {
                logger.error('validatePutRequestDoctor', 'Empty string(s) in input field (doctor.user_info)!');
                return null;
            }

            logger.debug('validatePutRequestDoctor', 'Validation succeeded!');
            return doctor;
        }

        /* response validator functions */

        function validateResponseUserArray(userArray) {
            // check the user account array
            if (!angular.isArray(userArray) || userArray.length <= 0) {
                logger.error('validateResponseUserArray', 'Invalid input: userArray!');
                logger.debug('validateResponseUserArray', 'Input type: {0}', [ typeof userArray ]);
                return null;
            }

            for (var i = 0; i < userArray.length; i++) {
                var account = validateResponseUserObject(userArray[i]);
                if (account === null) {
                    // remove invalid array
                    logger.error('validateResponseUserArray', 'Invalid user object at index: {0}!', [ i ]);
                    userArray.splice(i--, 1);
                }
            }

            if (userArray.length === 0) {
                logger.error('validateResponseUserArray', 'All user objects are invalid (empty result array)!');
                return null;
            }

            logger.debug('validateResponseUserArray', 'Validation succeeded!');
            return userArray;
        }

        function validateResponseUserObject(user) {
            if (validateResponseAccount(user) === null) {
                logger.error('validateResponseUserObject', 'Invalid input (account part): user!');
                return null;
            }

            // validate user type
            if (!angular.isString(user.user_type) || user.user_type !== USER_TYPE.USER) {
                logger.error('validateResponseUserObject', 'Invalid input field: user.user_type!');
                logger.debug('validateResponseUserObject', 'user.user_type: {0}', [ user.user_type ]);
                return null;
            }

            logger.debug('validateResponseUserObject', 'Validation succeeded!');
            return user;
        }

        function validateResponseDoctorArray(doctorArray) {
            // check the user account array
            if (!angular.isArray(doctorArray) || doctorArray.length <= 0) {
                logger.error('validateResponseDoctorArray', 'Invalid input: doctorArray!');
                logger.debug('validateResponseDoctorArray', 'Input type: {0}', [ typeof doctorArray ]);
                return null;
            }

            for (var i = 0; i < doctorArray.length; i++) {
                var account = validateResponseDoctorObject(doctorArray[i]);
                if (account === null) {
                    // remove invalid array
                    logger.error('validateResponseDoctorArray', 'Invalid doctor object at index: {0}!', [ i ]);
                    doctorArray.splice(i--, 1);
                }
            }

            if (doctorArray.length === 0) {
                logger.error('validateResponseDoctorArray', 'All doctor objects are invalid (empty result array)!');
                return null;
            }

            logger.debug('validateResponseDoctorArray', 'Validation succeeded!');
            return doctorArray;
        }

        function validateResponseDoctorObject(doctor) {
            if (validateResponseAccount(doctor) === null) {
                logger.error('validateResponseDoctorObject', 'Invalid input (account part): doctor!');
                return null;
            }

            // validate user type
            if (!angular.isString(doctor.user_type) || doctor.user_type !== USER_TYPE.DOCTOR) {
                logger.error('validateResponseDoctorObject', 'Invalid input field: doctor.user_type!');
                logger.debug('validateResponseDoctorObject', 'doctor.user_type: {0}', [ doctor.user_type ]);
                return null;
            }

            var doctorInfo = doctor.user_info;

            // check the doctorInfo object
            if (!angular.isObject(doctorInfo) || doctorInfo === null  || angular.isArray(doctorInfo)) {
                logger.error('validateResponseDoctorObject', 'Invalid input field type: doctor.user_info!');
                logger.debug('validateResponseDoctorObject', 'Input field (user_info) type: {0}', [ typeof doctor.user_info]);
                return null;
            }

            // check doctor info's string fields
            if (!angular.isString(doctorInfo.name)              || doctorInfo.name              === "" ||
                !angular.isString(doctorInfo.gender)            || doctorInfo.gender            === "" ||
                !angular.isString(doctorInfo.phone_number)      || doctorInfo.phone_number      === "" ||
                !angular.isString(doctorInfo.address)           || doctorInfo.address           === "" ||
                !angular.isString(doctorInfo.category)          || doctorInfo.category          === "" ||
                !angular.isString(doctorInfo.current_hospital)  || doctorInfo.current_hospital  === "" ||
                !angular.isString(doctorInfo.college)           || doctorInfo.college           === "" ||
                !angular.isString(doctorInfo.title)             || doctorInfo.title             === "" ||
                !angular.isString(doctorInfo.specialty)         || doctorInfo.specialty         === "" ||
                !angular.isString(doctorInfo.available_time)    || doctorInfo.available_time    === "" ||
                !angular.isString(doctorInfo.facebook_account)  || /*doctorInfo.facebook_account   === "" ||*/
                !angular.isString(doctorInfo.blog_url)  /*doctorInfo.blog_url   === "" ||*/) {
                logger.error('validateResponseDoctorObject', 'Empty string(s) in input field (doctor.user_info)!');
                return null;
            }

            logger.debug('validateResponseDoctorObject', 'Validation succeeded!');
            return doctor;
        }

        /*
         * private functions
         */

        // Note: password and salt will not be returned
        function validateResponseAccount(account) {
            // check the account object
            if (!angular.isObject(account) || account === null  || angular.isArray(account)) {
                logger.error('validateResponseAccount', 'Invalid input type: account!');
                logger.debug('validateResponseAccount', 'Input type: {0}', [ typeof account ]);
                return null;
            }

            // check string fields
            if (!angular.isString(account.account_id)   || account.account_id   === "" ||
                !angular.isString(account.user_type)    || account.user_type    === "" ||
                !angular.isString(account.account_type) || account.account_type === "" ||
                !angular.isString(account.email)        || account.email        === "" ||
                !angular.isString(account.username)     || account.username     === "" ||
                !angular.isString(account.created_at)   || account.created_at   === "") {
                logger.error('validateResponseAccount', 'Missing account string field(s)!');
                return null;
            }

            // check the user_info object
            if (!angular.isObject(account.user_info) || account.user_info === null  || angular.isArray(account.user_info)) {
                logger.error('validateResponseAccount', 'Invalid input type: account.user_info!');
                logger.debug('validateResponseAccount', 'Input type: {0}', [ typeof account.user_info ]);
                return null;
            }

            logger.debug('validateResponseAccount', 'Validation succeeded!');
            return account;
        }
    }

})();
