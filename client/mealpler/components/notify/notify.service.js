class NotifyService {
    constructor () {}

    displayNotify(text, classColor) {
        return new PNotify({
            text: text,
            addclass: 'notify-' + classColor
        });
    }
}

Mealpler.service('notify', NotifyService);