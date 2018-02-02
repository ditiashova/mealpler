Mealpler.component('shopList', {
    bindings: {
        week: '<',
        onCloseShoplist: '<',
        opened: '<'
    },
    require: {},
    transclude: true,
    controller: function ($scope, WeekService, ShopListService, openModal, $document) {
        this.title = Mealpler.titles.shopList;

        this.parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent2'));

        $scope.$on(EventType.SHOPLIST_OPENED, (e, state) => {
            if (state) {
                this.openSidebar();
            }
        });

        this.openSidebar = () => {
            const templatePath = 'scripts/components/shoplist/shopList.tmpl.html';
            const sidebarCtrl = ($scope, $uibModalInstance) => {
                this.modalInstance = $uibModalInstance;
            };

            openModal.open(templatePath, this.parentDivForMealModals, $scope, sidebarCtrl, true)
                .catch((e) => {
                    if (e === 'cancel' || e === 'escape key press' || e === 'backdrop click' || e === '$uibUnscheduledDestruction') {
                        this.onCloseShoplist(false);
                    } else console.log(e);
            });
        };

        this.$onChanges = () => {
            this.shoplist = ShopListService.extractAndSortProducts(this.week);
            if (this.opened) {
                this.openSidebar();
            }
        };

        this.closeShopList = () => {
            this.modalInstance.dismiss('cancel');
            //$scope.$emit(EventType.SHOPLIST_CLOSED);
            this.onCloseShoplist(false);
        }
    }
});