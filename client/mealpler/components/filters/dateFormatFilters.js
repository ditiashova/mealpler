Mealpler.
    filter('monthDay', () => {
        return date => {
            if (date) return date.format("MMM Do");
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

