function GET_VALID_RATING_ARRAY() {
    return [
        {
            article_id : 'id',
            rating_id : 'id',
            category : 'category',
            rater_id : 'id',
            rating_value : 100,
            created_at : 'created_at',
            updated_at : 'updated_at'
        },
        {
            article_id : 'id',
            rating_id : 'id',
            category : 'category',
            rater_id : 'id',
            rating_value : 100,
            created_at : 'created_at',
            updated_at : 'updated_at'
        },
        {
            article_id : 'id',
            rating_id : 'id',
            category : 'category',
            rater_id : 'id',
            rating_value : 100,
            created_at : 'created_at',
            updated_at : 'updated_at'
        }
    ];
}

function GET_INVALID_RATING_ARRAY() {
    return [
        {
            article_id : 'id',
            rating_id : 'id',
            category : 'category',
            rater_id : 'id',
            rating_value : 100,
            created_at : 'created_at',
            updated_at : 'updated_at'
        },
        {
            article_id : 'id',
            rating_id : 'id',
            category : 'category',
            rater_id : 'id',
            rating_value : 100
        }
    ];
}

function GET_VALID_RATING() {
    return {
        article_id : 'id',
        rating_id : 'id',
        category : 'category',
        rater_id : 'id',
        rating_value : 100,
        created_at : 'created_at',
        updated_at : 'updated_at'
    };
}

function GET_INVALID_RATING() {
    return {
        article_id : 'id',
        rating_id : 'id',
        category : 'category',
        rater_id : 'id',
        rating_value : 'text'
    }
}
var URL;
var service;
var http;
var exceptionService;

/* Create Rating */

describe('Create Rating', function() {
    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogRatingService, blogExceptionCatcherService, $httpBackend) {
        service = blogRatingService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/ratings';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Rating - 201', function() {
            http.when('POST', URL)
                .respond(201, GET_VALID_RATING());

            var rating = service.createRating('category', 'articleId', GET_VALID_RATING());
            rating.then(function(data) {
                expect(data).toEqual(GET_VALID_RATING());
            })
            http.flush();
        });

        it('Valid Rating - 204', function() {
            http.when('POST', URL)
                .respond(204, GET_VALID_RATING());

            var rating = service.createRating('category', 'articleId', GET_VALID_RATING());
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Rating - 201', function() {
            http.when('POST', URL)
                .respond(201, GET_INVALID_RATING());

            try {
                var rating = service.createRating('category', 'articleId', GET_INVALID_RATING());
                rating.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
            }
        });

        it('Invalid Rating - 204', function() {
            http.when('POST', URL)
                .respond(204, GET_INVALID_RATING());

            try {
                var rating = service.createRating('category', 'articleId', GET_INVALID_RATING());
                rating.then(function(data) {
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
        it('Valid Rating - 403', function() {
            http.when('POST', URL)
                .respond(403, GET_VALID_RATING());

            try {
                var rating = service.createRating('category', 'articleId', GET_VALID_RATING());
                rating.then(function(data) {
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

/* Read Rating */

describe('Read All Rating', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogRatingService, blogExceptionCatcherService, $httpBackend) {
        service = blogRatingService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/ratings';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Rating Arr - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_VALID_RATING_ARRAY());

            var rating = service.readAllRating('category', 'articleId');
            rating.then(function(data) {
                expect(data).toEqual(GET_VALID_RATING_ARRAY());
            })
            http.flush();
        });

        it('Valid Rating Arr - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_VALID_RATING_ARRAY());

            var rating = service.readAllRating('category', 'articleId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Rating Arr - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_INVALID_RATING_ARRAY());

            var commment = service.readAllRating('category', 'articleId');
            commment.then(function(data) {
                var invalidArr = GET_INVALID_RATING_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Rating Arr - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_INVALID_RATING_ARRAY());

            var rating = service.readAllRating('category', 'articleId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Rating Arr - 400', function() {
            http.when('GET', URL)
                .respond(400, GET_VALID_RATING_ARRAY());

            try {
                var article = service.readAllRating('category', 'articleId');
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

describe('Read Rating', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogRatingService, blogExceptionCatcherService, $httpBackend) {
        service = blogRatingService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/ratings/ratingId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Rating - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_VALID_RATING());

            var rating = service.readRating('category', 'articleId', 'ratingId');
            rating.then(function(data) {
                expect(data).toEqual(GET_VALID_RATING());
            })
            http.flush();
        });

        it('Valid Rating - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_VALID_RATING());

            var rating = service.readRating('category', 'articleId', 'ratingId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Rating - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_INVALID_RATING());

            var rating = service.readRating('category', 'articleId', 'ratingId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid Rating - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_INVALID_RATING());

            var rating = service.readRating('category', 'articleId', 'ratingId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Rating - 403', function() {
            http.when('GET', URL)
                .respond(403, GET_VALID_RATING());

            try {
                var rating = service.readRating('category', 'articleId', 'ratingId');
                rating.then(function(data) {
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

/* Update Rating */

describe('Update Rating', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogRatingService, blogExceptionCatcherService, $httpBackend) {
        service = blogRatingService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/ratings/ratingId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Rating - 200', function() {
            http.when('PUT', URL)
                .respond(200, GET_VALID_RATING());

            var rating = service.updateRating('category', 'articleId', 'ratingId', GET_VALID_RATING());
            rating.then(function(data) {
                expect(data).toEqual(GET_VALID_RATING());
            })
            http.flush();
        });

        it('Valid Rating - 204', function() {
            http.when('PUT', URL)
                .respond(204, GET_VALID_RATING());

            var rating = service.updateRating('category', 'articleId', 'ratingId', GET_VALID_RATING());
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Rating - 200', function() {
            http.when('PUT', URL)
                .respond(200, GET_INVALID_RATING());

            try {
                var rating = service.updateRating('category', 'articleId', 'ratingId', GET_INVALID_RATING());
                rating.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
            }
        });

        it('Invalid Rating - 204', function() {
            http.when('PUT', URL)
                .respond(204, GET_INVALID_RATING());

            try {
                var rating = service.updateRating('category', 'articleId', 'ratingId', GET_INVALID_RATING());
                rating.then(function(data) {
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
        it('Valid Rating - 403', function() {
            http.when('PUT', URL)
                .respond(403, GET_VALID_RATING());

            try {
                var rating = service.updateRating('category', 'articleId', 'ratingId', GET_VALID_RATING());
                rating.then(function(data) {
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

describe('Partially Update Rating', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogRatingService, blogExceptionCatcherService, $httpBackend) {
        service = blogRatingService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/ratings/ratingId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Rating - 200', function() {
            http.when('PATCH', URL)
                .respond(200, GET_VALID_RATING());

            var rating = service.partiallyUpdateRating('category', 'articleId', 'ratingId', GET_VALID_RATING());
            rating.then(function(data) {
                expect(data).toEqual(GET_VALID_RATING());
            })
            http.flush();
        });

        it('Valid Rating - 204', function() {
            http.when('PATCH', URL)
                .respond(204, GET_VALID_RATING());

            var rating = service.partiallyUpdateRating('category', 'articleId', 'ratingId', GET_VALID_RATING());
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        // partial input passed and the output should be valid
        it('Invalid Rating - 200', function() {
            http.when('PATCH', URL)
                .respond(200, GET_VALID_RATING());

            var rating = service.partiallyUpdateRating('category', 'articleId', 'ratingId', GET_INVALID_RATING());
            rating.then(function(data) {
                expect(data).toEqual(GET_VALID_RATING());
            })
            http.flush();
        });

        it('Invalid Rating - 204', function() {
            http.when('PATCH', URL)
                .respond(204, GET_INVALID_RATING());

            var rating = service.partiallyUpdateRating('category', 'articleId', 'ratingId', GET_INVALID_RATING());
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Rating - 403', function() {
            http.when('PATCH', URL)
                .respond(403, GET_VALID_RATING());

            try {
                var rating = service.partiallyUpdateRating('category', 'articleId', 'ratingId', GET_VALID_RATING());
                rating.then(function(data) {
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


/* Delete Rating */

describe('Delete All Rating', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogRatingService, blogExceptionCatcherService, $httpBackend) {
        service = blogRatingService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/ratings';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Rating Arr - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_VALID_RATING_ARRAY());

            var rating = service.deleteAllRating('category', 'articleId');
            rating.then(function(data) {
                expect(data).toEqual(GET_VALID_RATING_ARRAY());
            })
            http.flush();
        });

        it('Valid Rating Arr - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_VALID_RATING_ARRAY());

            var rating = service.deleteAllRating('category', 'articleId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Rating Arr - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_INVALID_RATING_ARRAY());

            var rating = service.deleteAllRating('category', 'articleId');
            rating.then(function(data) {
                var invalidArr = GET_INVALID_RATING_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Rating Arr - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_INVALID_RATING_ARRAY());

            var rating = service.deleteAllRating('category', 'articleId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Rating Arr - 404', function() {
            http.when('DELETE', URL)
                .respond(404, GET_VALID_RATING_ARRAY());

            try {
                var rating = service.deleteAllRating('category', 'articleId');
                rating.then(function(data) {
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

describe('Delete Rating', function() {

    beforeEach(module('data.blog'));
    beforeEach(inject(function(blogRatingService, blogExceptionCatcherService, $httpBackend) {
        service = blogRatingService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/ratings/ratingId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Rating - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_VALID_RATING());

            var rating = service.deleteRating('category', 'articleId', 'ratingId');
            rating.then(function(data) {
                expect(data).toEqual(GET_VALID_RATING());
            })
            http.flush();
        });

        it('Valid Rating - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_VALID_RATING());

            var rating = service.deleteRating('category', 'articleId', 'ratingId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Rating - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_INVALID_RATING());

            var rating = service.deleteRating('category', 'articleId', 'ratingId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid Rating - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_INVALID_RATING());

            var rating = service.deleteRating('category', 'articleId', 'ratingId');
            rating.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Rating - 500', function() {
            http.when('DELETE', URL)
                .respond(500, GET_VALID_RATING());

            try {
                var rating = service.deleteRating('category', 'articleId', 'ratingId');
                rating.then(function(data) {
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