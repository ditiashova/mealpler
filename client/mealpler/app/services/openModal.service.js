Mealpler.service('openModal', OpenModalService);

function OpenModalService ($uibModal) {
    this.open = (template, appendTo, scope, controller) => {
        $uibModal.open({
            appendTo: appendTo,
            templateUrl: template,
            scope: scope,
            controller: controller,
            controllerAs: 'modalCtrl'
        }).result.then(function(e) {
            //Success
        }, function(e) {
            //Error
            if (!(e === 'cancel' || e === 'escape key press')) {
                throw e;
            }
        });
    }
}