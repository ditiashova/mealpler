class User {

    /**
     *
     */
    constructor(id = void 0, email, name = 'Friend', photo = '', food = []) {
        Object.assign(this, {id, email, name, photo, food})
    }
}