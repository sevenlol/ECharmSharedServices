var INVALID_TYPE = {
    NULL : 'NULL',
    UNDEFINED : 'UNDEFINED',
    WRONG_TYPE : 'WRONG_TYPE',
    EMPTY_STR : ''
};

var INVALID_TYPE_ARR = [INVALID_TYPE.NULL,
                        INVALID_TYPE.UNDEFINED,
                        INVALID_TYPE.WRONG_TYPE,
                        INVALID_TYPE.EMPTY_STR];

/*
 * Request Validator
 */

describe('Request - Article: Valid Article', function() {
    var service;
    var article = {
        author_id : 'id',
        content_text : 'text',
        title : 'title',
        created_at : 'created_at',
        updated_at : 'updated_at',
        rating : 0,
        rating_count : 0,
        image_arr : [],
        tag_arr : []
    };

    beforeEach(module('blog'));
    beforeEach(inject(function(blogValidatorService) {
        service = blogValidatorService;
    }));

    it ('validateFilled', function() {
        // validate filled function
        expect(service.requestValidator
                      .articleValidator
                      .validateFilled(article)).toEqual(article);
    });

    it ('validateFilled', function() {
        // validate not empty function
        expect(service.requestValidator
                      .articleValidator
                      .validateNotEmpty(article)).toEqual(article);
    });
});

describe('Request - Article: Invalid Article', function() {
    var service;
    beforeEach(module('blog'));
    beforeEach(inject(function(blogValidatorService) {
        service = blogValidatorService;
    }));

    for (var i = 0; i < INVALID_TYPE_ARR.length; i++) {
        // validate filled function
        it('validateFilled: type = ' + INVALID_TYPE_ARR[i], (function(i) {
            return function() {
                var invalidArticle = getInvalidArticle(INVALID_TYPE_ARR[i]);
                expect(service.requestValidator
                              .articleValidator
                              .validateFilled(invalidArticle)).toBe(null);
            }
        }(i)));

        // validate not empty function
        it('validateNotEmpty: type = ' + INVALID_TYPE_ARR[i], (function() {
            return function() {
                var invalidArticle = getInvalidArticle(INVALID_TYPE_ARR[i]);
                expect(service.requestValidator
                              .articleValidator
                              .validateNotEmpty(invalidArticle)).toBe(null);
            }
        }(i)));
    }
});

describe('Request - Article: One Invalid Field Article', function() {

    var service;

    beforeEach(module('blog'));
    beforeEach(inject(function(blogValidatorService) {
        service = blogValidatorService;
    }));

    // validate filled function
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < INVALID_TYPE_ARR.length; j++) {
            it ('validateFilled: index = ' + i + ', type = ' + INVALID_TYPE_ARR[j], (function(i, j) {
                return function() {
                    var invalidArticle;
                    invalidArticle = getOneInvalidFieldArticleForReq(i, INVALID_TYPE_ARR[j]);
                    expect(service.requestValidator
                                  .articleValidator
                                  .validateFilled(invalidArticle)).toBe(null);
                }
            }(i, j)));
        }
    }

    // validate not empty function
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < INVALID_TYPE_ARR.length; j++) {
            it ('validateFilled: index = ' + i + ', type = ' + INVALID_TYPE_ARR[j], (function(i, j) {
                return function() {
                    var invalidArticle;
                    invalidArticle = getOneInvalidFieldArticleForReq(i, INVALID_TYPE_ARR[j]);
                    expect(service.requestValidator
                                  .articleValidator
                                  .validateNotEmpty(invalidArticle)).toEqual(invalidArticle);
                }
            }(i, j)));
        }
    }
});

describe('Request - Article: One Valid Field Article', function() {

    var service;

    beforeEach(module('blog'));
    beforeEach(inject(function(blogValidatorService) {
        service = blogValidatorService;
    }));

    // validate filled function
    for (var i = 0; i < 9; i++) {
        it('validateFilled: index = ' + i, (function(i) {
            return function() {
                var inValidArticle = getOneValidFieldArticleForReq(i);
                expect(service.requestValidator
                              .articleValidator
                              .validateFilled(inValidArticle)).toBe(null);
            };
        }(i)));
    }

    // validate not empty function
    for (var i = 0; i < 9; i++) {
        it('validateNotEmpty: index = ' + i, (function(i) {
            return function() {
                var inValidArticle = getOneValidFieldArticleForReq(i);
                expect(service.requestValidator
                              .articleValidator
                              .validateNotEmpty(inValidArticle)).toBe(inValidArticle);
            };
        }(i)));
    }
});

/*
 * Response Validator
 */

describe('Response - Article: Valid Article', function() {
    var service;
    var article = {
        article_id : 'id',
        category : 'category',
        author_id : 'id',
        content_text : 'text',
        title : 'title',
        created_at : 'created_at',
        updated_at : 'updated_at',
        rating : 0,
        rating_count : 0,
        image_arr : [],
        tag_arr : []
    };

    var articleArr = [article, article, article];

    beforeEach(module('blog'));
    beforeEach(inject(function(blogValidatorService) {
        service = blogValidatorService;
    }));

    it ('validateFilled', function() {
        // validate array function
        expect(service.responseValidator
                      .articleValidator
                      .validateArray(articleArr)).toEqual(articleArr);
    });

    it ('validateFilled', function() {
        // validate object function
        expect(service.responseValidator
                      .articleValidator
                      .validateObject(article)).toEqual(article);
    });
});



/*
 * Private functions
 */

function getInvalidArticle(type) {
    if (type === INVALID_TYPE.NULL)
        return null;
    else if (type === INVALID_TYPE.UNDEFINED)
        return undefined;
    else if (type === INVALID_TYPE.EMPTY_STR)
        return '';
    else if (type === INVALID_TYPE.WRONG_TYPE)
        return 0;

    return null;
}

function getOneInvalidFieldArticleForReq(index, type) {
    var article = {
        author_id : 'id',
        content_text : 'text',
        title : 'title',
        created_at : 'created_at',
        updated_at : 'updated_at',
        rating : 0,
        rating_count : 0,
        image_arr : [],
        tag_arr : []
    };

    var invalidValue;

    if (type === INVALID_TYPE.NULL)
        invalidValue = null;
    else if (type === INVALID_TYPE.UNDEFINED)
        invalidValue = undefined;
    else if (type === INVALID_TYPE.EMPTY_STR)
        invalidValue = '';
    else if (type === INVALID_TYPE.WRONG_TYPE) {
        switch(index) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                invalidValue = [];
                break;
            case 5:
            case 6:
                invalidValue = 'String';
                break;
            case 7:
            case 8:
                invalidValue = 0;
                break;
            default:
        }
    } else {
        return null;
    }

    switch(index) {
        case 0:
            article.author_id = invalidValue;
            break;
        case 1:
            article.content_text = invalidValue;
            break;
        case 2:
            article.title = invalidValue;
            break;
        case 3:
            article.created_at = invalidValue;
            break;
        case 4:
            article.updated_at = invalidValue;
            break;
        case 5:
            article.rating = invalidValue;
            break;
        case 6:
            article.rating_count = invalidValue;
            break;
        case 7:
            article.image_arr = invalidValue;
            break;
        case 8:
            article.tag_arr = invalidValue;
            break;
        default:
    }

    return article;
}

function getOneValidFieldArticleForReq(index) {
    var article = {};

    switch(index) {
        case 0:
            article.author_id = 'id';
            break;
        case 1:
            article.content_text = 'text';
            break;
        case 2:
            article.title = 'title';
            break;
        case 3:
            article.created_at = 'created_at';
            break;
        case 4:
            article.updated_at = 'updated_at';
            break;
        case 5:
            article.rating = 0;
            break;
        case 6:
            article.rating_count = 0;
            break;
        case 7:
            article.image_arr = [];
            break;
        case 8:
            article.tag_arr = [];
            break;
        default:
    }
    return article;
}