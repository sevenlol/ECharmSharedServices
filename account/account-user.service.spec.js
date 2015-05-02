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

/* Read User Account */

describe('Read All User Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(userAccountService, accountExceptionCatcherService, $httpBackend) {
        service = userAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/users';
    }));

    describe('Operation Succeeded', function() {
        it('Valid User Account Arr - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_VALID_USER_ACCOUNT_ARRAY());

            var account = service.readAllUserAccount();
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_USER_ACCOUNT_ARRAY());
            })
            http.flush();
        });

        it('Valid User Account Arr - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_VALID_USER_ACCOUNT_ARRAY());

            var account = service.readAllUserAccount();
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid User Account Arr - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_INVALID_USER_ACCOUNT_ARRAY());

            var commment = service.readAllUserAccount();
            commment.then(function(data) {
                var invalidArr = GET_INVALID_USER_ACCOUNT_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid User Account Arr - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_INVALID_USER_ACCOUNT_ARRAY());

            var account = service.readAllUserAccount();
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid User Account Arr - 400', function() {
            http.when('GET', URL)
                .respond(400, GET_VALID_USER_ACCOUNT_ARRAY());

            try {
                var account = service.readAllUserAccount();
                account.then(function(data) {
                    // cannot get here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('Something is wrong with the request!');
            }
        });
    });
});

describe('Read User Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(userAccountService, accountExceptionCatcherService, $httpBackend) {
        service = userAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/users/accountId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid User Account - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_VALID_USER_ACCOUNT());

            var account = service.readUserAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_USER_ACCOUNT());
            })
            http.flush();
        });

        it('Valid User Account - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_VALID_USER_ACCOUNT());

            var account = service.readUserAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid User Account - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_INVALID_USER_ACCOUNT());

            var account = service.readUserAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid User Account - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_INVALID_USER_ACCOUNT());

            var account = service.readUserAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid User Account - 403', function() {
            http.when('GET', URL)
                .respond(403, GET_VALID_USER_ACCOUNT());

            try {
                var account = service.readUserAccount('accountId');
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

/* Update User Account */

describe('Update User Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(userAccountService, accountExceptionCatcherService, $httpBackend) {
        service = userAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/users/accountId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid User Account - 200', function() {
            http.when('PUT', URL)
                .respond(200, GET_VALID_USER_ACCOUNT());

            var account = service.updateUserAccount('accountId', GET_VALID_USER_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_USER_ACCOUNT());
            })
            http.flush();
        });

        it('Valid User Account - 204', function() {
            http.when('PUT', URL)
                .respond(204, GET_VALID_USER_ACCOUNT());

            var account = service.updateUserAccount('accountId', GET_VALID_USER_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid User Account - 200', function() {
            http.when('PUT', URL)
                .respond(200, GET_INVALID_USER_ACCOUNT());

            try {
                var account = service.updateUserAccount('accountId', GET_INVALID_USER_ACCOUNT());
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
            http.when('PUT', URL)
                .respond(204, GET_INVALID_USER_ACCOUNT());

            try {
                var account = service.updateUserAccount('accountId', GET_INVALID_USER_ACCOUNT());
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
            http.when('PUT', URL)
                .respond(403, GET_VALID_USER_ACCOUNT());

            try {
                var account = service.updateUserAccount('accountId', GET_VALID_USER_ACCOUNT());
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

describe('Partially Update User Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(userAccountService, accountExceptionCatcherService, $httpBackend) {
        service = userAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/users/accountId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid User Account - 200', function() {
            http.when('PATCH', URL)
                .respond(200, GET_VALID_USER_ACCOUNT());

            var account = service.partiallyUpdateUserAccount('accountId', GET_VALID_USER_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_USER_ACCOUNT());
            })
            http.flush();
        });

        it('Valid User Account - 204', function() {
            http.when('PATCH', URL)
                .respond(204, GET_VALID_USER_ACCOUNT());

            var account = service.partiallyUpdateUserAccount('accountId', GET_VALID_USER_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        // partial input passed and the output should be valid
        it('Invalid User Account - 200', function() {
            http.when('PATCH', URL)
                .respond(200, GET_VALID_USER_ACCOUNT());

            var account = service.partiallyUpdateUserAccount('accountId', GET_INVALID_USER_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_USER_ACCOUNT());
            })
            http.flush();
        });

        it('Invalid User Account - 204', function() {
            http.when('PATCH', URL)
                .respond(204, GET_INVALID_USER_ACCOUNT());

            var account = service.partiallyUpdateUserAccount('accountId', GET_INVALID_USER_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid User Account - 403', function() {
            http.when('PATCH', URL)
                .respond(403, GET_VALID_USER_ACCOUNT());

            try {
                var account = service.partiallyUpdateUserAccount('accountId', GET_VALID_USER_ACCOUNT());
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