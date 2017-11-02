Mealpler.controller('WeekCtrl', function (WeekModel, moment, alert, calendarConfig) {
    const datePicker = $('input[name="daterange"]');
    let week = this;
    week.days = WeekModel.weekDays();
    //settings for Date Range Picker
    datePicker.daterangepicker({
        "dateLimit": {
            "days": 7
        },
        "startDate": new Date()
    }, function(start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
    datePicker.on('apply.daterangepicker', function (e, picker) {
        // change for event with choosing new range
    });

    //calendar

    week.calendarView = 'week';
    week.viewDate = new Date();
    var actions = [{
        label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
        onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
        }
    }, {
        label: '<i class=\'glyphicon glyphicon-remove\'></i>',
        onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
        }
    }];
    week.events = [
        {
            title: 'An event',
            color: calendarConfig.colorTypes.warning,
            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
            color: calendarConfig.colorTypes.info,
            startsAt: moment().subtract(1, 'day').toDate(),
            endsAt: moment().add(5, 'days').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: 'This is a really long event title that occurs on every year',
            color: calendarConfig.colorTypes.important,
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            recursOn: 'year',
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: 'Resizable event',
            color: calendarConfig.colorTypes.warning,
            startsAt: moment().startOf('month').toDate(),
            endsAt: moment().startOf('month').add(1, 'hour').toDate(), //ends at is required
            resizable: true
        }
    ];

    week.cellIsOpen = true;

    week.addEvent = function() {
        week.events.push({
            title: 'New event',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            color: calendarConfig.colorTypes.important,
            draggable: true,
            resizable: true
        });
    };

    week.eventClicked = function(event) {
        alert.show('Clicked', event);
    };

    week.eventEdited = function(event) {
        alert.show('Edited', event);
    };

    week.eventDeleted = function(event) {
        alert.show('Deleted', event);
    };

    week.eventTimesChanged = function(event) {
        alert.show('Dropped or resized', event);
    };

    week.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    week.timespanClicked = function(date, cell) {

        if (week.calendarView === 'month') {
            if ((week.cellIsOpen && moment(date).startOf('day').isSame(moment(week.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                week.cellIsOpen = false;
            } else {
                week.cellIsOpen = true;
                week.viewDate = date;
            }
        } else if (week.calendarView === 'year') {
            if ((week.cellIsOpen && moment(date).startOf('month').isSame(moment(week.viewDate).startOf('month'))) || cell.events.length === 0) {
                week.cellIsOpen = false;
            } else {
                week.cellIsOpen = true;
                week.viewDate = date;
            }
        }

    };
});