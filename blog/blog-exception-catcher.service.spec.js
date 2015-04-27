var INVALID_ERROR_TYPE = {
    NULL : null,
    UNDEFINED : undefined,
    STRING : 'STRING',
    EMPTY_STRING : '',
    EMPTY_OBJECT : {},
    OBJECT_NO_STATUS : {key : 'value'},
    OBJECT_STATUS_NULL : {status : null}
};

var INVALID_ERROR_TYPE_ARRAY = [
    INVALID_ERROR_TYPE.NULL,
    INVALID_ERROR_TYPE.UNDEFINED,
    INVALID_ERROR_TYPE.STRING,
    INVALID_ERROR_TYPE.EMPTY_STRING,
    INVALID_ERROR_TYPE.EMPTY_OBJECT,
    INVALID_ERROR_TYPE.OBJECT_NO_STATUS,
    INVALID_ERROR_TYPE.OBJECT_STATUS_NULL];

var VALID_ERROR_ARRAY = [
    {
        status : 400,
        data : {
            code : 1001
        }
    },
    {
        status : 401,
        data : null
    },
    {
        status : 403,
    },
    {
        status : 404,
        data : ''
    },
    {
        status : 409,
        data : []
    },
    {
        status : 500,
        data : 123
    },
    {
        status : 0,
        data : {}
    },
    {
        status : 200,
    }
];

describe('Blog - Exception Catcher - Invalid Error Object', function() {
    var service;

    beforeEach(module('blog'));
    beforeEach(inject(function(blogExceptionCatcherService) {
        service = blogExceptionCatcherService;
    }));

    for (var i = 0; i < INVALID_ERROR_TYPE_ARRAY.length; i++) {
        it('Index = ' + i, (function(i){
            return function() {
                var parsedError =  service.catcher(INVALID_ERROR_TYPE_ARRAY[i]);
                expect(parsedError instanceof service.error).toBe(true);
                expect(parsedError.message).toEqual('Some Unknown Error Occurred!');
            };
        })(i))
    }

});

describe('Blog - Exception Catcher - Valid Error Object', function() {
    var service;

    beforeEach(module('blog'));
    beforeEach(inject(function(blogExceptionCatcherService) {
        service = blogExceptionCatcherService;
    }));

    it('Status is 400', function() {
        var parsedError = service.catcher(VALID_ERROR_ARRAY[0]);
        expect(parsedError instanceof service.error).toBe(true);
        expect(parsedError.message).toEqual('Something is wrong with the request!');
        expect(parsedError.errorBody).toEqual({code : 1001});
    });

    it('Status is 401', function() {
        var parsedError = service.catcher(VALID_ERROR_ARRAY[1]);
        expect(parsedError instanceof service.error).toBe(true);
        expect(parsedError.message).toEqual('Please sign in first!');
        expect(parsedError.errorBody).toEqual(undefined);
    });

    it('Status is 403', function() {
        var parsedError = service.catcher(VALID_ERROR_ARRAY[2]);
        expect(parsedError instanceof service.error).toBe(true);
        expect(parsedError.message).toEqual('You are not authorized for this action!');
        expect(parsedError.errorBody).toEqual(undefined);
    });

    it('Status is 404', function() {
        var parsedError = service.catcher(VALID_ERROR_ARRAY[3]);
        expect(parsedError instanceof service.error).toBe(true);
        expect(parsedError.message).toEqual('Object not found!');
        expect(parsedError.errorBody).toEqual(undefined);
    });

    it('Status is 409', function() {
        var parsedError = service.catcher(VALID_ERROR_ARRAY[4]);
        expect(parsedError instanceof service.error).toBe(true);
        expect(parsedError.message).toEqual('You already rated this article!');
        expect(parsedError.errorBody).toEqual(undefined);
    });

    it('Status is 500', function() {
        var parsedError = service.catcher(VALID_ERROR_ARRAY[5]);
        expect(parsedError instanceof service.error).toBe(true);
        expect(parsedError.message).toEqual('Something is wrong with the server!');
        expect(parsedError.errorBody).toEqual(undefined);
    });

    it('Status is 0', function() {
        var parsedError = service.catcher(VALID_ERROR_ARRAY[6]);
        expect(parsedError instanceof service.error).toBe(true);
        expect(parsedError.message).toEqual('Some Unknown Error Occurred!');
        expect(parsedError.errorBody).toEqual({});
    });

    it('Status is 200', function() {
        var parsedError = service.catcher(VALID_ERROR_ARRAY[7]);
        expect(parsedError instanceof service.error).toBe(true);
        expect(parsedError.message).toEqual('Some Unknown Error Occurred!');
        expect(parsedError.errorBody).toEqual(undefined);
    });

});