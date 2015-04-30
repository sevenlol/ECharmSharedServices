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

    function validateRequestAccountFilled(account) {

    }

    function validateRequestAccountNotEmpty(account) {

    }

    function validateResponseAccountArray(accountArray) {

    }

    function validateResponseAccount(account) {

    }
}