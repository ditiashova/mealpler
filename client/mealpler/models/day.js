class Day {

    /**
     * @param {Moment} date
     * @param {Meal[]} meals
     */
    constructor(date, meals = []) {
        Object.assign(this, {date, meals})
    }
}