Mealpler.service('openModal', OpenModalService);

function OpenModalService ($uibModal) {
    this.open = (template, appendTo, scope, controller) => {
        return this.modalInstance = $uibModal.open({
            appendTo: appendTo,
            template: template,
            scope: scope,
            controller: function ($scope, $uibModalInstance) {
                $scope.save = function () {
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });
    }
}