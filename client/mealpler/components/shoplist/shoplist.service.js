class ShopListService {
    constructor() {}

    extractAndSortProducts(list) {
        return this.sortProducts(this.extractProducts(list));
    }

    extractProducts(list) {
        const extracted = [];

        list.map(ingestion => ingestion.meals.map(meal => {
            if (meal.dishes && meal.dishes.length > 0) {
                meal.dishes.map(food => {
                    if (!food.components || food.components.length === 0 ) {
                        extracted.push(food);
                    } else if (food.components && food.components.length > 0) {
                        food.components.map(product => extracted.push(product));
                    }
                })
            }
        }));
        extracted.forEach(a => {
            a.name = a.name.trim();
            a.quantity = 1;
        });

        return extracted;
    }

    sortProducts(list) {
        const sorted = [];

        list.forEach((a) => {
            let thisNameIndex = sorted.findIndex(b => b.name === a.name);
            if (thisNameIndex > -1) {
                sorted[thisNameIndex].quantity++;
            } else {
                sorted.push(angular.copy(a));
            }
        });

        return sorted;
    }
}
Mealpler.service('ShopListService', ShopListService);