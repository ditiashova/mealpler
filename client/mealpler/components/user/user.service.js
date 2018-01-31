class UserService {
    constructor($rootScope, AuthService) {
        Object.assign(this, {$rootScope, AuthService});
        //this.handlers = [];
        //this.AuthService.addHandler(() => this.updateUser());
        this.$rootScope.$on('authUpdated', () => this.updateUser());
    }

    updateUser() {
        this._setIsLogged(this.AuthService.getLoginStatus());
        this._setUserProfile(this.AuthService.getUserProfile());
        this.$rootScope.$broadcast('userUpdated');
        //this._runHandlers();
    }

    _setIsLogged(status) {
        this.isLogged = status;
    }

    getIsLogged() {
        return this.isLogged;
    }

    _setUserProfile(profile) {
        this.userProfile = profile;
    }

    getUserProfile() {
        return this.userProfile;
    }

    getUserId() {
        return this.userProfile.id;
    }

    /*addHandler(handler) {
        this.handlers.push(handler);
    };

    _runHandlers() {
        return this.handlers.forEach((handler) => handler());
    };*/

}
Mealpler.service('UserService', UserService);