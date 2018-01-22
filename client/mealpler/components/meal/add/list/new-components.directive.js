Mealpler.directive('newComponents', function () {
    const link = (scope, el, attrs, [AddModal]) => {
        const newComponentsCtrl = scope.newComponentsCtrl;

        newComponentsCtrl.createNew = (form, forItems) => {
            form.$submitted = false;
            if(forItems.type === DishType.RECIPE) {
                AddModal.createNewIngredient(forItems)
            } else if(forItems.type === DishType.PRODUCT) {
                AddModal.createNewDish(forItems);
            }
        };

        newComponentsCtrl.save = (form, newItems) => {
            if (newItems.components.length === 0) {
                form.$valid = false;
            }
            if (form.$valid) {
                let type = newItems.type === DishType.RECIPE ? 'recipe' : 'list';
                AddModal.saveNew(type, newItems);
            }
        };
        newComponentsCtrl.cancel = () => {
            AddModal.cancel();
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            initItem: '='
        },
        controller: 'NewComponentsCtrl',
        controllerAs: 'newComponentsCtrl',
        require: ['^^addModal'],
        templateUrl: 'scripts/components/meal/add/list/new-components.tmpl.html',
        link: link
    };
});