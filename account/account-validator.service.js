/*
 * Validator Service for Account System
 */

//module getter
angular
    .module('account')
    .factory('accountValidatorService', accountValidatorService);

function accountValidatorService() {
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

    function validateRequestUserAccountFilled(userAccount) {

    }

    function validateRequestUserAccountNotEmpty(userAccount) {

    }

    function validateRequestDoctorAccountFilled(doctorAccount) {

    }

    function validateRequestDoctorAccountNotEmpty(doctorAccount) {

    }

    function validateRequestAdminAccountFilled(adminAccount) {

    }

    function validateRequestAdminAccountNotEmpty(adminAccount) {

    }

    /* response validation functions */

    function validateResponseUserAccountArray(userAccountArray) {

    }

    function validateResponseUserAccountObject(userAccount) {

    }

    function validateResponseDoctorAccountArray(doctorAccountArray) {

    }

    function validateResponseDoctorAccountObject(doctorAccount) {

    }

    function validateResponseAdminAccountArray(adminAccountArray) {

    }

    function validateResponseAdminAccountObject(adminAccount) {

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
     * @desc Validate if the input account array has all fields
     *       required in a HTTP response
     * @param {Object} accountArray an array of account objects
     *                              to be checked
     * @returns {Array} an array that only contains the ligit
     *                  accounts (others are filtered)
     */
    function validateResponseAccountArray(accountArray) {
        // check the account array
        if (!angular.isArray(accountArray) || accountArray.length <= 0)
            return null;

        for (var i = 0; i < accountArray.length; i++) {
            var account = validateResponseAccount(accountArray[i]);
            if (account === null) {
                // remove invalid array
                accountArray.splice(i--, 1);
            }
        }

        if (accountArray.length === 0)
            return null;

        return accountArray;
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
}