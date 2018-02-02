class OpenModalService {
    constructor ($uibModal) {
        Object.assign(this, {$uibModal});
    }

    open(template, appendTo, scope, controller, passBack) {
        return this.$uibModal.open({
            appendTo: appendTo,
            templateUrl: template,
            scope: scope,
            controller: controller,
            controllerAs: 'modalCtrl'
        }).result.then(function(e) {
            //Success
        }, function(e) {
            //Error
            if (!(e === 'cancel' || e === 'escape key press' || e === 'backdrop click' || e === '$uibUnscheduledDestruction')) {
                throw e;
            }
            if (passBack) {
                throw e;
            }
        });
    }
}

Mealpler.service('openModal', OpenModalService);