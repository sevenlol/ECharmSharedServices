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

    });

    describe('Operation Failed', function() {

    });
});