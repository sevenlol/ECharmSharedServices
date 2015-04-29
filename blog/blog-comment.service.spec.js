function GET_VALID_COMMENT_ARRAY() {
    return [
        {
            article_id : 'id',
            comment_id : 'id',
            category : 'category',
            commenter_id : 'id',
            comment_text : 'text',
            responded_at : 'title',
            created_at : 'created_at',
            updated_at : 'updated_at',
            author_response_text : 'response text'
        },
        {
            article_id : 'id',
            comment_id : 'id',
            category : 'category',
            commenter_id : 'id',
            comment_text : 'text',
            responded_at : 'title',
            created_at : 'created_at',
            updated_at : 'updated_at',
            author_response_text : 'response text'
        },
        {
            article_id : 'id',
            comment_id : 'id',
            category : 'category',
            commenter_id : 'id',
            comment_text : 'text',
            responded_at : 'title',
            created_at : 'created_at',
            updated_at : 'updated_at',
            author_response_text : 'response text'
        }
    ];
}

function GET_INVALID_COMMENT_ARRAY() {
    return [
        {
            article_id : 'id',
            comment_id : 'id',
            category : 'category',
            commenter_id : 'id',
            comment_text : 'text',
            responded_at : 'title',
            created_at : 'created_at',
            updated_at : 'updated_at',
            author_response_text : 'response text'
        },
        {
            article_id : 'id',
            comment_id : 'id',
            category : 'category',
            commenter_id : 'id',
            comment_text : 'text',
            responded_at : 'title',
            author_response_text : 'response text'
        }
    ];
}

function GET_VALID_COMMENT() {
    return {
        article_id : 'id',
        comment_id : 'id',
        category : 'category',
        commenter_id : 'id',
        comment_text : 'text',
        responded_at : 'title',
        created_at : 'created_at',
        updated_at : 'updated_at',
        author_response_text : 'response text'
    };
}

function GET_INVALID_COMMENT() {
    return {
        article_id : 'id',
        comment_id : 'id',
        category : 'category',
        commenter_id : 'id',
        comment_text : 'text',
        responded_at : 'title',
        author_response_text : 'response text'
    }
}
var URL;
var service;
var http;
var exceptionService;

/* Create Comment */

describe('Create Comment', function() {
    beforeEach(module('blog'));
    beforeEach(inject(function(blogCommentService, blogExceptionCatcherService, $httpBackend) {
        service = blogCommentService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/comments';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Comment - 201', function() {
            http.when('POST', URL)
                .respond(201, GET_VALID_COMMENT());

            var comment = service.createComment('category', 'articleId', GET_VALID_COMMENT());
            comment.then(function(data) {
                expect(data).toEqual(GET_VALID_COMMENT());
            })
            http.flush();
        });

        it('Valid Comment - 204', function() {
            http.when('POST', URL)
                .respond(204, GET_VALID_COMMENT());

            var comment = service.createComment('category', 'articleId', GET_VALID_COMMENT());
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Comment - 201', function() {
            http.when('POST', URL)
                .respond(201, GET_INVALID_COMMENT());

            try {
                var comment = service.createComment('category', 'articleId', GET_INVALID_COMMENT());
                comment.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
            }
        });

        it('Invalid Comment - 204', function() {
            http.when('POST', URL)
                .respond(204, GET_INVALID_COMMENT());

            try {
                var comment = service.createComment('category', 'articleId', GET_INVALID_COMMENT());
                comment.then(function(data) {
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
        it('Valid Comment - 403', function() {
            http.when('POST', URL)
                .respond(403, GET_VALID_COMMENT());

            try {
                var comment = service.createComment('category', 'articleId', GET_VALID_COMMENT());
                comment.then(function(data) {
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

/* Read Comment */

describe('Read All Comment', function() {

    beforeEach(module('blog'));
    beforeEach(inject(function(blogCommentService, blogExceptionCatcherService, $httpBackend) {
        service = blogCommentService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/comments';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Comment Arr - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_VALID_COMMENT_ARRAY());

            var comment = service.readAllComment('category', 'articleId');
            comment.then(function(data) {
                expect(data).toEqual(GET_VALID_COMMENT_ARRAY());
            })
            http.flush();
        });

        it('Valid Comment Arr - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_VALID_COMMENT_ARRAY());

            var comment = service.readAllComment('category', 'articleId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Comment Arr - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_INVALID_COMMENT_ARRAY());

            var commment = service.readAllComment('category', 'articleId');
            commment.then(function(data) {
                var invalidArr = GET_INVALID_COMMENT_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Comment Arr - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_INVALID_COMMENT_ARRAY());

            var comment = service.readAllComment('category', 'articleId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Comment Arr - 400', function() {
            http.when('GET', URL)
                .respond(400, GET_VALID_COMMENT_ARRAY());

            try {
                var article = service.readAllComment('category', 'articleId');
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

describe('Read Comment', function() {

    beforeEach(module('blog'));
    beforeEach(inject(function(blogCommentService, blogExceptionCatcherService, $httpBackend) {
        service = blogCommentService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/comments/commentId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Comment - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_VALID_COMMENT());

            var comment = service.readComment('category', 'articleId', 'commentId');
            comment.then(function(data) {
                expect(data).toEqual(GET_VALID_COMMENT());
            })
            http.flush();
        });

        it('Valid Comment - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_VALID_COMMENT());

            var comment = service.readComment('category', 'articleId', 'commentId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Comment - 200', function() {
            http.when('GET', URL)
                .respond(200, GET_INVALID_COMMENT());

            var comment = service.readComment('category', 'articleId', 'commentId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid Comment - 204', function() {
            http.when('GET', URL)
                .respond(204, GET_INVALID_COMMENT());

            var comment = service.readComment('category', 'articleId', 'commentId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Comment - 403', function() {
            http.when('GET', URL)
                .respond(403, GET_VALID_COMMENT());

            try {
                var comment = service.readComment('category', 'articleId', 'commentId');
                comment.then(function(data) {
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

/* Update Comment */

describe('Update Comment', function() {

    beforeEach(module('blog'));
    beforeEach(inject(function(blogCommentService, blogExceptionCatcherService, $httpBackend) {
        service = blogCommentService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/comments/commentId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Comment - 200', function() {
            http.when('PUT', URL)
                .respond(200, GET_VALID_COMMENT());

            var comment = service.updateComment('category', 'articleId', 'commentId', GET_VALID_COMMENT());
            comment.then(function(data) {
                expect(data).toEqual(GET_VALID_COMMENT());
            })
            http.flush();
        });

        it('Valid Comment - 204', function() {
            http.when('PUT', URL)
                .respond(204, GET_VALID_COMMENT());

            var comment = service.updateComment('category', 'articleId', 'commentId', GET_VALID_COMMENT());
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Comment - 200', function() {
            http.when('PUT', URL)
                .respond(200, GET_INVALID_COMMENT());

            try {
                var comment = service.updateComment('category', 'articleId', 'commentId', GET_INVALID_COMMENT());
                comment.then(function(data) {
                    // should not be here
                    expect(true).toBe(false);
                })
                http.flush();
            } catch (error) {
                expect(error.message).toEqual(exceptionService.DEFAULT_ERROR_MESSAGE);
            }
        });

        it('Invalid Comment - 204', function() {
            http.when('PUT', URL)
                .respond(204, GET_INVALID_COMMENT());

            try {
                var comment = service.updateComment('category', 'articleId', 'commentId', GET_INVALID_COMMENT());
                comment.then(function(data) {
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
        it('Valid Comment - 403', function() {
            http.when('PUT', URL)
                .respond(403, GET_VALID_COMMENT());

            try {
                var comment = service.updateComment('category', 'articleId', 'commentId', GET_VALID_COMMENT());
                comment.then(function(data) {
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

describe('Partially Update Comment', function() {

    beforeEach(module('blog'));
    beforeEach(inject(function(blogCommentService, blogExceptionCatcherService, $httpBackend) {
        service = blogCommentService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/comments/commentId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Comment - 200', function() {
            http.when('PATCH', URL)
                .respond(200, GET_VALID_COMMENT());

            var comment = service.partiallyUpdateComment('category', 'articleId', 'commentId', GET_VALID_COMMENT());
            comment.then(function(data) {
                expect(data).toEqual(GET_VALID_COMMENT());
            })
            http.flush();
        });

        it('Valid Comment - 204', function() {
            http.when('PATCH', URL)
                .respond(204, GET_VALID_COMMENT());

            var comment = service.partiallyUpdateComment('category', 'articleId', 'commentId', GET_VALID_COMMENT());
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        // partial input passed and the output should be valid
        it('Invalid Comment - 200', function() {
            http.when('PATCH', URL)
                .respond(200, GET_VALID_COMMENT());

            var comment = service.partiallyUpdateComment('category', 'articleId', 'commentId', GET_INVALID_COMMENT());
            comment.then(function(data) {
                expect(data).toEqual(GET_VALID_COMMENT());
            })
            http.flush();
        });

        it('Invalid Comment - 204', function() {
            http.when('PATCH', URL)
                .respond(204, GET_INVALID_COMMENT());

            var comment = service.partiallyUpdateComment('category', 'articleId', 'commentId', GET_INVALID_COMMENT());
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Comment - 403', function() {
            http.when('PATCH', URL)
                .respond(403, GET_VALID_COMMENT());

            try {
                var comment = service.partiallyUpdateComment('category', 'articleId', 'commentId', GET_VALID_COMMENT());
                comment.then(function(data) {
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


/* Delete Comment */

describe('Delete All Comment', function() {

    beforeEach(module('blog'));
    beforeEach(inject(function(blogCommentService, blogExceptionCatcherService, $httpBackend) {
        service = blogCommentService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/comments';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Comment Arr - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_VALID_COMMENT_ARRAY());

            var comment = service.deleteAllComment('category', 'articleId');
            comment.then(function(data) {
                expect(data).toEqual(GET_VALID_COMMENT_ARRAY());
            })
            http.flush();
        });

        it('Valid Comment Arr - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_VALID_COMMENT_ARRAY());

            var comment = service.deleteAllComment('category', 'articleId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Comment Arr - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_INVALID_COMMENT_ARRAY());

            var comment = service.deleteAllComment('category', 'articleId');
            comment.then(function(data) {
                var invalidArr = GET_INVALID_COMMENT_ARRAY();
                invalidArr.splice(1, 1);
                expect(data).toEqual(invalidArr);
            })
            http.flush();
        });

        it('Valid Comment Arr - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_INVALID_COMMENT_ARRAY());

            var comment = service.deleteAllComment('category', 'articleId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Comment Arr - 404', function() {
            http.when('DELETE', URL)
                .respond(404, GET_VALID_COMMENT_ARRAY());

            try {
                var comment = service.deleteAllComment('category', 'articleId');
                comment.then(function(data) {
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

describe('Delete Comment', function() {

    beforeEach(module('blog'));
    beforeEach(inject(function(blogCommentService, blogExceptionCatcherService, $httpBackend) {
        service = blogCommentService;
        exceptionService = blogExceptionCatcherService;
        http    = $httpBackend;
        URL     = 'http://localhost:8080/articles/category/articleId/comments/commentId';
    }));

    describe('Operation Succeeded', function() {
        it('Valid Comment - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_VALID_COMMENT());

            var comment = service.deleteComment('category', 'articleId', 'commentId');
            comment.then(function(data) {
                expect(data).toEqual(GET_VALID_COMMENT());
            })
            http.flush();
        });

        it('Valid Comment - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_VALID_COMMENT());

            var comment = service.deleteComment('category', 'articleId', 'commentId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Invalid Comment - 200', function() {
            http.when('DELETE', URL)
                .respond(200, GET_INVALID_COMMENT());

            var comment = service.deleteComment('category', 'articleId', 'commentId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });

        it('Valid Comment - 204', function() {
            http.when('DELETE', URL)
                .respond(204, GET_INVALID_COMMENT());

            var comment = service.deleteComment('category', 'articleId', 'commentId');
            comment.then(function(data) {
                expect(data).toEqual(null);
            })
            http.flush();
        });
    });

    describe('Operation Failed', function() {
        it('Valid Comment - 500', function() {
            http.when('DELETE', URL)
                .respond(500, GET_VALID_COMMENT());

            try {
                var comment = service.deleteComment('category', 'articleId', 'commentId');
                comment.then(function(data) {
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