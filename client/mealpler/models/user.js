class User {

    constructor(id, email, name = 'Friend', photo = '', food = []) {
        Object.assign(this, {id, email, name, photo, food})
    }
}