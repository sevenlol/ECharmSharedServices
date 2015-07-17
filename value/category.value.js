(function() {
    'use strict';

    angular
        .module('app.value')
        // for doctor account in account system
        .value('accountCategoryNameTextList', [
            { name : 'Category_1', text : '類別1' },
            { name : 'Category_2', text : '類別2' }
        ])
        // for askdoctor system
        .value('askDoctorCategoryNameTextList', [
            { name : 'Category_1', text : '類別1' },
            { name : 'Category_2', text : '類別2' }
        ])
        // for blog system
        .value('blogCategoryNameTextList', [
            { name : 'Category_1', text : '類別1' },
            { name : 'Category_2', text : '類別2' }
        ]);

})();
