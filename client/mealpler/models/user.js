class User {

    /**
     *
     */
    constructor(id, email, name, food = []) {
        Object.assign(this, {id, email, name, food})
    }
}