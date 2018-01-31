class NotifyService {
    constructor () {}

    show(text, classColor) {
        return new PNotify({
            text: text,
            addclass: 'notify-' + classColor
        });
    }
}

Mealpler.service('NotifyService', NotifyService);