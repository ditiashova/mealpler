Mealpler.
    filter('monthDayth', function () {
        return function(date) {
            return date.format("MMMM Do");
        };
    }).
    filter('fullDate', function () {
        return function(date) {
            return date.format("YYYY-M-D");
        };
    }).
    filter('dayName', function () {
        return function(date) {
            return date.format("dddd");
        };
    });

