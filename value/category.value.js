(function() {
    'use strict';

    angular
        .module('app.value')
        // for doctor account in account system
        .value('accountCategoryNameTextList', [
            { name : 'cosmeticsurgeon', text : '醫學美容' },
            { name : 'plasticsurgeon', text : '整形外科' },
            { name : 'OBSGYN', text : '婦產科' },
            { name : 'dermatologist', text : '皮膚科' },
            { name : 'pediatrician', text : '小兒科' },
            { name : 'oncologist', text : '癌症醫師' },
            { name : 'PGY', text : '不分科' },
            { name : 'occupational_therapist', text : '職能治療師' },
            { name : 'physical_therapist', text : '物理治療師' },
            { name : 'pharmacist', text : '藥師' },
            { name : 'nutritionist', text : '營養師' },
            { name : 'others', text : '其他醫師' }
        ])
        // for askdoctor system
        .value('askDoctorCategoryNameTextList', [
            { name : 'cosmeticsurgery', text : '醫學美容' },
            { name : 'plasticsurgery', text : '整形外科' },
            { name : 'gynecology', text : '婦科' },
            { name : 'obstetrics', text : '產科' },
            { name : 'dermatology', text : '皮膚科' },
            { name : 'pediatrics', text : '小兒科' },
            { name : 'oncology_consultation', text : '癌症諮詢' },
            { name : 'others', text : '其他醫學問題' }
        ])
        // for blog system
        .value('blogCategoryNameTextList', [
            { name : 'cosmeticsurgery', text : '醫學美容' },
            { name : 'plasticsurgery', text : '整形外科' },
            { name : 'gynecology', text : '婦科' },
            { name : 'obstetrics', text : '產科' },
            { name : 'dermatology', text : '皮膚科' },
            { name : 'pediatrics', text : '小兒科' },
            { name : 'oncology_consultation', text : '癌症諮詢' },
            { name : 'others', text : '其他醫學問題' }
        ]);

})();
