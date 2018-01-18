Mealpler.directive('newProductList', function () {
    const link = (scope, el, attrs, controller) => {
        const AddModal = controller;
        scope.createNew = (forItems) => {
            AddModal.createNewProduct(forItems);
        };
        scope.save = (form, newItems) => {
            if (form.$valid) {
                let type = newItems.hasIngredients ? 'recipe' : 'list';
                AddModal.saveNew(type, newItems);
            }
        };
        scope.cancel = () => {
            AddModal.cancelModal();
        };
        scope.removeItem = (index, obj) => {
            [].slice.call(obj.productsList);
            obj.productsList.splice(index, 1);
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            initItem: '='
        },
        require: '^^addModal',
        templateUrl: 'scripts/components/meal/add/list/list.tmpl.html',
        link: link
    };
});