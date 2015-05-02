describe('', function() {
    var service, http;

    beforeEach(module('data.blog'));
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
        http.when('GET', 'http://localhost:8080/articles/category/id')
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

/* Create Article */
describe('Create Article', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article - 201', function() {
            http.when('POST', 'http://localhost:8080/articles/category')
                .respond(201, GET_VALID_ARTICLE());

            var article = service.createArticle('category', GET_VALID_ARTICLE());
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE());
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('POST', 'http://localhost:8080/articles/category')
                .respond(204, GET_VALID_ARTICLE());

            var article = service.createArticle('category', GET_VALID_ARTICLE());
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article - 201', function() {
            http.when('POST', 'http://localhost:8080/articles/category')
                .respond(201, GET_INVALID_ARTICLE());

            try {
                var article = service.createArticle('category', GET_INVALID_ARTICLE());
                article.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('Some Unknown Error Occurred!');
            }
        });

        it('Invalid Article - 204', function() {
            http.when('POST', 'http://localhost:8080/articles/category')
                .respond(204, GET_INVALID_ARTICLE());

            try {
                var article = service.createArticle('category', GET_INVALID_ARTICLE());
                article.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('Some Unknown Error Occurred!');
            }
        });
    });

    describe('Operation Failed', function() {
        it('Valid Article - 403', function() {
            http.when('POST', 'http://localhost:8080/articles/category')
                .respond(403, GET_VALID_ARTICLE());

            try {
                var article = service.createArticle('category', GET_VALID_ARTICLE());
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

/* Read Article */

describe('Read All Article', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article Arr - 200', function() {
            http.when('GET', 'http://localhost:8080/articles')
                .respond(200, GET_VALID_ARTICLE_ARRAY());

            var article = service.readAllArticle();
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE_ARRAY());
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('GET', 'http://localhost:8080/articles')
                .respond(204, GET_VALID_ARTICLE_ARRAY());

            var article = service.readAllArticle();
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article Arr - 200', function() {
            http.when('GET', 'http://localhost:8080/articles')
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
            http.when('GET', 'http://localhost:8080/articles')
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
            http.when('GET', 'http://localhost:8080/articles')
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

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article Arr - 200', function() {
            http.when('GET', 'http://localhost:8080/articles/category')
                .respond(200, GET_VALID_ARTICLE_ARRAY());

            var article = service.readArticleInCategory('category');
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE_ARRAY());
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('GET', 'http://localhost:8080/articles/category')
                .respond(204, GET_VALID_ARTICLE_ARRAY());

            var article = service.readArticleInCategory('category');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article Arr - 200', function() {
            http.when('GET', 'http://localhost:8080/articles/category')
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
            http.when('GET', 'http://localhost:8080/articles/category')
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
            http.when('GET', 'http://localhost:8080/articles/category')
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

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article - 200', function() {
            http.when('GET', 'http://localhost:8080/articles/category/id')
                .respond(200, GET_VALID_ARTICLE());

            var article = service.readArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE());
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('GET', 'http://localhost:8080/articles/category/id')
                .respond(204, GET_VALID_ARTICLE());

            var article = service.readArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article - 200', function() {
            http.when('GET', 'http://localhost:8080/articles/category/id')
                .respond(200, GET_INVALID_ARTICLE());

            var article = service.readArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('GET', 'http://localhost:8080/articles/category/id')
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
            http.when('GET', 'http://localhost:8080/articles/category/id')
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

/* Update Article */

describe('Update Article', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article - 200', function() {
            http.when('PUT', 'http://localhost:8080/articles/category/id')
                .respond(200, GET_VALID_ARTICLE());

            var article = service.updateArticle('category', 'id', GET_VALID_ARTICLE());
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE());
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('PUT', 'http://localhost:8080/articles/category/id')
                .respond(204, GET_VALID_ARTICLE());

            var article = service.updateArticle('category', 'id', GET_VALID_ARTICLE());
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article - 200', function() {
            http.when('PUT', 'http://localhost:8080/articles/category/id')
                .respond(200, GET_INVALID_ARTICLE());

            try {
                var article = service.updateArticle('category', 'id', GET_INVALID_ARTICLE());
                article.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('Some Unknown Error Occurred!');
            }
        });

        it('Invalid Article - 204', function() {
            http.when('PUT', 'http://localhost:8080/articles/category/id')
                .respond(204, GET_INVALID_ARTICLE());

            try {
                var article = service.updateArticle('category', 'id', GET_INVALID_ARTICLE());
                article.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('Some Unknown Error Occurred!');
            }
        });
    });

    describe('Operation Failed', function() {
        it('Valid Article - 403', function() {
            http.when('PUT', 'http://localhost:8080/articles/category/id')
                .respond(403, GET_VALID_ARTICLE());

            try {
                var article = service.updateArticle('category', 'id', GET_VALID_ARTICLE());
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

describe('Partially Update Article', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article - 200', function() {
            http.when('PATCH', 'http://localhost:8080/articles/category/id')
                .respond(200, GET_VALID_ARTICLE());

            var article = service.partiallyUpdateArticle('category', 'id', GET_VALID_ARTICLE());
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE());
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('PATCH', 'http://localhost:8080/articles/category/id')
                .respond(204, GET_VALID_ARTICLE());

            var article = service.partiallyUpdateArticle('category', 'id',GET_VALID_ARTICLE());
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        // partial input passed and the output should be valid
        it('Invalid Article - 200', function() {
            http.when('PATCH', 'http://localhost:8080/articles/category/id')
                .respond(200, GET_VALID_ARTICLE());

            var article = service.partiallyUpdateArticle('category', 'id', GET_INVALID_ARTICLE());
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE());
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('PATCH', 'http://localhost:8080/articles/category/id')
                .respond(204, GET_INVALID_ARTICLE());

            var article = service.partiallyUpdateArticle('category', 'id', GET_INVALID_ARTICLE());
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Article - 403', function() {
            http.when('PATCH', 'http://localhost:8080/articles/category/id')
                .respond(403, GET_VALID_ARTICLE());

            try {
                var article = service.partiallyUpdateArticle('category', 'id', GET_VALID_ARTICLE());
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

/* Delete Article */

describe('Delete All Article', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article Arr - 200', function() {
            http.when('DELETE', 'http://localhost:8080/articles')
                .respond(200, GET_VALID_ARTICLE_ARRAY());

            var article = service.deleteAllArticle();
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE_ARRAY());
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('DELETE', 'http://localhost:8080/articles')
                .respond(204, GET_VALID_ARTICLE_ARRAY());

            var article = service.deleteAllArticle();
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article Arr - 200', function() {
            http.when('DELETE', 'http://localhost:8080/articles')
                .respond(200, GET_INVALID_ARTICLE_ARRAY());

            var article = service.deleteAllArticle();
            article.then(function(data) {
                var invalidArr = GET_INVALID_ARTICLE_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('DELETE', 'http://localhost:8080/articles')
                .respond(204, GET_INVALID_ARTICLE_ARRAY());

            var article = service.deleteAllArticle();
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Article Arr - 404', function() {
            http.when('DELETE', 'http://localhost:8080/articles')
                .respond(404, GET_VALID_ARTICLE_ARRAY());

            try {
                var article = service.deleteAllArticle();
                article.then(function(data) {
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

describe('Delete Article In Category', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article Arr - 200', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category')
                .respond(200, GET_VALID_ARTICLE_ARRAY());

            var article = service.deleteArticleInCategory('category');
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE_ARRAY());
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category')
                .respond(204, GET_VALID_ARTICLE_ARRAY());

            var article = service.deleteArticleInCategory('category');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article Arr - 200', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category')
                .respond(200, GET_INVALID_ARTICLE_ARRAY());

            var article = service.deleteArticleInCategory('category');
            article.then(function(data) {
                var invalidArr = GET_INVALID_ARTICLE_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Article Arr - 204', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category')
                .respond(204, GET_INVALID_ARTICLE_ARRAY());

            var article = service.deleteArticleInCategory('category');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Article Arr - 409', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category')
                .respond(409, GET_VALID_ARTICLE_ARRAY());

            try {
                var article = service.deleteArticleInCategory('category');
                article.then(function(data) {
                    // cannot get here
                    expect(true).toBe(false);
                });
                http.flush();
            } catch (error) {
                expect(error.message).toEqual('You already rated this article!');
            }
        });
    });
});

describe('Delete Article', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogArticleService, $httpBackend) {
        service = blogArticleService;
        http    = $httpBackend;
    }));

    describe('Operation Succeeded', function() {
        it('Valid Article - 200', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category/id')
                .respond(200, GET_VALID_ARTICLE());

            var article = service.deleteArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(GET_VALID_ARTICLE());
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category/id')
                .respond(204, GET_VALID_ARTICLE());

            var article = service.deleteArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Article - 200', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category/id')
                .respond(200, GET_INVALID_ARTICLE());

            var article = service.deleteArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid Article - 204', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category/id')
                .respond(204, GET_INVALID_ARTICLE());

            var article = service.deleteArticle('category', 'id');
            article.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Article - 500', function() {
            http.when('DELETE', 'http://localhost:8080/articles/category/id')
                .respond(500, GET_VALID_ARTICLE());

            try {
                var article = service.deleteArticle('category', 'id');
                article.then(function(data) {
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