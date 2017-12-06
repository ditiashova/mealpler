Mealpler.directive('newProductList', function () {
    const link = (scope, el, attrs, controller, transcludeFn) => {
        const AddModal = controller;
        scope.createNew = (forItems) => {
            AddModal.createNewProduct(forItems);
        };
        scope.save = (newItems) => {
            let type = newItems.hasIngredients ? 'recipe' : 'list';
            AddModal.saveNew(type, newItems);
        };

    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            initItem: '='
        },
        require: '^^addModal',
        templateUrl: 'scripts/tmpl/modals/meal/list.tmpl.html',
        link: link
    };
});