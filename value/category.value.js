(function() {
    'use strict';

    angular
        .module('app.value')
        // for doctor account in account system
        .value('accountCategoryNameTextList', [
            { name : 'PGY', text : '不分科' },
            { name : 'plasticsurgeon', text : '整形外科' },
            { name : 'cosmeticsurgeon', text : '醫學美容' },
            { name : 'dermatologist', text : '皮膚科' },
            { name : 'pediatrician', text : '小兒科' },
            { name : 'OBSGYN', text : '婦產科' },
            { name : 'others', text : '其他醫師' }
        ])
        // for askdoctor system
        .value('askDoctorCategoryNameTextList', [
            { name : 'plasticsurgery', text : '整形外科' },
            { name : 'cosmeticsurgery', text : '醫學美容' },
            { name : 'dermatology', text : '皮膚科' },
            { name : 'gynecology', text : '婦科' },
            { name : 'obstetrics', text : '產科' },
            { name : 'pediatrics', text : '小兒科' },
            { name : 'others', text : '其他醫學問題' }
        ])
        // for blog system
        .value('blogCategoryNameTextList', [
            { name : 'plasticsurgery', text : '整形外科' },
            { name : 'cosmeticsurgery', text : '醫學美容' },
            { name : 'dermatology', text : '皮膚科' },
            { name : 'gynecology', text : '婦科' },
            { name : 'obstetrics', text : '產科' },
            { name : 'pediatrics', text : '小兒科' },
            { name : 'others', text : '其他醫學文章' }
        ]);

})();
