describe('', function() {
    var service, http;

    beforeEach(module('blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    it('GET test', function() {
        var resBody = {
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
        http.when('GET', 'http://localhost:8080/category/id')
            .respond(200, resBody);
        try {
            var article = service.readArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(resBody);
            })
            http.flush();
        } catch (error) {
            expect(error.message).toBeDefined();
        }


    });
});

function GET_VALID_ARTICLE_ARRAY() {
    return [
        {
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
        },
        {
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
        },
        {
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
        }
    ];
}

function GET_INVALID_ARTICLE_ARRAY() {
    return [
        {
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
        },
        {
            article_id : 'id',
            category : 'category',
            author_id : 'id',
            content_text : 'text',
            title : 'title',
            rating : 0,
            rating_count : 0,
            image_arr : [],
            tag_arr : []
        }
    ];
}

function GET_VALID_ARTICLE() {
    return {
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
}

function GET_INVALID_ARTICLE() {
    return {
        article_id : 'id',
        category : 'category',
        author_id : 'id',
        content_text : 'text',
        title : 'title',
        rating : 0,
        rating_count : 0,
        image_arr : [],
        tag_arr : []
    };
}

describe('Read All Article', function() {

    beforeEach(module('blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article Arr - 200', function() {
            http.when('GET', 'http://localhost:8080')
                .respond(200, GET_VALID_ARTICLE_ARRAY());

            var article = service.readAllArticle();
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE_ARRAY());
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('GET', 'http://localhost:8080')
                .respond(204, GET_VALID_ARTICLE_ARRAY());

            var article = service.readAllArticle();
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article Arr - 200', function() {
            http.when('GET', 'http://localhost:8080')
                .respond(200, GET_INVALID_ARTICLE_ARRAY());

            var article = service.readAllArticle();
            article.then(function(data) {
                var invalidArr = GET_INVALID_ARTICLE_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('GET', 'http://localhost:8080')
                .respond(204, GET_INVALID_ARTICLE_ARRAY());

            var article = service.readAllArticle();
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Article Arr - 400', function() {
            http.when('GET', 'http://localhost:8080')
                .respond(400, GET_VALID_ARTICLE_ARRAY());

            try {
                var article = service.readAllArticle();
                article.then(function(data) {
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

describe('Read Article In Category', function() {

    beforeEach(module('blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article Arr - 200', function() {
            http.when('GET', 'http://localhost:8080/category')
                .respond(200, GET_VALID_ARTICLE_ARRAY());

            var article = service.readArticleInCategory('category');
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE_ARRAY());
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('GET', 'http://localhost:8080/category')
                .respond(204, GET_VALID_ARTICLE_ARRAY());

            var article = service.readArticleInCategory('category');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article Arr - 200', function() {
            http.when('GET', 'http://localhost:8080/category')
                .respond(200, GET_INVALID_ARTICLE_ARRAY());

            var article = service.readArticleInCategory('category');
            article.then(function(data) {
                var invalidArr = GET_INVALID_ARTICLE_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('GET', 'http://localhost:8080/category')
                .respond(204, GET_INVALID_ARTICLE_ARRAY());

            var article = service.readArticleInCategory('category');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Article Arr - 401', function() {
            http.when('GET', 'http://localhost:8080/category')
                .respond(401, GET_VALID_ARTICLE_ARRAY());

            try {
                var article = service.readArticleInCategory('category');
                article.then(function(data) {
                    // cannot get here
                    expect(true).toBe(false);
                });
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('Please sign in first!');
            }
        });
    });
});

describe('Read Article', function() {

    beforeEach(module('blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article - 200', function() {
            http.when('GET', 'http://localhost:8080/category/id')
                .respond(200, GET_VALID_ARTICLE());

            var article = service.readArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE());
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('GET', 'http://localhost:8080/category/id')
                .respond(204, GET_VALID_ARTICLE());

            var article = service.readArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article - 200', function() {
            http.when('GET', 'http://localhost:8080/category/id')
                .respond(200, GET_INVALID_ARTICLE());

            var article = service.readArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('GET', 'http://localhost:8080/category/id')
                .respond(204, GET_INVALID_ARTICLE());

            var article = service.readArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Article - 403', function() {
            http.when('GET', 'http://localhost:8080/category/id')
                .respond(403, GET_VALID_ARTICLE());

            try {
                var article = service.readArticle('category', 'id');
                article.then(function(data) {
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