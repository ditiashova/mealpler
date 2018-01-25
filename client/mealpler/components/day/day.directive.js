Mealpler.directive('dayManager', function (notify, paste, StorageService) {
    const link = (scope, el, attrs, [MainCtrl]) => {
        const DayCtrl = scope.dayCtrl;

        DayCtrl.pasteDay = (date) => {
            const userId = MainCtrl.uid;
            paste.pasteDay(date, userId)
                .then(() => {
                    if (!userId) return MainCtrl.runDatabaseHandlers();
                })
                .then(() => notify.show('Menu has been pasted successfully.', 'add'))
                .catch((e) => console.log(e.message));
        };

        DayCtrl.deleteDay = (date) => {
            const userId = MainCtrl.uid;
            StorageService.removeSingleDateMealsList(date, userId)
                .then(() => {
                    if (!userId) return MainCtrl.runDatabaseHandlers();
                })
                .then(() => notify.show('Day has been cleaned.', 'delete'))
                .catch(console.log);
        }
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