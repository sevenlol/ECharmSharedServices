/*
 * Validator Service for Account System
 */

//module getter
angular
    .module('data.account')
    .factory('accountValidatorService', accountValidatorService);

function accountValidatorService() {
    // TODO move user type to another service
    var USER_TYPE = {
        USER   : 'USER',
        DOCTOR : 'DOCTOR',
        ADMIN  : 'ADMIN'
    };
    var service = {
        requestValidator : {
            userAccountValidator : {
                validateFilled : validateRequestUserAccountFilled,
                validateNotEmpty : validateRequestUserAccountNotEmpty
            },
            doctorAccountValidator : {
                validateFilled : validateRequestDoctorAccountFilled,
                validateNotEmpty : validateRequestDoctorAccountNotEmpty
            },
            adminAccountValidator : {
                validateFilled : validateRequestAdminAccountFilled,
                validateNotEmpty : validateRequestAdminAccountNotEmpty
            }
        },
        responseValidator : {
            userAccountValidator : {
                validateArray : validateResponseUserAccountArray,
                validateObject : validateResponseUserAccountObject
            },
            doctorAccountValidator : {
                validateArray : validateResponseDoctorAccountArray,
                validateObject : validateResponseDoctorAccountObject
            },
            adminAccountValidator : {
                validateArray : validateResponseAdminAccountArray,
                validateObject : validateResponseAdminAccountObject
            }
        }
    };
    return service;

    /*
     * public functions
     */

    /* request validation functions */

    /*
     * @desc Validate if the input UserAccount has all fields required
     *       in a HTTP request
     * @param {Object} userAccount the UserAccount object to be checked
     * @returns {Object}  the input UserAccount object if validated,
     *                    null otherwise
     */
    function validateRequestUserAccountFilled(userAccount) {
        return validateRequestAccountFilled(userAccount);
    }

    /*
     * @desc Validate if the input UserAccount has at least one field
     *       required in a HTTP request
     * @param {Object} userAccount the UserAccount object to be checked
     * @returns {Object}  the input UserAccount object if validated,
     *                    null otherwise
     */
    function validateRequestUserAccountNotEmpty(userAccount) {
        return validateRequestAccountNotEmpty(userAccount);
    }

    /*
     * @desc Validate if the input DoctorAccount has all fields required
     *       in a HTTP request
     * @param {Object} doctorAccount the DoctorAccount object to be checked
     * @returns {Object}  the input DoctorAccount object if validated,
     *                    null otherwise
     */
    function validateRequestDoctorAccountFilled(doctorAccount) {
        if (validateRequestAccountFilled(doctorAccount) === null)
            return null;

        var doctorInfo = doctorAccount.user_info;
        // check doctor info's fields
        if (validateDoctorInfoFilled(doctorInfo) === null)
            return null;

        return doctorAccount;
    }

    /*
     * @desc Validate if the input DoctorAccount has at least one field
     *       required in a HTTP request
     * @param {Object} doctorAccount the DoctorAccount object to be checked
     * @returns {Object}  the input DoctorAccount object if validated,
     *                    null otherwise
     */
    function validateRequestDoctorAccountNotEmpty(doctorAccount) {
        // if already not empty, return
        if (validateRequestAccountNotEmpty(doctorAccount) !== null)
            return doctorAccount;

        var doctorInfo = doctorAccount.user_info;
        // check doctor info's fields
        if ((!angular.isString(doctorInfo.name)              ||  doctorInfo.name             === "") &&
            (!angular.isString(doctorInfo.gender)            ||  doctorInfo.gender           === "") &&
            (!angular.isString(doctorInfo.phone_number)      || doctorInfo.phone_number      === "") &&
            (!angular.isString(doctorInfo.address)           || doctorInfo.address           === "") &&
            (!angular.isString(doctorInfo.category)          ||  doctorInfo.category         === "") &&
            (!angular.isString(doctorInfo.current_hospital)  ||  doctorInfo.current_hospital === "") &&
            (!angular.isString(doctorInfo.college)           || doctorInfo.college           === "") &&
            (!angular.isString(doctorInfo.title)             || doctorInfo.title             === "") &&
            (!angular.isString(doctorInfo.specialty)         || doctorInfo.specialty         === "") &&
            (!angular.isString(doctorInfo.available_time)    || doctorInfo.available_time    === "") &&
            (!angular.isString(doctorInfo.facebook_account)  /*|| doctorInfo.facebook_account   === ""*/) &&
            (!angular.isString(doctorInfo.blog_url)  /*doctorInfo.blog_url   === "" ||*/)            /*&&
            (!angular.isNumber(doctorInfo.average_rating))                                           &&
            (!angular.isNumber(doctorInfo.rating_count))*/) {
            return null;
        }

        // not empty
        return doctorAccount;
    }

    /*
     * @desc Validate if the input AdminAccount has all fields required
     *       in a HTTP request
     * @param {Object} adminAccount the AdminAccount object to be checked
     * @returns {Object}  the input AdminAccount object if validated,
     *                    null otherwise
     */
    function validateRequestAdminAccountFilled(adminAccount) {
        return validateRequestAccountFilled(adminAccount);
    }

    /*
     * @desc Validate if the input AdminAccount has at least one field
     *       required in a HTTP request
     * @param {Object} adminAccount the AdminAccount object to be checked
     * @returns {Object}  the input AdminAccount object if validated,
     *                    null otherwise
     */
    function validateRequestAdminAccountNotEmpty(adminAccount) {
        return validateRequestAccountNotEmpty(adminAccount);
    }

    /* response validation functions */

    /*
     * @desc Validate if the input UserAccount array has all fields
     *       required in a HTTP response
     * @param {Object} userAccountArray an array of UserAccount objects
     *                              to be checked
     * @returns {Array} an array that only contains the ligit
     *                  UserAccounts (others are filtered)
     */
    function validateResponseUserAccountArray(userAccountArray) {
        // check the user account array
        if (!angular.isArray(userAccountArray) || userAccountArray.length <= 0)
            return null;

        for (var i = 0; i < userAccountArray.length; i++) {
            var account = validateResponseUserAccountObject(userAccountArray[i]);
            if (account === null) {
                // remove invalid array
                userAccountArray.splice(i--, 1);
            }
        }

        if (userAccountArray.length === 0)
            return null;

        return userAccountArray;
    }

    /*
     * @desc Validate if the input UserAccount has all fields required
     *       in a HTTP response
     * @param {Object} userAccount the UserAccount object to be checked
     * @returns {Object}  the input UserAccount object if validated,
     *                    null otherwise
     */
    function validateResponseUserAccountObject(userAccount) {
        if (validateResponseAccount(userAccount) === null)
            return null;

        // validate user type
        if (!angular.isString(userAccount.user_type) || userAccount.user_type !== USER_TYPE.USER)
            return null;

        return userAccount;
    }

    /*
     * @desc Validate if the input DoctorAccount array has all fields
     *       required in a HTTP response
     * @param {Object} doctorAccountArray an array of DoctorAccount objects
     *                              to be checked
     * @returns {Array} an array that only contains the ligit
     *                  DoctorAccounts (others are filtered)
     */
    function validateResponseDoctorAccountArray(doctorAccountArray) {
        // check the user account array
        if (!angular.isArray(doctorAccountArray) || doctorAccountArray.length <= 0)
            return null;

        for (var i = 0; i < doctorAccountArray.length; i++) {
            var account = validateResponseDoctorAccountObject(doctorAccountArray[i]);
            if (account === null) {
                // remove invalid array
                doctorAccountArray.splice(i--, 1);
            }
        }

        if (doctorAccountArray.length === 0)
            return null;

        return doctorAccountArray;
    }

    /*
     * @desc Validate if the input DoctorAccount has all fields required
     *       in a HTTP response
     * @param {Object} doctorAccount the DoctorAccount object to be checked
     * @returns {Object}  the input DoctorAccount object if validated,
     *                    null otherwise
     */
    function validateResponseDoctorAccountObject(doctorAccount) {
        if (validateResponseAccount(doctorAccount) === null)
            return null;

        // validate user type
        if (!angular.isString(doctorAccount.user_type) || doctorAccount.user_type !== USER_TYPE.DOCTOR)
            return null;

        var doctorInfo = doctorAccount.user_info;
        // check doctor info's fields
        if (validateDoctorInfoFilled(doctorInfo) === null)
            return null;

        return doctorAccount;
    }

    /*
     * @desc Validate if the input AdminAccount array has all fields
     *       required in a HTTP response
     * @param {Object} adminAccountArray an array of AdminAccount objects
     *                              to be checked
     * @returns {Array} an array that only contains the ligit
     *                  AdminAccounts (others are filtered)
     */
    function validateResponseAdminAccountArray(adminAccountArray) {
        // check the user account array
        if (!angular.isArray(adminAccountArray) || adminAccountArray.length <= 0)
            return null;

        for (var i = 0; i < adminAccountArray.length; i++) {
            var account = validateResponseAdminAccountObject(adminAccountArray[i]);
            if (account === null) {
                // remove invalid array
                adminAccountArray.splice(i--, 1);
            }
        }

        if (adminAccountArray.length === 0)
            return null;

        return adminAccountArray;
    }

    /*
     * @desc Validate if the input AdminAccount has all fields required
     *       in a HTTP response
     * @param {Object} adminAccount the AdminAccount object to be checked
     * @returns {Object}  the input AdminAccount object if validated,
     *                    null otherwise
     */
    function validateResponseAdminAccountObject(adminAccount) {
        if (validateResponseAccount(adminAccount) === null)
            return null;

        // validate user type
        if (!angular.isString(adminAccount.user_type) || adminAccount.user_type !== USER_TYPE.ADMIN)
            return null;

        return adminAccount;
    }

    /*
     * private functions
     */

    /*
     * @desc Validate if the input account has all fields required
     *       in a HTTP request
     * @param {Object} account the account object to be checked
     * @returns {Object}  the input account object if validated,
     *                    null otherwise
     */
    function validateRequestAccountFilled(account) {
        // check the account object
        if (!angular.isObject(account) || account === null  || angular.isArray(account))
            return null;

        // check string fields
        if (!angular.isString(account.account_type) || account.account_type === "" ||
            !angular.isString(account.email)        || account.email        === "" ||
            !angular.isString(account.username)     || account.username     === "" ||
            !angular.isString(account.salt)         || account.salt         === "" ||
            !angular.isString(account.password)     || account.password     === "" ||
            !angular.isString(account.created_at)   || account.created_at   === "") {
            return null;
        }

        // check the user_info object
        if (!angular.isObject(account.user_info) || account.user_info === null  || angular.isArray(account.user_info))
            return null;

        return account;
    }

    /*
     * @desc Validate if the input account has at least one field
     *       required in a HTTP request
     * @param {Object} account the account object to be checked
     * @returns {Object}  the input account object if validated,
     *                    null otherwise
     */
    function validateRequestAccountNotEmpty(account) {
        // check if the account object is valid
        if (!angular.isObject(account) || account === null || angular.isArray(account))
            return null;

        // check if any fields are invalid
        if ((!angular.isString(account.account_type)  || account.account_type === "") &&
            (!angular.isString(account.email)         || account.email        === "") &&
            (!angular.isString(account.username)      || account.username     === "") &&
            (!angular.isString(account.created_at)    || account.created_at   === "") &&
            (!angular.isString(account.salt)          || account.salt         === "") &&
            (!angular.isString(account.password)      || account.password     === "") &&
            (!angular.isObject(account.user_info)     || account.user_info === null  || angular.isArray(account.user_info))) {
            return null;
        }

        return account;
    }

    /*
     * @desc Validate if the input account has all fields required
     *       in a HTTP response
     * @param {Object} account the account object to be checked
     * @returns {Object}  the input account object if validated,
     *                    null otherwise
     */
    function validateResponseAccount(account) {
        // check the account object
        if (!angular.isObject(account) || account === null  || angular.isArray(account))
            return null;

        // check string fields
        if (!angular.isString(account.account_id)   || account.account_id   === "" ||
            !angular.isString(account.user_type)    || account.user_type    === "" ||
            !angular.isString(account.account_type) || account.account_type === "" ||
            !angular.isString(account.email)        || account.email        === "" ||
            !angular.isString(account.username)     || account.username     === "" ||
            !angular.isString(account.salt)         || account.salt         === "" ||
            !angular.isString(account.password)     || account.password     === "" ||
            !angular.isString(account.created_at)   || account.created_at   === "") {
            return null;
        }

        // check the user_info object
        if (!angular.isObject(account.user_info) || account.user_info === null  || angular.isArray(account.user_info))
            return null;

        return account;
    }

    /*
     * @desc Validate if the user_info property in a doctorAccount
     *       contains all the fields
     * @param {Object} doctorInfo the user_info object to be checked
     * @returns {Object}  the input user_info object if validated,
     *                    null otherwise
     */
    function validateDoctorInfoFilled(doctorInfo) {
        // check the doctorInfo object
        if (!angular.isObject(doctorInfo) || doctorInfo === null  || angular.isArray(doctorInfo))
            return null;

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
            return null;
        }

        /*if (!angular.isNumber(doctorInfo.average_rating) ||
            !angular.isNumber(doctorInfo.rating_count)) {
            return null;
        }*/

        return doctorInfo;
    }
}