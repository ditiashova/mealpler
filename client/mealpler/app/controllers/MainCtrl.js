Mealpler.controller('MainCtrl', ['request', function (request) {
    let main = this;
    main.title = Mealpler.titles;
    main.openedFridge = false;

    main.toggleFridge = function () {
        main.openedFridge = !main.openedFridge;
    };
}]);