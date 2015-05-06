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
        username : 'username',
        password : 'password',
        salt : 'salt',
        created_at : 'created_at',
        user_info : {}
    };
}

function GET_VALID_DOCTOR_ACCOUNT() {
    return {
        account_id : 'id',
        user_type : 'DOCTOR',
        account_type : 'ECHARM',
        email : 'email',
        username : 'username',
        password : 'password',
        salt : 'salt',
        created_at : 'created_at',
        user_info : {
            name : 'name',
            gender : 'gender',
            phone_number : 'phone_number',
            address : 'address',
            category : 'category',
            current_hospital : 'current_hospital',
            college : 'college',
            title : 'title',
            specialty : 'specialty',
            available_time : 'available_time',
            facebook_account : 'fb',
            blog_url : 'blog_url',
            average_rating : 3,
            rating_count : 4
        }
    };
}

function GET_INVALID_DOCTOR_ACCOUNT() {
    return {
        account_id : 'id',
        user_type : 'DOCTOR',
        account_type : 'ECHARM',
        email : 'email',
        username : 'username',
        password : 'password',
        salt : 'salt',
        created_at : 'created_at',
        user_info : {
            name : 'name',
            gender : 'gender',
            college : 'college',
            title : 'title',
            specialty : 'specialty',
            available_time : 'available_time',
            facebook_account : 'fb',
            blog_url : 'blog_url',
            average_rating : 3,
            rating_count : 4
        }
    };
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

describe('Read Arbitrary Account', function() {
    beforeEach(module('data.account'));
    beforeEach(inject(function(accountService, accountExceptionCatcherService, $httpBackend) {
        service = accountService;
        exceptionService = accountExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/accounts/arbitrarys/accountId';
    }));

    it ('Operation Succeeded - Valid Admin Account', function() {
        http.when('GET', URL)
                .respond(200, GET_VALID_ADMIN_ACCOUNT());

        var account = service.readArbitraryAccount('accountId');
        account.then(function(data) {
            expect(data).toEqual(GET_VALID_ADMIN_ACCOUNT());
        });
        http.flush();
    });

    it ('Operation Succeeded - Invalid Admin Account', function() {
        http.when('GET', URL)
                .respond(200, GET_INVALID_ADMIN_ACCOUNT());

        var account = service.readArbitraryAccount('accountId');
        account.then(function(data) {
            expect(data).toBe(null);
        });
        http.flush();
    });

    it ('Operation Succeeded - Valid Doctor Account', function() {
        http.when('GET', URL)
                .respond(200, GET_VALID_DOCTOR_ACCOUNT());

        var account = service.readArbitraryAccount('accountId');
        account.then(function(data) {
            expect(data).toEqual(GET_VALID_DOCTOR_ACCOUNT());
        });
        http.flush();
    });

    it ('Operation Succeeded - Invalid Doctor Account', function() {
        http.when('GET', URL)
                .respond(200, GET_INVALID_DOCTOR_ACCOUNT());

        var account = service.readArbitraryAccount('accountId');
        account.then(function(data) {
            expect(data).toBe(null);
        });
        http.flush();
    });

    it ('Operation Succeeded - Valid User Account', function() {
        http.when('GET', URL)
                .respond(200, GET_VALID_USER_ACCOUNT());

        var account = service.readArbitraryAccount('accountId');
        account.then(function(data) {
            expect(data).toEqual(GET_VALID_USER_ACCOUNT());
        });
        http.flush();
    });

    it ('Operation Succeeded - Invalid User Account', function() {
        http.when('GET', URL)
                .respond(200, GET_INVALID_USER_ACCOUNT());

        var account = service.readArbitraryAccount('accountId');
        account.then(function(data) {
            expect(data).toBe(null);
        });
        http.flush();
    });
})