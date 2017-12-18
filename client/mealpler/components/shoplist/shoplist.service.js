class ShopListService {
    constructor() {

    }

    extractAndSortProducts(list) {
        return this.sortProducts(this.extractProducts(list));
    }

    extractProducts(list) {
        const extracted = [];
        list.map(ingestion => ingestion.list.map(meal => meal.dishesList.map(food => {
            if (!food.hasIngredients) {
                extracted.push(food)
            } else if (food.hasIngredients) {
                food.list.map(product => extracted.push(product));
            }
        })));
        extracted.forEach(a => {
            a.name = a.name.trim();
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