(function() {
    'use strict';
    angular.module('relativeDate', []).value('now', null).value('relativeDateTranslations', {
        just_now: '現在',
        seconds_ago: '{{time}}秒前',
        a_minute_ago: '1分鐘前',
        minutes_ago: '{{time}}分前',
        an_hour_ago: '1小時前',
        hours_ago: '{{time}}小時前',
        a_day_ago: '1天前',
        days_ago: '{{time}}天前',
        a_week_ago: '1週前',
        weeks_ago: '{{time}}週前',
        a_month_ago: '1個月前',
        months_ago: '{{time}}個月前',
        a_year_ago: '1年前',
        years_ago: '{{time}}年前',
        over_a_year_ago: '超過一年前',
        seconds_from_now: '{{time}}秒後',
        a_minute_from_now: '1分鐘後',
        minutes_from_now: '{{time}}分後',
        an_hour_from_now: '1小時後',
        hours_from_now: '{{time}}小時後',
        a_day_from_now: '1天後',
        days_from_now: '{{time}}天後',
        a_week_from_now: '1週後',
        weeks_from_now: '{{time}}週後',
        a_month_from_now: '1個月後',
        months_from_now: '{{time}}個月後',
        a_year_from_now: '1年後',
        years_from_now: '{{time}}年後',
        over_a_year_from_now: '超過一年後'
    }).filter('relativeDate', [
        '$injector', 'now', 'relativeDateTranslations', function($injector, _now, relativeDateTranslations) {
            var $translate, calculateDelta;
            if ($injector.has('$translate')) {
                $translate = $injector.get('$translate');
            } else {
                $translate = {
                    instant: function(id, params) {
                        return relativeDateTranslations[id].replace('{{time}}', params.time);
                    }
                };
            }
            calculateDelta = function(now, date) {
                return Math.round(Math.abs(now - date) / 1000);
            };
            return function(date) {
                var day, delta, hour, minute, month, now, translate, week, year;
                now = _now ? _now : new Date();
                if (!(date instanceof Date)) {
                    date = new Date(date);
                }
                delta = null;
                minute = 60;
                hour = minute * 60;
                day = hour * 24;
                week = day * 7;
                month = day * 30;
                year = day * 365;
                delta = calculateDelta(now, date);
                if (delta > day && delta < week) {
                    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
                    delta = calculateDelta(now, date);
                }
                translate = function(translatePhrase, timeValue) {
                    var translateKey;
                    if (translatePhrase === 'just_now') {
                        translateKey = translatePhrase;
                    } else if (now >= date) {
                        translateKey = "" + translatePhrase + "_ago";
                    } else {
                        translateKey = "" + translatePhrase + "_from_now";
                    }
                    return $translate.instant(translateKey, {
                        time: timeValue
                    });
                };
                switch (false) {
                    case !(delta < 30):
                        return translate('just_now');
                    case !(delta < minute):
                        return translate('seconds', delta);
                    case !(delta < 2 * minute):
                        return translate('a_minute');
                    case !(delta < hour):
                        return translate('minutes', Math.floor(delta / minute));
                    case Math.floor(delta / hour) !== 1:
                        return translate('an_hour');
                    case !(delta < day):
                        return translate('hours', Math.floor(delta / hour));
                    case !(delta < day * 2):
                        return translate('a_day');
                    case !(delta < week):
                        return translate('days', Math.floor(delta / day));
                    case Math.floor(delta / week) !== 1:
                        return translate('a_week');
                    case !(delta < month):
                        return translate('weeks', Math.floor(delta / week));
                    case Math.floor(delta / month) !== 1:
                        return translate('a_month');
                    case !(delta < year):
                        return translate('months', Math.floor(delta / month));
                    case Math.floor(delta / year) !== 1:
                        return translate('a_year');
                    default:
                        return translate('over_a_year');
                }
            };
        }
    ]);

}).call(this);
