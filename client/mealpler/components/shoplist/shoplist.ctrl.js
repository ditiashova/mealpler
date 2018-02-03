class ShoplistCtrl {
    constructor($scope, WeekService, ShopListService, openModal, $document) {
        Object.assign(this, {$scope, WeekService, ShopListService, openModal, $document});
        this.title = Mealpler.titles.shopList;
        this.parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent2'));
    }

    $onChanges() {
        this.shoplist = this.ShopListService.extractAndSortProducts(this.week);
        if (this.opened) {
            this.openSidebar();
        }
    }

    openSidebar() {
        const templatePath = 'scripts/components/shoplist/shopList.tmpl.html';
        const sidebarCtrl = ($scope, $uibModalInstance) => {
            this.modalInstance = $uibModalInstance;
        };

        this.openModal.open(templatePath, this.parentDivForMealModals, this.$scope, sidebarCtrl, true)
            .catch((e) => {
                if (e === 'cancel' || e === 'escape key press' || e === 'backdrop click' || e === '$uibUnscheduledDestruction') {
                    this.onCloseShoplist(false);
                } else console.log(e);
            });
    }

    closeShopList() {
        this.modalInstance.dismiss('cancel');
        this.onCloseShoplist(false);
    }
}

Mealpler.controller('ShoplistCtrl', ShoplistCtrl);