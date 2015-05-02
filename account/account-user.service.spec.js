function GET_VALID_USER_ACCOUNT_ARRAY() {
    return [
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            username : 'username',
            password : 'password',
            salt : 'salt',
            created_at : 'created_at',
            user_info : {}
        },
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            username : 'username',
            password : 'password',
            salt : 'salt',
            created_at : 'created_at',
            user_info : {}
        },
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            username : 'username',
            password : 'password',
            salt : 'salt',
            created_at : 'created_at',
            user_info : {}
        }
    ];
}

function GET_INVALID_USER_ACCOUNT_ARRAY() {
    return [
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            username : 'username',
            password : 'password',
            salt : 'salt',
            created_at : 'created_at',
            user_info : {}
        },
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            salt : 'salt',
            created_at : 'created_at',
            user_info : {}
        }
    ];
}

function GET_VALID_USER_ACCOUNT() {
    return {
        account_id : 'id',
        user_type : 'USER',
        account_type : 'ECHARM',
        email : 'email',
        username : 'username',
        password : 'password',
        salt : 'salt',
        created_at : 'created_at',
        user_info : {}
    };
}

function GET_INVALID_USER_ACCOUNT() {
    return {
        account_id : 'id',
        user_type : 'USER',
        account_type : 'ECHARM',
        email : 'email',
        salt : 'salt',
        created_at : 'created_at',
        user_info : {}
    };
}
var URL;
var service;
var http;
var exceptionService;

/* Create User Account */

describe('Create User Account', function() {
    beforeEach(module('data.account'));
    beforeEach(inject(function(userAccountService, accountExceptionCatcherService, $httpBackend) {
        service = userAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/users';
    }));

    describe('Operation Succeeded', function() {
        it('Valid User Account - 201', function() {
            http.when('POST', URL)
                .respond(201, GET_VALID_USER_ACCOUNT());

            var account = service.createUserAccount(GET_VALID_USER_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_USER_ACCOUNT());
            })
            http.flush();
        });

        it('Valid User Account - 204', function() {
            http.when('POST', URL)
                .respond(204, GET_VALID_USER_ACCOUNT());

            var account = service.createUserAccount(GET_VALID_USER_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid User Account - 201', function() {
            http.when('POST', URL)
                .respond(201, GET_INVALID_USER_ACCOUNT());

            try {
                var account = service.createUserAccount(GET_INVALID_USER_ACCOUNT());
                account.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
            }
        });

        it('Invalid User Account - 204', function() {
            http.when('POST', URL)
                .respond(204, GET_INVALID_USER_ACCOUNT());

            try {
                var account = service.createUserAccount(GET_INVALID_USER_ACCOUNT());
                account.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
            }
        });
    });

    describe('Operation Failed', function() {
        it('Valid User Account - 403', function() {
            http.when('POST', URL)
                .respond(403, GET_VALID_USER_ACCOUNT());

            try {
                var account = service.createUserAccount(GET_VALID_USER_ACCOUNT());
                account.then(function(data) {
                    // cannot get here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('You are not authorized for this action!');
            }
        });
    });
});