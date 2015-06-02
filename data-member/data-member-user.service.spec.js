var URL;
var service;
var exceptionService;
var http;

describe('Update Me User Test', function() {
    beforeEach(module('data.member'));
    beforeEach(inject(function(memberUserService, memberExceptionCatcherService, $httpBackend) {
        service = memberUserService;
        exceptionService = memberExceptionCatcherService;
        http = $httpBackend;
        URL = 'http://localhost:8080/members/users';
    }));

    it('Valid Input', function() {
        http.when('PUT', URL)
            .respond(200, GET_VALID_RES_USER_ARRAY()[0]);

        var promise = service.updateMeUser(GET_VALID_PUT_USER());
        promise.then(function(data) {
            expect(data).toEqual(GET_VALID_RES_USER_ARRAY()[0]);
        });
        http.flush();
    });

    it('Invalid Input', function() {
        http.when('PUT', URL)
            .respond(200, GET_VALID_RES_USER_ARRAY()[0]);

        try {
            var promise = service.updateMeUser(GET_INVALID_PUT_USER());
            promise
                .then(function(data) {
                    // should not be here
                    expect(true).toEqual(false);
                });
            http.flush();
        } catch (error) {
            expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
        }

        try {
            var promise = service.updateMeUser(null);
            promise
                .then(function(data) {
                    // should not be here
                    expect(true).toEqual(false);
                });
            http.flush();
        } catch (error) {
            expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
        }

        try {
            var promise = service.updateMeUser(undefined);
            promise
                .then(function(data) {
                    // should not be here
                    expect(true).toEqual(false);
                });
            http.flush();
        } catch (error) {
            expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
        }
    });

    it('Invalid Response', function() {
        http.when('PUT', URL)
            .respond(200, GET_INVALID_RES_USER_ARRAY()[2]);

        var promise = service.updateMeUser(GET_VALID_PUT_USER());
        promise
            .then(function(data) {
                expect(data).toEqual(null);
            });
        http.flush();
    });
});

describe('Get User Test', function() {
    beforeEach(module('data.member'));
    beforeEach(inject(function(memberUserService, memberExceptionCatcherService, $httpBackend) {
        service = memberUserService;
        exceptionService = memberExceptionCatcherService;
        http = $httpBackend;
        URL = 'http://localhost:8080/members/users';
    }));

    it('Valid Input', function() {
        http.when('GET', URL + '?id_list=id1,id2')
            .respond(200, GET_VALID_RES_USER_ARRAY());

        var promise = service.readUsers(['id1', 'id2']);
        promise.then(function(data) {
            expect(data).toEqual(GET_VALID_RES_USER_ARRAY());
        });
        http.flush();
    });

    it('Invalid Input', function() {
        http.when('GET', URL + '?id_list=id1,id2')
            .respond(200, GET_INVALID_RES_USER_ARRAY());

        var promise = service.readUsers(['id1', 'id2']);
        promise.then(function(data) {
            var invalidArr = GET_INVALID_RES_USER_ARRAY();
            invalidArr.splice(2, 1);
            expect(data).toEqual(invalidArr);
        });
        http.flush();
    });
});


function GET_VALID_PUT_USER() {
    return {
        user_info : {
            name : 'name1',
            gender : 'MALE'
        }
    };
}

function GET_INVALID_PUT_USER() {
    return {
        user_info : {}
    };
}

function GET_VALID_RES_USER_ARRAY() {
    return [
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            username : 'username',
            created_at : 'created_at',
            user_info : {}
        },
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            username : 'username',
            created_at : 'created_at',
            user_info : {}
        },
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            username : 'username',
            created_at : 'created_at',
            user_info : {}
        }
    ];
}

function GET_INVALID_RES_USER_ARRAY() {
    return [
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            username : 'username',
            created_at : 'created_at',
            user_info : {}
        },
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            username : 'username',
            created_at : 'created_at',
            user_info : {}
        },
        {
            account_id : 'id',
            user_type : 'USER',
            account_type : 'ECHARM',
            email : 'email',
            created_at : 'created_at',
            user_info : {}
        }
    ];
}