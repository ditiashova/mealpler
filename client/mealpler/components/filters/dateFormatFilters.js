Mealpler.
    filter('monthDay', () => {
        return date => {
            if (date) return date.format("MMMM Do");
        }
    }).
    filter('fullDate', () => {
        return date => {
            if (date) return date.format("YYYY-M-D");
        }
    }).
    filter('dayName', () => {
        return date => {
            if (date) return date.format("dddd");
        }
    });

