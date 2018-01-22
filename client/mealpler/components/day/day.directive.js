Mealpler.directive('dayManager', function (notify, paste) {
    const link = (scope, el, attrs, [MainCtrl]) => {
        const DayCtrl = scope.dayCtrl;
        DayCtrl.pasteMenu = (date) => {
            const id = MainCtrl.uid;
            paste.pasteMenu(date, id).then(() => {
                notify.show('Menu has been pasted successfully.', 'add');
            });
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            day: '='
        },
        controller: 'DayCtrl',
        controllerAs: 'dayCtrl',
        require: ['^^mainBlock'],
        templateUrl: 'scripts/components/day/day.tmpl.html',
        link: link
    };
});