function GET_VALID_ADMIN_ACCOUNT_ARRAY() {
    return [
        {
            account_id : 'id',
            user_type : 'ADMIN',
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
            user_type : 'ADMIN',
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
            user_type : 'ADMIN',
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

function GET_INVALID_ADMIN_ACCOUNT_ARRAY() {
    return [
        {
            account_id : 'id',
            user_type : 'ADMIN',
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
            user_type : 'ADMIN',
            account_type : 'ECHARM',
            email : 'email',
            salt : 'salt',
            created_at : 'created_at',
            user_info : {}
        }
    ];
}

function GET_VALID_ADMIN_ACCOUNT() {
    return {
        account_id : 'id',
        user_type : 'ADMIN',
        account_type : 'ECHARM',
        email : 'email',
        username : 'username',
        password : 'password',
        salt : 'salt',
        created_at : 'created_at',
        user_info : {}
    };
}

function GET_INVALID_ADMIN_ACCOUNT() {
    return {
        account_id : 'id',
        user_type : 'ADMIN',
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

/* Create Admin Account */

describe('Create Admin Account', function() {
    beforeEach(module('data.account'));
    beforeEach(inject(function(adminAccountService, accountExceptionCatcherService, $httpBackend) {
        service = adminAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/admins';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Admin Account - 201', function() {
            http.when('POST', URL)
                .respond(201, GET_VALID_ADMIN_ACCOUNT());

            var account = service.createAdminAccount(GET_VALID_ADMIN_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_ADMIN_ACCOUNT());
            })
            http.flush();
        });

        it('Valid Admin Account - 204', function() {
            http.when('POST', URL)
                .respond(204, GET_VALID_ADMIN_ACCOUNT());

            var account = service.createAdminAccount(GET_VALID_ADMIN_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Admin Account - 201', function() {
            http.when('POST', URL)
                .respond(201, GET_INVALID_ADMIN_ACCOUNT());

            try {
                var account = service.createAdminAccount(GET_INVALID_ADMIN_ACCOUNT());
                account.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
            }
        });

        it('Invalid Admin Account - 204', function() {
            http.when('POST', URL)
                .respond(204, GET_INVALID_ADMIN_ACCOUNT());

            try {
                var account = service.createAdminAccount(GET_INVALID_ADMIN_ACCOUNT());
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
        it('Valid Admin Account - 403', function() {
            http.when('POST', URL)
                .respond(403, GET_VALID_ADMIN_ACCOUNT());

            try {
                var account = service.createAdminAccount(GET_VALID_ADMIN_ACCOUNT());
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

/* Read Admin Account */

describe('Read All Admin Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(adminAccountService, accountExceptionCatcherService, $httpBackend) {
        service = adminAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/admins';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Admin Account Arr - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_VALID_ADMIN_ACCOUNT_ARRAY());

            var account = service.readAllAdminAccount();
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_ADMIN_ACCOUNT_ARRAY());
            })
            http.flush();
        });

        it('Valid Admin Account Arr - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_VALID_ADMIN_ACCOUNT_ARRAY());

            var account = service.readAllAdminAccount();
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Admin Account Arr - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_INVALID_ADMIN_ACCOUNT_ARRAY());

            var commment = service.readAllAdminAccount();
            commment.then(function(data) {
                var invalidArr = GET_INVALID_ADMIN_ACCOUNT_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Admin Account Arr - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_INVALID_ADMIN_ACCOUNT_ARRAY());

            var account = service.readAllAdminAccount();
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Admin Account Arr - 400', function() {
            http.when('GET', URL)
                .respond(400, GET_VALID_ADMIN_ACCOUNT_ARRAY());

            try {
                var account = service.readAllAdminAccount();
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

describe('Read Admin Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(adminAccountService, accountExceptionCatcherService, $httpBackend) {
        service = adminAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/admins/accountId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Admin Account - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_VALID_ADMIN_ACCOUNT());

            var account = service.readAdminAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_ADMIN_ACCOUNT());
            })
            http.flush();
        });

        it('Valid Admin Account - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_VALID_ADMIN_ACCOUNT());

            var account = service.readAdminAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Admin Account - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_INVALID_ADMIN_ACCOUNT());

            var account = service.readAdminAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid Admin Account - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_INVALID_ADMIN_ACCOUNT());

            var account = service.readAdminAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Admin Account - 403', function() {
            http.when('GET', URL)
                .respond(403, GET_VALID_ADMIN_ACCOUNT());

            try {
                var account = service.readAdminAccount('accountId');
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

/* Update Admin Account */

describe('Update Admin Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(adminAccountService, accountExceptionCatcherService, $httpBackend) {
        service = adminAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/admins/accountId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Admin Account - 200', function() {
            http.when('PUT', URL)
                .respond(200, GET_VALID_ADMIN_ACCOUNT());

            var account = service.updateAdminAccount('accountId', GET_VALID_ADMIN_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_ADMIN_ACCOUNT());
            })
            http.flush();
        });

        it('Valid Admin Account - 204', function() {
            http.when('PUT', URL)
                .respond(204, GET_VALID_ADMIN_ACCOUNT());

            var account = service.updateAdminAccount('accountId', GET_VALID_ADMIN_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Admin Account - 200', function() {
            http.when('PUT', URL)
                .respond(200, GET_INVALID_ADMIN_ACCOUNT());

            try {
                var account = service.updateAdminAccount('accountId', GET_INVALID_ADMIN_ACCOUNT());
                account.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
            }
        });

        it('Invalid Admin Account - 204', function() {
            http.when('PUT', URL)
                .respond(204, GET_INVALID_ADMIN_ACCOUNT());

            try {
                var account = service.updateAdminAccount('accountId', GET_INVALID_ADMIN_ACCOUNT());
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
        it('Valid Admin Account - 403', function() {
            http.when('PUT', URL)
                .respond(403, GET_VALID_ADMIN_ACCOUNT());

            try {
                var account = service.updateAdminAccount('accountId', GET_VALID_ADMIN_ACCOUNT());
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

describe('Partially Update Admin Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(adminAccountService, accountExceptionCatcherService, $httpBackend) {
        service = adminAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/admins/accountId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Admin Account - 200', function() {
            http.when('PATCH', URL)
                .respond(200, GET_VALID_ADMIN_ACCOUNT());

            var account = service.partiallyUpdateAdminAccount('accountId', GET_VALID_ADMIN_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_ADMIN_ACCOUNT());
            })
            http.flush();
        });

        it('Valid Admin Account - 204', function() {
            http.when('PATCH', URL)
                .respond(204, GET_VALID_ADMIN_ACCOUNT());

            var account = service.partiallyUpdateAdminAccount('accountId', GET_VALID_ADMIN_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        // partial input passed and the output should be valid
        it('Invalid Admin Account - 200', function() {
            http.when('PATCH', URL)
                .respond(200, GET_VALID_ADMIN_ACCOUNT());

            var account = service.partiallyUpdateAdminAccount('accountId', GET_INVALID_ADMIN_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_ADMIN_ACCOUNT());
            })
            http.flush();
        });

        it('Invalid Admin Account - 204', function() {
            http.when('PATCH', URL)
                .respond(204, GET_INVALID_ADMIN_ACCOUNT());

            var account = service.partiallyUpdateAdminAccount('accountId', GET_INVALID_ADMIN_ACCOUNT());
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Admin Account - 403', function() {
            http.when('PATCH', URL)
                .respond(403, GET_VALID_ADMIN_ACCOUNT());

            try {
                var account = service.partiallyUpdateAdminAccount('accountId', GET_VALID_ADMIN_ACCOUNT());
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

/* Delete Admin Account */

describe('Delete All Admin Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(adminAccountService, accountExceptionCatcherService, $httpBackend) {
        service = adminAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/admins';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Admin Account Arr - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_VALID_ADMIN_ACCOUNT_ARRAY());

            var account = service.deleteAllAdminAccount();
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_ADMIN_ACCOUNT_ARRAY());
            })
            http.flush();
        });

        it('Valid Admin Account Arr - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_VALID_ADMIN_ACCOUNT_ARRAY());

            var account = service.deleteAllAdminAccount();
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Admin Account Arr - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_INVALID_ADMIN_ACCOUNT_ARRAY());

            var account = service.deleteAllAdminAccount();
            account.then(function(data) {
                var invalidArr = GET_INVALID_ADMIN_ACCOUNT_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Admin Account Arr - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_INVALID_ADMIN_ACCOUNT_ARRAY());

            var account = service.deleteAllAdminAccount();
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Admin Account Arr - 404', function() {
            http.when('DELETE', URL)
                .respond(404, GET_VALID_ADMIN_ACCOUNT_ARRAY());

            try {
                var account = service.deleteAllAdminAccount();
                account.then(function(data) {
                    // cannot get here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('Object not found!');
            }
        });
    });
});

describe('Delete Admin Account', function() {

    beforeEach(module('data.account'));
    beforeEach(inject(function(adminAccountService, accountExceptionCatcherService, $httpBackend) {
        service = adminAccountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/admins/accountId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Admin Account - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_VALID_ADMIN_ACCOUNT());

            var account = service.deleteAdminAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(GET_VALID_ADMIN_ACCOUNT());
            })
            http.flush();
        });

        it('Valid Admin Account - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_VALID_ADMIN_ACCOUNT());

            var account = service.deleteAdminAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Admin Account - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_INVALID_ADMIN_ACCOUNT());

            var account = service.deleteAdminAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid Admin Account - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_INVALID_ADMIN_ACCOUNT());

            var account = service.deleteAdminAccount('accountId');
            account.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Admin Account - 500', function() {
            http.when('DELETE', URL)
                .respond(500, GET_VALID_ADMIN_ACCOUNT());

            try {
                var account = service.deleteAdminAccount('accountId');
                account.then(function(data) {
                    // cannot get here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('Something is wrong with the server!');
            }
        });
    });
});