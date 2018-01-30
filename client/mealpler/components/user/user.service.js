class UserService {
    constructor(Auth) {
        Object.assign(this, {Auth});
        this._setIsLogged(this.Auth.getLoginStatus());
        this._setUserProfile(this.Auth.getUserProfile());
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

}
Mealpler.service('UserService', UserService);